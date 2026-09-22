# Share Food Program Sync

Scrapes approved food distribution sites from the [Share Food Program](https://www.sharefoodprogram.org/) map API and upserts them into the Supabase `resources` table. All records written by this script use `creator = "phlask-share-food-program-sync"` — each run deletes those records then re-inserts fresh ones.

## Setup

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in this directory:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_API_KEY=your-service-role-key
```

Message us in `#phlask_data` on Slack to get the credentials.

## Usage

**Sync to Supabase:**
```bash
python scrape_share_food_program.py
```

**Debug locally (no Supabase required):**
```bash
python scrape_share_food_program.py --csv           # writes resources.csv
python scrape_share_food_program.py --csv out.csv   # custom filename
```

The CSV serializes JSONB fields (`source`, `verification`, `food`) as JSON strings so the output is inspectable without a database connection.
