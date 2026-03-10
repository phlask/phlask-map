# Sharing Excess Calendar Sync Script
import argparse
import csv
import json
import os
import re
import time
import requests
from datetime import date, datetime, timedelta, timezone
from icalendar import Calendar
import recurring_ical_events
from supabase import create_client, Client

# config
# NOTE: use base64 decoded value
CALENDAR_ID = os.environ.get(
    "GOOGLE_CALENDAR_ID",
    "c_d43974649dbbaa8699b3583c8aa847737aecda4539202c423471282eedd44bbc@group.calendar.google.com"
)
LOOK_FORWARD_DAYS = int(os.environ.get("LOOK_FORWARD_DAYS", 30))

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")  # service role for writes
TABLE_NAME   = "resources"

CREATOR            = "phlask-sharing-excess-sync"
SOURCE_URL         = "https://www.sharingexcess.com/find-food"
NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search"
NOMINATIM_UA       = "phlask-map/2.0 (https://phlask.me)"

# Address parsing

def parse_location(location: str) -> dict:
    """
    Split a US address string into address / city / state / zip_code.

    Handles prefixed venue names, e.g.:
      "ASPIRA Charter School, 6301 N 2nd St, Philadelphia, PA 19126, USA"
    """
    if not location:
        return {}

    # Match trailing: CITY, STATE ZIP[, USA]
    pattern = r'^(.+),\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})(?:-\d{4})?(?:,\s*USA)?$'
    m = re.match(pattern, location.strip())
    if not m:
        return {"address": location}

    street_part, city, state, zip_code = m.groups()

    # If the street part has multiple comma-separated pieces (venue name + street),
    # prefer the last piece that starts with a digit.
    parts = [p.strip() for p in street_part.split(',')]
    address = parts[-1]
    for part in reversed(parts):
        if part and part[0].isdigit():
            address = part
            break

    return {
        "address": address,
        "city": city.strip(),
        "state": state.strip(),
        "zip_code": zip_code.strip(),
    }


def geocode(location: str) -> tuple[float, float] | None:
    """
    Return (lat, lon) for a location string via Nominatim.
    Returns None if the location cannot be resolved.
    Caller is responsible for rate-limiting (1 req/s).
    """
    if not location:
        return None
    try:
        resp = requests.get(
            NOMINATIM_ENDPOINT,
            params={"q": location, "format": "json", "limit": 1},
            headers={"User-Agent": NOMINATIM_UA},
            timeout=10,
        )
        resp.raise_for_status()
        results = resp.json()
        if results:
            return float(results[0]["lat"]), float(results[0]["lon"])
    except Exception as exc:
        print(f"  Geocoding failed for '{location}': {exc}")
    return None


# Use ical for getting recurring events outside the window, 
# and to avoid timezone issues with Google's API which returns 
# all-day events as date-only 

def fetch_events(calendar_id: str, look_forward_days: int) -> list[dict]:
    """Fetch upcoming events from a public Google Calendar and return raw dicts."""
    ical_url = (
        f"https://calendar.google.com/calendar/ical/"
        f"{requests.utils.quote(calendar_id, safe='')}/public/basic.ics"
    )

    response = requests.get(ical_url, timeout=10)
    response.raise_for_status()

    cal = Calendar.from_ical(response.text)

    now    = datetime.now(tz=timezone.utc)
    cutoff = now + timedelta(days=look_forward_days)

    # recurring_ical_events expands RRULE/recurring events into concrete occurrences
    # within the window, so long-running series (e.g. weekly Saturday events whose
    # DTSTART is far in the past) are captured correctly.
    components = recurring_ical_events.of(cal).between(now, cutoff)

    events = []
    for component in components:
        if component.name != "VEVENT":
            continue

        dtstart = component.get("DTSTART").dt
        dtend   = component.get("DTEND").dt if component.get("DTEND") else None

        events.append({
            "uid":         str(component.get("UID", "")),
            "summary":     str(component.get("SUMMARY", "")),
            "start_at":    dtstart.isoformat(),
            "end_at":      dtend.isoformat() if dtend else None,
            "description": str(component.get("DESCRIPTION", "")) or None,
            "location":    str(component.get("LOCATION", ""))    or None,
            "all_day":     not isinstance(dtstart, datetime),
        })

    events.sort(key=lambda e: e["start_at"])
    return events


