import requests
from bs4 import BeautifulSoup
import csv
from autoscraper import AutoScraper
import re

ITEMS_CSV = '../raw-data-csv/items.csv'

# Pull item details and write to csv
def get_item_details(item_url):
    cleaning_regex = r'<[a-zA-Z0-9/\ \=\":\.-]*>'
    response = requests.get(item_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')

        title = soup.find("div", {"class": "page-title"})
        clean_title = [re.sub(cleaning_regex, '', str(title))]

        content_div = soup.select_one('div#page-content')
        focused_soup = BeautifulSoup(str(content_div), 'html.parser')

        full_details = focused_soup.find_all(['p'])
        # Remove tags
        clean_details = [re.sub(cleaning_regex, '', str(s)) for s in full_details]
        # Remove newlines
        clean_details = [re.sub('\n', '|||', str(s)) for s in clean_details]

        record = clean_title + clean_details
        additional_table = focused_soup.find_all('tr')
        if len(additional_table) > 0:
            table_contents = ''
            for tr in additional_table:
                # Replace ending tag with newline, newline with comma, remove tags
                tr = re.sub('\n', ',', str(tr))
                tr = re.sub(cleaning_regex, '', str(tr))
                table_contents += (tr[1:-1] + '|||')
                
            record.append('|||' + table_contents)

        print(item_url)

        record = [record[0]] + [record[1]] + [record[2]] + ["|||".join(record[3:])] 
        return record
    else: 
        print(f'Error on url: {item_url}')

# Get list of item urls
scraper = AutoScraper()

all_items_url = 'http://dnd5e.wikidot.com/wondrous-items'

common_urls_target = ['http://dnd5e.wikidot.com/wondrous-items:armblade']
common_urls = scraper.build(all_items_url, common_urls_target)

other_item_urls_target = ['http://dnd5e.wikidot.com/wondrous-items:adamantine-armor']
other_item_urls = scraper.build(all_items_url, other_item_urls_target)

all_item_urls = common_urls + other_item_urls

with open(ITEMS_CSV, 'w', encoding='UTF8') as csv_file:
  writer = csv.writer(csv_file)
  items_headers = ['name', 'source', 'type', 'description']
  writer.writerow(items_headers)

  # process each item
  for item_url in all_item_urls:    
    record = get_item_details(item_url)
    writer.writerow(record)