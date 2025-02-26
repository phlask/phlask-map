import requests
import datetime
from bs4 import BeautifulSoup
import os
import sys
import uuid


def extract_street_from_address(address):
    return address.split(', ')[0]


def convert_html_to_text(html):
    # Take the HTML and convert it into a plaintext string
    soup = BeautifulSoup(html, "html.parser")
    for elem in soup.find_all(["a", "p", "div", "h3", "br"]):
        elem.replace_with(elem.text + "\n")
    plain_text = soup.get_text(separator="\n")
    return plain_text


url = "https://www.sharefoodprogram.org/wp-json/wpgmza/v1/features/base64eJyrVkrLzClJLVKyUqqOUcpNLIjPTIlRsopRMo5R0gEJFGeUFni6FAPFomOBAsmlxSX5uW6ZqTkpELFapVoABaMWvA"

response = requests.get(url, headers={
    'User-Agent': 'PostmanRuntime/7.43.0'
})

data = response.json()

new_phlask_data = {}

for marker in data['markers']:

    if marker['approved'] != "1":
        continue

    current_timestamp = datetime.datetime.now().isoformat()

    new_phlask_resource = {
        "address": extract_street_from_address(marker['address']),
        "city": "Philadelphia",
        "creator": "phlask",
        "date_created": current_timestamp,
        "description": convert_html_to_text(marker['description']),
        "entry_type": "UNSURE",
        "last_modified": current_timestamp,
        "last_modifier": "phlask",
        "latitude": float(marker['lat']),
        "longitude": float(marker['lng']),
        "name": marker['title'],
        "resource_type": "FOOD",
        "source": {
            "type": "WEB_SCRAPE",
            "url": url,
            "logo_url": "https://www.sharefoodprogram.org/wp-content/themes/sharefood-theme/images/svg/share-food-program-logo.svg"
        },
        "state": "PA",
        "status": "OPERATIONAL",
        "verification": {
            "last_modified": current_timestamp,
            "last_modifier": "phlask",
            "verified": True
        },
        "version": 1,
        "food": {
            "food_type": [],
            "distribution_type": [],
            "organization_type": []
        },
        "zip_code": "19104"  # TODO: Change to zip code from lookup using geocoding
    }

    new_phlask_data[str(uuid.uuid4())] = new_phlask_resource

print(f"Got {len(new_phlask_data)} new resources from the scraped resource")

cert_path = os.path.abspath("firebase_cert.json")
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cert_path

# Grab the DB URL from the python run command
DB_URL = sys.argv[1]
print(f"Using DB URL: {DB_URL}")
if not DB_URL:
    raise ValueError("DB_URL not set, make sure to append this after your python run command")

from firebase_admin import initialize_app, db
default_app = initialize_app()
ref = db.reference(url=DB_URL)
existing_phlask_data: dict = ref.get()
print(f"Loaded PHLASK DB reference with {len(existing_phlask_data)} resources")

# Remove the existing resources from this scraped data so we don't have duplicates
before_len = len(existing_phlask_data)
existing_phlask_data = {resource_name: resource for resource_name, resource in existing_phlask_data.items() if resource['source'].get('url') != url}
after_len = len(existing_phlask_data)
print(f"Removed {before_len - after_len} existing scraped resources from the DB")

# Add the new resources
existing_phlask_data.update(new_phlask_data)

# Set the new data in firebase
ref.set(existing_phlask_data)

# Verify that the new data was pushed
new_data_test = ref.get()
print(f"We now have {len(new_data_test)} total resources in the DB")