import pandas as pd
import requests
from bs4 import BeautifulSoup


def mars_headline():
    url = "https://mars.nasa.gov/api/v1/news_items/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest"
    resp = requests.get(url).json()
    first_item = resp.get('items')[0]
    title = first_item.get('title')
    desc = first_item.get('description')
    return {"item_title": title, 
            "item_desc": desc}
# dict_headline = mars_headline()

def mars_featured_img():
    target = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    resp = requests.get(target, headers=headers)
    soup = BeautifulSoup(resp.text, "html.parser")
    url = soup.find('article',{'class' : 'carousel_item'})['style'].strip(';').strip('background-image: url').strip("(").strip(')').strip("'")
    domain = 'https://www.jpl.nasa.gov'
    title = soup.find('article',{'class' : 'carousel_item'}).find('h1').get_text().strip('\r').strip('\n').strip('\t').strip('')
    featured_image_url = ''.join(domain+url)
    return {"image_url": featured_image_url}
# dict_featured_img = mars_featured_img()

def mars_weather():
    target = 'https://twitter.com/marswxreport?lang=en'
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    resp = requests.get(target, headers=headers)
    soup = BeautifulSoup(resp.text, "html.parser")
    weather = soup.find('ol', {'class' : 'stream-items'}).find('p', {'class' : 'TweetTextSize'}).get_text()
    return {"mars_weather": weather}
# dict_weather = mars_weather()

def mars_table():
    tables = pd.read_html("https://space-facts.com/mars/") 
    m_table = tables[0]
    m_table.columns = ['Dimension', "Metric"]
    formatted =  m_table.to_html(classes=["table-bordered", "table-striped", "table-hover"])
    return {"html_table_facts": formatted}
# dict_table = mars_table()

def mars_images():
    target = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    resp = requests.get(target, headers=headers)
    soup = BeautifulSoup(resp.text, "html.parser")
    domain = 'https://astrogeology.usgs.gov/'
    hemi = []
    for x in soup.find_all('a', {'class' : 'itemLink product-item'}):
        title = x.find('img')['alt'].replace(' Enhanced thumbnail', '')
        url1 = x['href']
        target = ''.join(domain+url1)
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
        resp = requests.get(target, headers=headers)
        soup = BeautifulSoup(resp.text, "html.parser")
        url2 = soup.find('img', {'class' : 'wide-image'})['src']
        url2 = ''.join(domain+url2)
        hemi.append ({
            'title' : title,
            'image_url' : url2})
    return { 'hemisphere_image_urls' : hemi}    
# dict_hemis = mars_images()

def scrape_master():
    print('scraping stuff')
    dict_headline = mars_headline()
    dict_featured_img = mars_featured_img()
    dict_weather = mars_weather()
    dict_table = mars_table()
    dict_hemis = mars_images()
    dict_merged = {**dict_headline, **dict_featured_img, **dict_weather,**dict_table, **dict_hemis}
    print('done merging')
    # merged dict will be the new data in mongodb
    return dict_merged