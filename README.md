# CS4620-Final-Project
This project was created for the Ohio University CS4620, Fall 2023, final project.  
Presentation: https://www.youtube.com/watch?v=z_6cvcfvML8

## Overview
This project is a full-stack web application to view and interact with a Dungeons & Dragons database.

## Running the project
### Locally

Pre-reqs: Have node installed

1. cd backend
2. npm i
3. npm run start
- Verify that the server is running on port 3000
- LEAVE THIS RUNNING
4. Open new terminal instance
5. cd frontend
6. npm i
7. npm run start
  - LEAVE THIS RUNNING
8. Open localhost:4200 in your browser
- Or a different port as specified in the terminal

## Motivation
Dungeons & Dragons is a widely popular Tabletop Role Playing Game (TTRPG). It features a wide array of content, including official content from Wizards of the Coast, content from other publishers, and “homebrew” content created by players. Trying to search for new content to use is not always a simple process. The goal of this project is to create an easy to navigate webpage that includes features from a wide range of source books, as well as the ability to add new items into the database.

## Dataset
There are five tables featured in this project: source books, monsters, spells, playable races, and magic items. A source book can contain many of each of the four other categories, designed as a 1:N foreign key relationship in the schema. In order to populate the tables with enough quantity of data to be useful, the use of Python web-scrapers was employed.

### Notes about data
 - The data scrapped from the web features newline characters separating paragraphs within an input field. In order to process the CSV, and maintain this readability, we replace newline characters within strings with ||| which is parsed by the front end. This process was performed during the scrape of the Races and Items tables, but changed with a find and replace for the Spells and Monster tables.
 - There may be inaccuracies in the data, due to the nature of the wiki pages being scraped. In addition, if a page followed a non-standard format compared to the rest of the items of the same type there may be additional data issues.

## Tech Stack
### Data Aquisition
- Python3
- Packages: BeautifulSoup, AutoScraper

### Backend
- Database: SQLite3
- Frameworks: Node.JS, Hapi
- Packages: Knex Query Builder

### Frontend
- Framework: Angular
- Tools: Material Components Library, Bootstrap Toolkit
