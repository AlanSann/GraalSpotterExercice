from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(ChromeDriverManager().install())

products = []  # List to store name of the product
prices = []  # List to store price of the product
ratings = []  # List to store rating of the product

driver.get("<a href='https://graalspotter.com/products/'>https://graalspotter.com/products/</a>new-balance-2002r-black-dark-grey")

content = driver.page_source
soup = BeautifulSoup(content)
for a in soup.findall('a', href=True, attrs={'class': 'grid-view-item__link grid-view-item__image-container full-width-link'}):
    name = a.find(
        'span', attrs={'class': 'h4 grid-view-item__title product-card__title'}).text
    price = a.find('span', attrs={'class': 'price__regular'}).text
    brand = a.find(
        'span', attrs={'class': 'price__vendor price__vendor--listing'}).text
    products.append(name.text)
    prices.append(price.text)
    products.append(brand.text)

df = pd.DataFrame({'Product Name':products,'Price':prices,'Rating':ratings}) 
df.to_csv('products.csv', index=False, encoding='utf-8')