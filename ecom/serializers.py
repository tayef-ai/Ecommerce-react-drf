from rest_framework import serializers
from . import models

class ProductSerializer(serializers.ModelSerializer):
    # category = serializers.StringRelatedField()
    # product_image = serializers.StringRelatedField()
    class Meta:
        model = models.Product
        fields = ['id', 'title', 'selling_price', 'discounted_price', 'description', 'brand', 'category', 'product_image', 'price']
        depth = 1

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = "__all__"

class OrderSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = models.OrderPlaced
        fields = ['id', 'customer', 'product', 'quantity', 'order_date', 'status', 'total_cost']
        depth = 1

class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = models.Cart
        fields = ['id', 'total_cost', 'product', 'quantity']
        depth = 1

class CategorySerializer(serializers.ModelSerializer):
    product_category = ProductSerializer(many=True)
    class Meta:
        model = models.Category
        fields = ['id', 'categoryname', 'detail', 'product_category']
        depth = 1