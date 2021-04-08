from .products_json import products

import json

from .models import Product


def create_and_store_products():
    for product in products:
        x = json.loads(product)
        product = Product(name=x['name'], image=x['image'], brand=x['brand'], category=x['category'],
                          description=x['description'], rating=x['rating'], numReviews=x['numReviews'],
                          price=x['price'], countInStock=x['countInStock'])
        product.save_me()
        print(Product(x))
