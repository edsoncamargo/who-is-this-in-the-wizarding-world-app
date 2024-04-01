import requests
from bs4 import BeautifulSoup
import re
from urllib.request import urlopen
import json
import os.path

url = "https://harrypotter.fandom.com/wiki/List_of_Harry_Potter_cast_members"
headers = {"user-agent": "Mozilla/5.0"}
response = requests.get(url, headers=headers)
html = response.text
html_parsed = BeautifulSoup(html, "html.parser")
table_films = html_parsed.find_all("th")

start_chars_index = 11
Chars = []

for index, table_char in enumerate(table_films):
    if (
        index >= start_chars_index
        and index <= 200
        and table_char.find("a", href=re.compile("^/wiki/.*"))
        and str(table_char.find("h3")) == "None"
        and str(table_char.find("span")) == "None"
    ):
        url_image = "https://harrypotter.fandom.com/" + table_char.find("a")["href"]
        headers_image = {"user-agent": "Mozilla/5.0"}
        response_image = requests.get(url_image, headers=headers_image)
        html_image = response_image.text
        html_parsed_bio = BeautifulSoup(html_image, "html.parser")
        if (
            html_parsed_bio.find("figure")
            and html_parsed_bio.find("figure").find("a")
            and html_parsed_bio.find("figure").find("a")["href"]
        ):
            image_container = html_parsed_bio.find("figure").find("a")["href"]
            data = {}
            data["name"] = table_char.find("a").text
            data["blood"] = (
                html_parsed_bio.find("div", attrs={"data-source": "blood"})
                .find("a")
                .text
                if html_parsed_bio.find("div", attrs={"data-source": "blood"})
                else "None"
            )
            #
            borns = (
                html_parsed_bio.find("div", attrs={"data-source": "born"}).findAll("a")
                if html_parsed_bio.find("div", attrs={"data-source": "born"})
                else "None"
            )
            bornConcat = ""
            for born in borns:
                if hasattr(born, "text"):
                    if bornConcat:
                        if (
                            "[1]" not in born.text
                            and "[2]" not in born.text
                            and "[3]" not in born.text
                            and "[4]" not in born.text
                            and "[5]" not in born.text
                            and "[6]" not in born.text
                        ):
                            bornConcat = bornConcat + ", " + born.text
                    else:
                        bornConcat = born.text
            #

            data["born"] = (
                bornConcat
                if html_parsed_bio.find("div", attrs={"data-source": "blood"})
                else "None"
            )
            data["born"] = data["born"] if data["born"] else "None"
            data["species"] = (
                html_parsed_bio.find("div", attrs={"data-source": "species"})
                .find("a")
                .text
                if html_parsed_bio.find("div", attrs={"data-source": "species"})
                else "None"
            )
            data["gender"] = (
                html_parsed_bio.find("div", attrs={"data-source": "gender"})
                .find("div")
                .text
                if html_parsed_bio.find("div", attrs={"data-source": "gender"})
                else "None"
            )
            data["gender"] = (
                data["gender"]
                .replace("[1]", "")
                .replace("[2]", "")
                .replace("[3]", "")
                .replace("[4]", "")
                .replace("[5]", "")
                .replace("[6]", "")
                .replace("[7]", "")
                .replace("[8]", "")
                .replace("[9]", "")
                .replace("[10]", "")
                .replace("[11]", "")
                .replace("[12]", "")
                .replace("[13]", "")
                .replace("[14]", "")
                .replace("[15]", "")
                .replace("[16]", "")
            )
            data["house"] = (
                html_parsed_bio.find("div", attrs={"data-source": "house"})
                .find("a")
                .text
                if html_parsed_bio.find("div", attrs={"data-source": "house"})
                else "None"
            )
            data["url"] = image_container
            Chars.append(data)

json_object = json.dumps(Chars)
jsonFile = open(os.path.basename("/chars.json"), "w")
jsonFile.write(json_object)
jsonFile.close()
print("Added " + str(len(Chars)) + " chars 😶‍🌫️")
