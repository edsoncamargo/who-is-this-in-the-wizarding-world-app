import requests 
from bs4 import BeautifulSoup
from io import BytesIO
import re
from urllib.request import urlopen 
import base64
import json
from PIL import Image, ImageTk
import urllib.request, io

url = "https://harrypotter.fandom.com/wiki/List_of_Harry_Potter_cast_members"
headers = {'user-agent': 'Mozilla/5.0'}
response = requests.get(url, headers = headers)
html = response.text
html_parsed = BeautifulSoup(html, 'html.parser')
table_films = html_parsed.find_all('th')

start_chars_index = 11
Chars = []

for index, table_char in enumerate(table_films):
    if index >= start_chars_index and index <= 100 and table_char.find('a', href=re.compile('^/wiki/.*')) and str(table_char.find("h3")) == "None" and str(table_char.find("span")) == "None": 
        url_image = "https://harrypotter.fandom.com/" + table_char.find('a')['href']
        headers_image = {'user-agent': 'Mozilla/5.0'}
        response_image = requests.get(url_image, headers = headers_image)
        html_image = response_image.text
        html_parsed_bio = BeautifulSoup(html_image, 'html.parser')
        if (html_parsed_bio.find('figure') and html_parsed_bio.find('figure').find('a') and html_parsed_bio.find('figure').find('a')['href']):
            image_container = html_parsed_bio.find('figure').find('a')['href']
            data = {}
            data['name'] = table_char.find('a').text
            data['species'] = html_parsed_bio.find("div", attrs={"data-source" : "species"}).find('a').text if html_parsed_bio.find("div", attrs={"data-source" : "species"}) else "None"
            data['gender'] = html_parsed_bio.find("div", attrs={"data-source" : "gender"}).find('h3').text if html_parsed_bio.find("div", attrs={"data-source" : "gender"}) else "None"
            data['house'] = html_parsed_bio.find("div", attrs={"data-source" : "house"}).find('a').text if html_parsed_bio.find("div", attrs={"data-source" : "house"}) else "None"
            # data['base64'] = str(base64.b64encode(urlopen(image_container).read())).replace("b'", '')
            data['url'] = image_container
            Chars.append(data);

json_object = json.dumps(Chars)
jsonFile = open("C:/Users/dinho/Documents/GitHub/quiz-chp-app/src/assets/data/data.json", "w")
jsonFile.write(json_object)
jsonFile.close()   
print(len(Chars))
