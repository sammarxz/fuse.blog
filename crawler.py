import json
import requests
import bs4

res = requests.get('http://fuse.blog')
soup = bs4.BeautifulSoup(res.text, 'lxml')
links = soup.find_all("a", {"class": "post-link"})
data = {}
data['items'] = []

def get_category(categories):
    for category in categories:
        return category

for i, link in enumerate(links):    
    titles = link.find_all(class_='post-title')
    categories_geral = link.find_all(class_='post-subtitle')
    categories = [category.strip() for category in categories_geral[0]]

    for title in titles:
        data['items'].append({
            'id': i,
            'title': title.text.strip(),
            'category': get_category(categories),
            'url': link.get('href'),
            'votes': 0,
        })

with open('data.json', 'w') as outfile:
    json.dump(data, outfile, indent=2)