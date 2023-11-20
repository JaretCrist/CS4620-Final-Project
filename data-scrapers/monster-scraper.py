import requests
from bs4 import BeautifulSoup
import csv
from autoscraper import AutoScraper
import re
import functools

MONSTERS_CSV = '../raw-data-csv/monsters.csv'

def parse_stats(clean_stats):
  stats_array = []

  # AC
  stats_array.append(clean_stats[1])
  # HP
  stats_array.append(clean_stats[4])
  # Spd
  stats_array.append(clean_stats[7])

  # Str Dex Con Int Wis Cha
  # Remove first 3 char - STR14 (+2)
  stats_array.append(clean_stats[9][3:])
  stats_array.append(clean_stats[10][3:])
  stats_array.append(clean_stats[11][3:])
  stats_array.append(clean_stats[12][3:])
  stats_array.append(clean_stats[13][3:])
  stats_array.append(clean_stats[14][3:])

  # Saving throws, skills, immunities
  extra_details = ""
  for index in range(16, len(clean_stats) - 8, 3):
    extra_details += clean_stats[index]
    extra_details += ':'
    extra_details += clean_stats[index + 1]
    extra_details += '\n'

  stats_array.append(extra_details)

  # Senses
  stats_array.append(clean_stats[-7])
  # Languages
  stats_array.append(clean_stats[-4])
  # CR
  stats_array.append(clean_stats[-1])

  return stats_array

def get_monster_details(monster_url):
  response = requests.get(monster_url)
  if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    cleaning_regex = r'<[a-zA-Z0-9/\ \=\":\.-;#,]*>'

    name = soup.find('h1')
    clean_name = [re.sub(cleaning_regex, '', str(name))]

    type = soup.find("div", {"class": "type"})
    clean_type = [re.sub(cleaning_regex, '', str(type))]

    stats = soup.find("div", {"class": "red"})
    clean_stats = [re.sub(cleaning_regex, '', str(s)) for s in stats]

    details = soup.find_all('p')
    clean_details = [re.sub(cleaning_regex, '', str(s)) for s in details]

    source = soup.find("div", {"class": "source"})
    clean_source = [re.sub(cleaning_regex, '', str(s)) for s in source]

    img = soup.find('img')

    new_record = []
    new_record += clean_name
    new_record += clean_type
    new_record += [functools.reduce(lambda a,b: a + '\n' + b, clean_details)]
    new_record += parse_stats(clean_stats)
    new_record += clean_source
    new_record += [img['src']] if img!= None else ['']

    return new_record


# Get list of monster urls
scraper = AutoScraper()

all_monsters_url = 'https://www.aidedd.org/dnd-filters/monsters.php'


monsters_urls_target = ['https://www.aidedd.org/dnd/monstres.php?vo=aarakocra']
monster_urls = scraper.build(all_monsters_url, monsters_urls_target)

get_monster_details(monster_urls[0])





with open(MONSTERS_CSV, 'w', encoding='UTF8') as csv_file:
  writer = csv.writer(csv_file)
  monster_headers = ['name', 'type', 'actions', 'ac', 'hp', "spd", 'str', 'dex', 'con', 'int', 'wis', 'cha', 'extras', 'senses', 'languages', 'cr','source', 'image']
  writer.writerow(monster_headers)

  # process each item
  for monster_url in monster_urls:
    record = get_monster_details(monster_url)
    writer.writerow(record)