# Normalize events for the resources table

def _parse_event_dt(iso_str: str) -> datetime:
    """Parse an ISO string that may be a date-only string (all-day events)."""
    try:
        return datetime.fromisoformat(iso_str)
    except ValueError:
        d = date.fromisoformat(iso_str)
        return datetime(d.year, d.month, d.day, tzinfo=timezone.utc)


def build_hours(start_dt: datetime, end_dt: datetime | None) -> list[dict]:
    """
    Return a list with one GooglePlacesPeriod-compatible object representing
    the event's open/close window.

    Google's day numbering: 0 = Sunday … 6 = Saturday.
    Python's weekday():     0 = Monday … 6 = Sunday.
    Conversion: google_day = (python_weekday + 1) % 7
    """
    def time_point(dt: datetime, truncated: bool = False) -> dict:
        return {
            "date":      dt.date().isoformat(),
            "truncated": truncated,
            "day":       (dt.weekday() + 1) % 7,
            "hour":      dt.hour,
            "minute":    dt.minute,
        }

    open_point  = time_point(start_dt)
    close_point = time_point(end_dt) if end_dt else time_point(start_dt, truncated=True)

    return [{"open": open_point, "close": close_point}]


def build_description(original: str | None, start_iso: str, end_iso: str | None) -> str:
    """
    Prepend structured date metadata with clear delimiters so a downstream
    parser can extract event times with a simple regex, e.g.:

        re.search(r'\[\[ start: (.+?) \| end: (.+?) \]\]', description)

    Format:
        [[ start: <ISO> | end: <ISO> ]]
        <original description>
    """
    end_part = f" | end: {end_iso}" if end_iso else ""
    header   = f"[[ start: {start_iso}{end_part} ]]"
    return f"{header}\n{original}" if original else header


def event_to_resource(event: dict) -> dict | None:
    """
    Convert a raw calendar event dict to a normalized `resources` table row.
    Returns None and logs a warning when geocoding fails (lat/lon are NOT NULL).
    """
    location = event.get("location")
    parsed   = parse_location(location or "")

    coords = geocode(location) if location else None
    if coords is None and parsed.get("address"):
        # Fall back to the stripped street address (drops venue name prefix)
        fallback = ", ".join(filter(None, [
            parsed.get("address"),
            parsed.get("city"),
            parsed.get("state"),
            parsed.get("zip_code"),
        ]))
        coords = geocode(fallback)
    if coords is None:
        print(f"  Skipping '{event['summary']}' — could not geocode: {location!r}")
        return None

    lat, lon = coords
    time.sleep(1)  # Nominatim rate limit: 1 req/s
    now_iso  = datetime.now(tz=timezone.utc).isoformat()
    start_dt = _parse_event_dt(event["start_at"])
    end_dt   = _parse_event_dt(event["end_at"]) if event.get("end_at") else None

    return {
        "version":       1,
        "creator":       CREATOR,
        "last_modifier": CREATOR,
        "date_created":  now_iso,
        "last_modified": now_iso,
        "source": {
            "type": "WEB_SCRAPE",
            "url":  SOURCE_URL,
        },
        "verification": {
            "verified":      False,
            "last_modified": now_iso,
            "last_modifier": CREATOR,
        },
        "resource_type": "FOOD",
        "status":        "OPERATIONAL",
        "entry_type":    "UNSURE",
        "name":          event["summary"],
        "description":   build_description(event.get("description"), event["start_at"], event.get("end_at")),
        "address":       parsed.get("address"),
        "city":          parsed.get("city"),
        "state":         parsed.get("state"),
        "zip_code":      parsed.get("zip_code"),
        "latitude":      lat,
        "longitude":     lon,
        "gp_id":         event["uid"],
        "food": {
            "food_type":         [],
            "distribution_type": ["PICKUP"],
            "organization_type": "NON_PROFIT",
            "organization_name": "Sharing Excess",
            "organization_url":  SOURCE_URL,
            "tags":              [],
        },
        "hours":    build_hours(start_dt, end_dt),
        "images":   None,
        "guidelines": None,
        "water":    None,
        "forage":   None,
        "bathroom": None,
    }


