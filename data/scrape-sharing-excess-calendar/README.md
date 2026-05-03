# Sharing Excess Calendar Sync

Fetches upcoming food distribution events from the [Sharing Excess public Google Calendar](https://www.sharingexcess.com/find-food), geocodes each location via Nominatim, and writes them to the Phlask `resources` table in Supabase. On each run it deletes all rows with `creator = phlask-sharing-excess-sync` and inserts fresh ones.

## Setup

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```ini
SUPABASE_URL=
SUPABASE_API_KEY=
```

Get credentials from the Phlask Data team.

## Usage

**Write to Supabase:**
```bash
python calendar_to_supabase.py
```

**Debug locally (outputs `events.csv`):**
```bash
python calendar_to_supabase.py --csv
```
