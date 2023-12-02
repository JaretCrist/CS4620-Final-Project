import requests
from bs4 import BeautifulSoup
import csv
from autoscraper import AutoScraper
import re

RACES_CSV = '../raw-data-csv/races.csv'
cleaning_regex = r'<[a-zA-Z0-9/\ \=\":\.\-;]*>'

# write a function using beautiful soup to parse the html and title
def parse_html(html, parent_name):
    soup = BeautifulSoup(html, 'html.parser')
    records = []

    # Set source to h1 tag
    source = soup.find('h1').span.text

    if '<h2' in html:
        for newSplit in html.split('<h2')[1:]:
            h2 = '<h2' + newSplit
            newSoup = BeautifulSoup(h2, 'html.parser')
            
            current_record = {}
            current_record['parent_name'] = parent_name
            current_record['name'] = newSoup.find('h2').span.text
            current_record['source'] = source
            current_record['details'] = ''
            for tag in newSoup.find_all(['p', 'ul', 'table']):
                temp = re.sub(cleaning_regex, '', str(tag))
                current_record['details'] += (temp + '|||')
            records.append(current_record)
    else:
        # No h2 tags -> just one record
        current_record = {}
        current_record['name'] = parent_name
        current_record['parent_name'] = None
        current_record['source'] = source
        current_record['details'] = ''
        for tag in soup.find_all(['p', 'ul', 'table']):
            temp = re.sub(cleaning_regex, '', str(tag))
            current_record['details'] += (temp + '|||')
        records.append(current_record)
    
    return records


# Pull race details and write to csv
def get_race_details(race_url, writer):
    cleaning_regex = r'<[a-zA-Z0-9/\ \=\":\.-]*>'
    response = requests.get(race_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')

        title_name = soup.find("div", {"class": "page-title"})
        clean_title_name = re.sub(cleaning_regex, '', str(title_name))

        content_div = soup.select_one('div#page-content')
        focused_soup = BeautifulSoup(str(content_div), 'html.parser')

        # remove first element due to unwanted content before first h1 tag
        temp = re.sub('\n', '|||', str(focused_soup)).split('<h1')[1:]
        # readd the h1 tag to each item in temp
        h1s = ['<h1' + x for x in temp]

        for h1 in h1s:
            records = parse_html(h1, clean_title_name)
            for record in records:
                writer.writerow([record['name'], record['parent_name'], record['source'], record['details']])

    else: 
        print(f'Error on url: {race_url}')


# Get list of race urls
scraper = AutoScraper()

all_races_url = 'http://dnd5e.wikidot.com/lineage'

urls_target = ['http://dnd5e.wikidot.com/lineage:dragonborn']
urls = scraper.build(all_races_url, urls_target)

with open(RACES_CSV, 'w', encoding='UTF8') as csv_file:
  writer = csv.writer(csv_file)
  races_headers = ['name', 'parent_name', 'source', 'details']
  writer.writerow(races_headers)

  # process each race
  for race_url in urls:    
    get_race_details(race_url, writer)
    print(race_url)