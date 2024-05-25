from django.urls import path
from .views import *

urlpatterns = [
    path('', Product.as_view(), name='products'),
    path('<int:pk>/', ProductDetail.as_view(), name='product_detail'),
    path('customers/', Customer.as_view(), name='customers'),
    path('customer/<int:pk>/', CustomerDetail.as_view(), name='customer_detail'),
    path('orders/', Order.as_view(), name='orders'),
    path('order/<int:pk>/', Order.as_view(), name='order_detail'),
    path('carts/', Cart.as_view(), name='carts'),
    path('cart/<int:pk>/', CartDetail.as_view(), name='cart_detail'),
    path('categories/', Category.as_view(), name='categories'),
    path('category/<int:pk>/', CategoryDetail.as_view(), name='category_detail'),
    path('customer/login/', customer_login, name='customer_login'),
    path('customer/register/', customer_register, name='customer_register'),
    path('add-to-cart/', add_to_cart, name='add_to_cart'),
    path('cart/', show_cart, name="showcart"),
    path('pluscart/', plus_cart, name='pluscart'),
    path('minuscart/', minus_cart, name='minuscart'),
    path('removecart/', remove_cart, name='removecart'),
    path('count/', counted, name='count'),
    path('paymentdone/', payment_done, name='paymentdone'),
    path('orders/', orders, name='orders'),
    path('cancelorder/', cancelorder, name='cancelorder'),
]
