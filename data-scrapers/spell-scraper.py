import requests
from bs4 import BeautifulSoup
import csv
from autoscraper import AutoScraper
import re

SPELLS_CSV = '../raw-data-csv/spells.csv'

# Remove tags such as "Source: "
def build_spell_object(details):
    record_details = []
    # <Spell Name> - DND 5th Edition
    record_details.append(details[0][:-18])
    # Source: <Source Name>
    record_details.append(details[1][8:])
    # spell level and class - no change
    record_details.append(details[2])

    time_range_duration = details[3].split('\n')
    # Casting Time: <time>
    record_details.append(time_range_duration[0][14:]) 
    # Range: <range>
    record_details.append(time_range_duration[1][7:]) 
    # Components: <components>
    record_details.append(time_range_duration[2][12:]) 
    # Duration: <duration>
    record_details.append(time_range_duration[3][10:]) 

    # Description elements are a seperated, recombine
    helper_list = "".join(details[4:-1])
    record_details.append(helper_list)
    
    # Spell Lists. <classes>
    record_details.append(details[-1][13:])

    return record_details

# Pull spell details and write to csv
def get_spell_details(spell_url, writer):
    response = requests.get(spell_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')

        content_div = soup.select_one('div#page-content')
        focused_soup = BeautifulSoup(str(content_div), 'html.parser')

        full_details = soup.find_all('title') + focused_soup.find_all(['p', 'ul'])

        cleaning_regex = r'<[a-zA-Z0-9/\ \=\":\.]*>'
        clean_details = [re.sub(cleaning_regex, '', str(s)) for s in full_details]

        record = build_spell_object(clean_details)
        writer.writerow(record)

    else: 
        print(f'Error on url: {spell_url}')

# Get list of spell urls
scraper = AutoScraper()

all_spells_url = 'http://dnd5e.wikidot.com/spells'

cantrips_urls_target = ['http://dnd5e.wikidot.com/spell:acid-splash']
cantrips_urls = scraper.build(all_spells_url, cantrips_urls_target)

other_spell_urls_target = ['http://dnd5e.wikidot.com/spell:absorb-elements']
other_spell_urls = scraper.build(all_spells_url, other_spell_urls_target)

all_spell_urls = cantrips_urls + other_spell_urls

with open(SPELLS_CSV, 'w', encoding='UTF8') as csv_file:
  writer = csv.writer(csv_file)
  spells_headers = ['name', 'source', 'school', 'casting_time', 'range', 'components', 'duration', 'description', 'classes']
  writer.writerow(spells_headers)

  # process each item
  for spell_url in all_spell_urls:
    print(spell_url)
    get_spell_details(spell_url, writer)
