import argparse
import csv
import datetime
import json
import os
import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# config
SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_API_KEY", "")
TABLE_NAME   = "resources"

CREATOR    = "phlask-share-food-program-sync"
SOURCE_URL = (
    "https://www.sharefoodprogram.org/wp-json/wpgmza/v1/features/"
    "base64eJyrVkrLzClJLVKyUqqOUcpNLIjPTIlRsopRMo5R0gEJFGeUFni6"
    "FAPFomOBAsmlxSX5uW6ZqTkpELFapVoABaMWvA"
)


def extract_street_from_address(address):
    return address.split(', ')[0]


def convert_html_to_text(html):
    soup = BeautifulSoup(html, "html.parser")
    for elem in soup.find_all(["a", "p", "div", "h3", "br"]):
        elem.replace_with(elem.text + "\n")
    return soup.get_text(separator="\n")


def fetch_markers() -> list[dict]:
    response = requests.get(SOURCE_URL, headers={"User-Agent": "PostmanRuntime/7.43.0"})
    response.raise_for_status()
    return [m for m in response.json()["markers"] if m["approved"] == "1"]


def marker_to_resource(marker: dict) -> dict:
    now = datetime.datetime.now(tz=datetime.timezone.utc).isoformat(timespec="milliseconds")
    return {
        "version":       1,
        "creator":       CREATOR,
        "last_modifier": CREATOR,
        "date_created":  now,
        "last_modified": now,
        "source": {
            "type":     "WEB_SCRAPE",
            "url":      SOURCE_URL,
            "logo_url": "https://www.sharefoodprogram.org/wp-content/themes/sharefood-theme/images/svg/share-food-program-logo.svg",
        },
        "verification": {
            "verified":      True,
            "last_modified": now,
            "last_modifier": CREATOR,
        },
        "resource_type": "FOOD",
        "status":        "OPERATIONAL",
        "entry_type":    "UNSURE",
        "name":          marker["title"],
        "description":   convert_html_to_text(marker["description"]),
        "address":       extract_street_from_address(marker["address"]),
        "city":          "Philadelphia",
        "state":         "PA",
        "zip_code":      "19104",  # TODO: derive per-marker via geocoding
        "latitude":      float(marker["lat"]),
        "longitude":     float(marker["lng"]),
        "food": {
            "food_type":         [],
            "distribution_type": [],
            "organization_type": [],
        },
        "hours":    None,
        "images":   None,
        "guidelines": None,
        "water":    None,
        "forage":   None,
        "bathroom": None,
    }


# Supabase helpers

def get_supabase_client() -> Client:
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise EnvironmentError(
            "SUPABASE_URL and SUPABASE_API_KEY must be set. "
            "Use --csv to output locally instead."
        )
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def delete_by_creator(client: Client) -> None:
    # Warn about any records from the same source URL with a mismatched creator —
    # these are stale rows from a previous naming convention that won't be cleaned up.
    mismatched = (
        client.table(TABLE_NAME)
        .select("id, creator")
        .filter("source->>url", "eq", SOURCE_URL)
        .neq("creator", CREATOR)
        .execute()
    )
    if mismatched.data:
        print(f"  [debug] {len(mismatched.data)} record(s) match source URL but have unexpected creator:")
        for row in mismatched.data:
            print(f"    id={row['id']}  creator={row['creator']!r}")

    result = client.table(TABLE_NAME).delete().eq("creator", CREATOR).execute()
    count = len(result.data) if result.data else 0
    print(f"Deleted {count} existing record(s) with creator='{CREATOR}'.")


def insert_resources(client: Client, resources: list[dict]) -> None:
    if not resources:
        print("No resources to insert.")
        return
    client.table(TABLE_NAME).insert(resources).execute()
    print(f"Inserted {len(resources)} resource(s).")


# CSV for debugging/local

def save_csv(resources: list[dict], path: str) -> None:
    if not resources:
        print("No resources found — CSV not written.")
        return

    JSONB_FIELDS = {"source", "verification", "food"}
    fieldnames = [
        "name", "resource_type", "status", "entry_type",
        "address", "city", "state", "zip_code", "latitude", "longitude",
        "description", "source", "verification", "food",
        "creator", "last_modifier", "version",
    ]

    def serialize(key, val):
        if val is None:
            return ""
        if key in JSONB_FIELDS:
            return json.dumps(val)
        return val

    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for r in resources:
            writer.writerow({k: serialize(k, r.get(k)) for k in fieldnames})

    print(f"Saved {len(resources)} resource(s) → {path}")


# CLI

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Sync Share Food Program data to Supabase resources table."
    )
    parser.add_argument(
        "--csv",
        nargs="?",
        const="resources.csv",
        default=None,
        metavar="FILE",
        help="Output to CSV instead of Supabase (default filename: resources.csv).",
    )
    args = parser.parse_args()

    print("Fetching markers from Share Food Program...")
    markers = fetch_markers()
    print(f"Found {len(markers)} approved marker(s). Normalizing...")

    resources = [marker_to_resource(m) for m in markers]
    print(f"Normalized {len(resources)} resource(s).")

    if args.csv:
        save_csv(resources, args.csv)
    else:
        supabase = get_supabase_client()
        delete_by_creator(supabase)
        insert_resources(supabase, resources)

    print("Done.")
