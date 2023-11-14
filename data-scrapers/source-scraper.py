import requests
from bs4 import BeautifulSoup
import csv
import re

SOURCES_CSV = '../raw-data-csv/sources.csv'

all_official_sources_url = 'https://dungeonsanddragonsfan.com/dnd-5e-books-list/'


def get_text_details(full_page_soup):
    content_divs = full_page_soup.find_all("div", {"class": "wp-block-media-text__content"})
    focused_soup = BeautifulSoup(str(content_divs), 'html.parser')
    
    full_details = focused_soup.find_all(['h3', 'p'])

    cleaning_regex = r'<[a-zA-Z0-9/\ \=\":\.-]*>'
    clean_details = [re.sub(cleaning_regex, '', str(s)) for s in full_details]

    # Group related content
    entire_table = []
    for i in range(0, len(clean_details), 5):
        temp_array = []
        temp_array.append(clean_details[i])
        temp_array.append('Wizards of the Coast')
        # Remove word "published"
        temp_array.append(clean_details[i + 1][11:])

        entire_table.append(temp_array)

    return entire_table

# pull data-src url from an img tag
def get_src_from_img(img):
    src = ""

    start_index = str(img).find("data-src=") + 10
    end_index = str(img).find("data-srcset=") - 2

    return str(img)[start_index:end_index]

def get_img_src(full_page_soup):
  content_divs = full_page_soup.find_all("div", {"class": "wp-block-media-text alignwide is-stacked-on-mobile"})
  focused_soup = BeautifulSoup(str(content_divs), 'html.parser')

  img_tags = focused_soup.find_all('img')

  # every img is duplicated
  img_tags = [img_tags[i] for i in range(0, len(img_tags), 2)] 

  # pull data-src url from img
  img_srcs = list(map(get_src_from_img, img_tags))

  # Remove Author's avatar
  img_srcs.pop()

  return img_srcs

with open(SOURCES_CSV, 'w', encoding='UTF8') as csv_file:
  writer = csv.writer(csv_file)
  spells_headers = ['name', 'publisher', 'date', 'photo_url']
  writer.writerow(spells_headers)

  # Website has a block in place that returns 406 errors
  # To fix: Convince the website that the python script is a Linux desktop using Firefox
  my_headers = {"User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1"}
  response = requests.get(all_official_sources_url, headers=my_headers)
  if response.status_code == 200:
      soup = BeautifulSoup(response.content, 'html.parser')

      entire_table = get_text_details(soup)
      img_src_list = get_img_src(soup)


      print(len(entire_table))
      print(len(img_src_list))

      if len(entire_table) != len(img_src_list):
          print('PANIC - mismatched len')
          exit

      for i in range(0, len(entire_table)):
         record = entire_table[i]
         record.append(img_src_list[i])

         writer.writerow(record)

