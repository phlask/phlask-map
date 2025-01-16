# Share Food Program Scraping

The Share Food Program can be found here: https://www.sharefoodprogram.org/

The site contains regularly-updated information about food resources in the Philadelphia area. This directory contains Python code for scraping this site.

## Setup

### Install Python

First, make sure to have Python 3.12+ installed. We also recommend using [PyCharm](https://www.jetbrains.com/pycharm/download) for Python development.

### Create a Virtual Environment and Install Dependencies

Inside of this directory, run the following commands:

```bash
python -m venv .venv
# If on Mac/Linux
source .venv/bin/activate
# If on Windows
.venv\Scripts\activate
pip install -r requirements.txt
```

### Add Firebase Credentials

To run the scraper and upload the data to Firebase, you will need to add your Firebase credentials to this folder. Message us in the #phlask_data channel on Slack to get access.

### Run the Scraper

To run the scraper, use the following command, making sure to set the URL below to the correct URL for your Firebase instance.

```bash
python scrape_share_food_program.py https://phlask-share-food-test.firebaseio.com/
```

You should see output like the following:

```
Got 169 new resources from the scraped resource
Using DB URL: https://phlask-share-food-test.firebaseio.com/
Loaded PHLASK DB reference with 819 resources
Removed 169 existing scraped resources from the DB
We now have 819 total resources in the DB
```