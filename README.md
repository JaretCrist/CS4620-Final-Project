# CS4620-Final-Project

### Note about data

The data scrapped from the web features newline characters separating paragraphs within an input field. In order to process the CSV, and maintain this readability, we replace newline characters within strings with ||| which is parsed by the front end.  
This process was performed during the scrape of the Races and Items tables, but changed with a find and replace for the Spells and Monster tables.
