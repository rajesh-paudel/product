from django.contrib import admin
from .models import Category, Product, Inquiry

# Register models to appear in admin panel
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Inquiry)
