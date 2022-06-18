from bs4 import BeautifulSoup
import requests

products = []  # List to store name of the product
prices = []  # List to store price of the product
ratings = []  # List to store rating of the product

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'}
url = "https://graalspotter.com/collections/all"

r = requests.get(url, headers=headers)
soup = BeautifulSoup(r.content, 'html5lib')

content = soup.find('a', attrs={'class': 'grid-view-item__link grid-view-item__image-container full-width-link'})

for a in content:
    name = a.find(
        'span', attrs={'class': 'h4 grid-view-item__title product-card__title'}).text
    price = a.find('span', attrs={'class': 'price__regular'}).text
    brand = a.find(
        'span', attrs={'class': 'price__vendor price__vendor--listing'}).text
    products.append(name.text)
    prices.append(price.text)
    products.append(brand.text)


print(name)