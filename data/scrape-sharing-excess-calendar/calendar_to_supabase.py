# Sharing Excess Calendar Sync Script
import argparse
import csv
import os
import requests
from datetime import datetime, timedelta, timezone
from icalendar import Calendar
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
TABLE_NAME   = "calendar_events"

def fetch_events(calendar_id: str, look_forward_days: int) -> list[dict]:
    ical_url = (
        f"https://calendar.google.com/calendar/ical/"
        f"{requests.utils.quote(calendar_id, safe='')}/public/basic.ics"
    )

    response = requests.get(ical_url, timeout=10)
    response.raise_for_status()

    cal = Calendar.from_ical(response.text)

    now    = datetime.now(tz=timezone.utc)
    cutoff = now + timedelta(days=look_forward_days)

    events = []
    for component in cal.walk():
        if component.name != "VEVENT":
            continue

        dtstart = component.get("DTSTART").dt
        dtend   = component.get("DTEND").dt if component.get("DTEND") else None

        # Normalize to datetime for comparison (all-day events are `date` objects)
        if isinstance(dtstart, datetime):
            start_aware = dtstart if dtstart.tzinfo else dtstart.replace(tzinfo=timezone.utc)
        else:
            start_aware = datetime(dtstart.year, dtstart.month, dtstart.day, tzinfo=timezone.utc)

        if start_aware < now or start_aware > cutoff:
            continue

        events.append({
            "uid":         str(component.get("UID", "")),
            "summary":     str(component.get("SUMMARY", "")),
            "start_at":    dtstart.isoformat(),
            "end_at":      dtend.isoformat() if dtend else None,
            "description": str(component.get("DESCRIPTION", "")) or None,
            "location":    str(component.get("LOCATION", ""))    or None,
            "all_day":     not isinstance(dtstart, datetime),
            "updated_at":  datetime.now(tz=timezone.utc).isoformat(),
        })

    events.sort(key=lambda e: e["start_at"])
    return events


# Supabase functions

def get_supabase_client() -> Client:
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise EnvironmentError(
            "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set. "
            "Use --csv flag to skip Supabase and output to a file instead."
        )
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def upsert_events(client: Client, events: list[dict]) -> None:
    if not events:
        print("No events in look-forward window — nothing to upsert.")
        return
    client.table(TABLE_NAME).upsert(events, on_conflict="uid").execute()
    print(f"Upserted {len(events)} event(s) into '{TABLE_NAME}'.")


def delete_stale_events(client: Client, current_uids: list[str]) -> None:
    """Remove rows whose UIDs are no longer in the look-forward window."""
    if not current_uids:
        return
    client.table(TABLE_NAME).delete().not_.in_("uid", current_uids).execute()
    print("Removed stale events outside the current window.")


# csv for debug

def save_csv(events: list[dict], path: str) -> None:
    if not events:
        print("No events found — CSV not written.")
        return

    fieldnames = ["uid", "summary", "start_at", "end_at", "all_day", "description", "location", "updated_at"]
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(events)

    print(f"Saved {len(events)} event(s) → {path}")


# option for CLI args

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Sync public Google Calendar to Supabase or CSV.")
    parser.add_argument(
        "--csv",
        nargs="?",          
        const="events.csv", # default name
        default=None,       # value when flag is absent
        metavar="FILE",
        help="Output to CSV instead of Supabase. Optionally specify a filename (default: events.csv).",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()

    print(f"Fetching events for the next {LOOK_FORWARD_DAYS} day(s)...")
    events = fetch_events(CALENDAR_ID, LOOK_FORWARD_DAYS)

    if args.csv:
        # debug
        save_csv(events, args.csv)
    else:
        # write to supabase
        supabase = get_supabase_client()
        upsert_events(supabase, events)
        delete_stale_events(supabase, [e["uid"] for e in events])

    print("Done.")
