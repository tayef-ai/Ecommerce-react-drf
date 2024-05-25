from django.contrib import admin
from .models import *

class ImageInline(admin.TabularInline):
    model = ProductImage


class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'price', 'brand', 'category']
    inlines = [
        ImageInline,
    ]
admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(ProductImage)
admin.site.register(Customer)
admin.site.register(OrderPlaced)
admin.site.register(Cart)