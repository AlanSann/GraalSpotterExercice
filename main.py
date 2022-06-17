# Importing the libraries that we will use in our program.
import time
import requests
from bs4 import BeautifulSoup
import json

# The url of the website that we want to scrap and the headers are the headers of the request that we send to the website.
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'}
url = "https://graalspotter.com/collections/all"


def get_last_page(address):
    """
    It takes the address of the first page of the search results, and returns the last page number

    :param address: The address of the website you want to scrape
    :return: The last page number
    """
    r = requests.get(address, headers=headers)
    soup = BeautifulSoup(r.content, 'html5lib')

    content = soup.find('li', attrs={'class': 'pagination__text'})

    # Extract all numbers from the content in array
    numbers = [int(s) for s in content.text.split() if s.isdigit()]

    # Return the last page
    return numbers[-1]


def get_all_products_from_page(address):
    """
    It takes a URL and returns an array of all the product URLs on that page

    :param address: The address of the page you want to scrape
    :return: A list of all the hrefs from the content
    """
    r = requests.get(address, headers=headers)
    soup = BeautifulSoup(r.content, 'html5lib')

    content = soup.find_all('a',
                            attrs={'class': 'grid-view-item__link grid-view-item__image-container full-width-link'})

    # Extract all hrefs from the content in array
    hrefs = [s['href'] for s in content]

    # Return the hrefs
    return hrefs


def get_all_products_from_link(address):
    """
    It takes a link to a product page, and returns a dictionary with the product's name, image, price, and creator

    :param address: The URL of the product page
    :return: A dictionary with the name, image, price, and creator of the product.
    """
    try:
        r = requests.get(address, headers=headers)
        soup = BeautifulSoup(r.content, 'html5lib')

        product_creator = soup.find('div', attrs={'class': 'product-single__meta'})

        product = {
            'name': soup.find('h2', attrs={'class': 'product-single__title'}).text,
            'image': "http:" + soup.find('img', attrs={'class': 'product-featured-media'})['data-src'].replace("{width}", "2048").split("?")[0],
            'price': soup.find('span', attrs={'class': 'money'}),
            'creator': product_creator.find('a').text
        }

        if product['price'] is None:
            product['price'] = "N/A"
        else:
            product['price'] = product['price'].text

        # Return the hrefs
        return product
    except:
        print("Error: " + address)
        return None


# Lunch Program

# Getting the last page number of the website.
last_page = get_last_page(url)
# Adding the "?page=" to the url so that we can add the page number to the url.
url = url + "?page="
# It creates an empty list.
all_products_links = []

for i in range(1, last_page + 1):
    print(f'Récupération des produits de la page {i}')
    all_products_links.extend(get_all_products_from_page(url + str(i)))
    print(f'Fin de la récupération des produits de la page {i}')

print(f'Total de {len(all_products_links)} produits')

url = "https://graalspotter.com"
products = []
products_numer = 1
start_time = time.time()
for link in all_products_links:
    print(f'Récupération des informations d\' produit ({products_numer}/{len(all_products_links)}). Temps restant estimée à : {round((time.time() - start_time) / products_numer * (len(all_products_links) - products_numer))} secondes')

    product = get_all_products_from_link(url + link)

    if product is not None:
        products.append(product)

    products_numer += 1
    print(f'Fin de la récupération des informations du produit {product["name"]}\n')

# Save the product list in a json file
print("Sauvegarde des produits dans un fichier json")
with open('products.json', 'w') as outfile:
    json.dump(products, outfile)
    print("Fin de la sauvegarde des produits dans un fichier json")