def normalize_events(events: list[dict]) -> list[dict]:
    """Convert all raw events to resources rows, dropping those that fail geocoding."""
    resources = []
    for event in events:
        print(f"  Processing: {event['summary']}")
        resource = event_to_resource(event)
        if resource:
            resources.append(resource)
    return resources


# Supabase helpers

def get_supabase_client() -> Client:
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise EnvironmentError(
            "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set. "
            "Use --csv to output locally instead."
        )
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def upsert_resources(client: Client, resources: list[dict]) -> None:
    """
    Insert new resources and update existing ones matched by gp_id.
    Uses a manual select-then-insert/update pattern because gp_id does not
    have a database-level unique constraint required for ON CONFLICT upserts.
    """
    if not resources:
        print("No resources to upsert.")
        return

    gp_ids = [r["gp_id"] for r in resources]

    existing = (
        client.table(TABLE_NAME)
        .select("id, gp_id, date_created")
        .in_("gp_id", gp_ids)
        .execute()
    )
    existing_map = {row["gp_id"]: row for row in existing.data}

    to_insert = []
    to_update = []  # list of (id, row)

    for r in resources:
        if r["gp_id"] in existing_map:
            existing_row = existing_map[r["gp_id"]]
            # Preserve the original creation timestamp on updates
            r = {**r, "date_created": existing_row["date_created"]}
            to_update.append((existing_row["id"], r))
        else:
            to_insert.append(r)

    if to_insert:
        client.table(TABLE_NAME).insert(to_insert).execute()
        print(f"Inserted {len(to_insert)} new resource(s).")

    for row_id, row in to_update:
        client.table(TABLE_NAME).update(row).eq("id", row_id).execute()

    if to_update:
        print(f"Updated {len(to_update)} existing resource(s).")


def delete_stale_resources(client: Client, current_gp_ids: list[str]) -> None:
    """
    Remove resources sourced from Sharing Excess whose UIDs are no longer
    in the current look-forward window.
    """
    if not current_gp_ids:
        return
    (
        client.table(TABLE_NAME)
        .delete()
        .filter("source->>url", "eq", SOURCE_URL)
        .not_.in_("gp_id", current_gp_ids)
        .execute()
    )
    print("Removed stale Sharing Excess resources outside the current window.")


# CSV for debugging/local

def save_csv(resources: list[dict], path: str) -> None:
    """Write normalized resources to a CSV, serializing jsonb fields as JSON strings."""
    if not resources:
        print("No resources found — CSV not written.")
        return

    JSONB_FIELDS = {"source", "verification", "food", "hours"}
    ARRAY_FIELDS = {"images"}

    fieldnames = [
        "gp_id", "name", "resource_type", "status", "entry_type",
        "address", "city", "state", "zip_code", "latitude", "longitude",
        "description", "guidelines",
        "source", "verification", "food", "hours",
        "images", "water", "forage", "bathroom",
        "creator", "last_modifier", "version",
    ]

    def serialize(key, val):
        if val is None:
            return ""
        if key in JSONB_FIELDS:
            return json.dumps(val)
        if key in ARRAY_FIELDS:
            return json.dumps(val)
        return val

    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for r in resources:
            writer.writerow({k: serialize(k, r.get(k)) for k in fieldnames})

    print(f"Saved {len(resources)} resource(s) → {path}")


# CLI

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sync Sharing Excess Google Calendar to Supabase resources table."
    )
    parser.add_argument(
        "--csv",
        nargs="?",
        const="events.csv",
        default=None,
        metavar="FILE",
        help="Output to CSV instead of Supabase (default filename: events.csv).",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()

    print(f"Fetching events for the next {LOOK_FORWARD_DAYS} day(s)...")
    events = fetch_events(CALENDAR_ID, LOOK_FORWARD_DAYS)
    print(f"Found {len(events)} event(s) in window. Geocoding and normalizing...")

    resources = normalize_events(events)
    print(f"Normalized {len(resources)} resource(s).")

    if args.csv:
        save_csv(resources, args.csv)
    else:
        supabase = get_supabase_client()
        upsert_resources(supabase, resources)
        delete_stale_resources(supabase, [r["gp_id"] for r in resources])

    print("Done.")
