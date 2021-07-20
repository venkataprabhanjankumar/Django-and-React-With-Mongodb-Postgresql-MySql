from django.contrib import admin
from .models import ProductsCollection, Comments, Tags

admin.site.register(ProductsCollection)
admin.site.register(Comments)
admin.site.register(Tags)
