# Sharing Excess Calendar Sync Script
---

## How It Works

Fetches events from a public Google Calendar at: https://www.sharingexcess.com/find-food
---

## Requirements

- Python 3.10+
- Phlask Supabase Credentials:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
- For any Google Calendar, the base64-decoded `src=` value from the embed URL (see instructions below)

Install dependencies:

```bash
pip install requests icalendar supabase python-dotenv
# OR
pip install -r requirements.txt
```

---

## Getting a calendar ID from a Google Calendar Embed URL

> ⚠️ The `src=` parameter in a Google Calendar embed URL is **base64-encoded**. Do not copy it directly — decode it first.

Given an embed URL like:

```
src=Y19kNDM5NzQ2NDlkYmJhYTg2OTliMzU4M2M4YWE4NDc3MzdhZWNkYTQ1MzkyMDJjNDIzNDcxMjgyZWVkZDQ0YmJjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20
```

Decode it with:

```bash
python3 -c "
import base64, sys
s = sys.argv[1]
s += '=' * (-len(s) % 4)   # fix base64 padding
print(base64.b64decode(s).decode())
" "Y19kNDM5NzQ2NDlkYmJhYTg2OTliMzU4M2M4YWE4NDc3MzdhZWNkYTQ1MzkyMDJjNDIzNDcxMjgyZWVkZDQ0YmJjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20"
```

This yields the correct Calendar ID:

```
c_d43974649dbbaa8699b3583c8aa847737aecda4539202c423471282eedd44bbc@group.calendar.google.com
```

Use this decoded value in your `.env` — never the raw base64 string.

---

## Supabase Setup

### Create the table

Run `migration.sql` in the **Supabase SQL Editor** (Dashboard → SQL Editor → New query). It creates the table, a date index, and RLS policies.

### Get credentials

Get these from the Phlask Data team in Slack.

> ⚠️ Use the **service role** key in the sync script (writes bypass RLS).  
> Use the **anon** key in your frontend app to read data safely.

---

## Configuration

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```ini
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_CALENDAR_ID=c_d43974649dbbaa8699b3583c8aa847737aecda4539202c423471282eedd44bbc@group.calendar.google.com
LOOK_FORWARD_DAYS=30
```

---

## Usage

### Supabase mode (default)

```bash
export $(cat .env | xargs) && python calendar_to_supabase.py
```

### CSV mode (debugging)

Outputs to a local CSV instead of Supabase for local debugging. Defaults to `events.csv` if no filename is given.

```bash
# Default output → events.csv
python calendar_to_supabase.py --csv

# Custom filename
python calendar_to_supabase.py --csv debug_output.csv
```

---

## Table Schema

| Column | Type | Description |
|---|---|---|
| `id` | `bigint` | Auto-incrementing primary key |
| `uid` | `text` | Google Calendar's stable event UID (upsert key) |
| `summary` | `text` | Event title |
| `start_at` | `timestamptz` | Start date/time (ISO 8601) |
| `end_at` | `timestamptz` | End date/time, nullable |
| `description` | `text` | Event description, nullable |
| `location` | `text` | Event location, nullable |
| `all_day` | `boolean` | `true` for all-day events |
| `updated_at` | `timestamptz` | Timestamp of last sync |

---