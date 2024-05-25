from django.shortcuts import render, redirect
from .serializers import *
from rest_framework import generics
from . import models
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
from core.models import MyUser
from django.contrib.auth.hashers import make_password
from .context_processor import cart_count
from django.db.models import Q
# Create your views here.

class Product(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = ProductSerializer    

class Customer(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = CustomerSerializer  

class Order(generics.ListCreateAPIView):
    queryset = models.OrderPlaced.objects.all()
    serializer_class = OrderSerializer

class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.OrderPlaced.objects.all()
    serializer_class = OrderSerializer

class Cart(generics.ListCreateAPIView):
    queryset = models.Cart.objects.all()
    serializer_class = CartSerializer

class CartDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Cart.objects.all()
    serializer_class = CartSerializer

class Category(generics.ListCreateAPIView):
    queryset = models.Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Category.objects.all()
    serializer_class = CategorySerializer

@csrf_exempt
def customer_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    user = authenticate(email = email, password = password)
    if user:
        msg = {
            'bool': True,
            'user': user.email
        }
    else:
        msg = {
            'bool': False,
            'msg': 'Invalid email/password'
        }
    return JsonResponse(msg)

@csrf_exempt
def customer_register(request):
    try:
        email = request.POST.get('email')
        name = request.POST.get('name')
        pw = request.POST.get('password')
        password = make_password(pw)
        user = MyUser(email=email, name=name, password=password)
        user.save()
        if user:
            msg = {
                'bool': True,
                'user': user.email,
                'msg': 'User created Successfully...Please login again...'
            }
    except:
        msg = {
            'bool': False,
            'msg': 'Ooops...Something went wrong'
        }
    return JsonResponse(msg)

# @csrf_exempt
def add_to_cart(request):
    email = request.GET.get('email')
    product_id = request.GET.get('product_id')
    product = models.Product.objects.get(id=product_id)
    user = models.MyUser.objects.get(email=email)
    product_exist = models.Cart.objects.filter(user=user, product=product).exists()
    if product_exist:
        msg = {
            'msg': 'This product is already exist in the cart'
        }
        print("cartttttttt.......", cart_count(request))
        return JsonResponse(msg)
    else:
        models.Cart(user=user, product=product).save()
        msg = {
            'msg': 'product added to cart.'
        }
        return JsonResponse(msg)
    
def show_cart(request):
    email = request.GET.get('email')
    user = MyUser.objects.get(email=email)
    carts = models.Cart.objects.filter(user=user).order_by('-id')
    serializer = CartSerializer(carts, many=True)
    amount = 0.0
    shipping_amount = 70.0
    total_amount = 0.0
    
    cart_product = [p for p in models.Cart.objects.all() if p.user == user]
    if cart_product:
        for p in cart_product:
            tempamount = (p.quantity * p.product.price)
            amount += tempamount
        total_amount = amount + shipping_amount
    msg = {
        'carts': serializer.data,
        'totalamount': total_amount,
        'shipping_amount': shipping_amount,
        'amount': amount,
    }
    return JsonResponse(msg)

def counted(request):
    # email = request.GET.get('email')
    msg = {
        'cart_count': cart_count(request),
    }
    return JsonResponse(msg)

def plus_cart(request):
    if request.method == 'GET':
        email = request.GET.get('email')
        prod_id = request.GET['prod_id']
        # print("ema===========",email)
        # print("prod===========",prod_id)
        user = MyUser.objects.get(email=email)
        print("user==========", user)
        product = models.Product.objects.get(id=prod_id)
        print("product==========", product)
        c = models.Cart.objects.get(product=product, user=user)
        c.quantity+=1
        c.save()
        amount = 0.0
        shipping_amount = 70.0
        total_amount = 0.0
        cart_product = [p for p in models.Cart.objects.all() if p.user == user]
        if cart_product:
            for p in cart_product:
                tempamount = (p.quantity * p.product.price)
                amount += tempamount
            total_amount = amount + shipping_amount
        data = {
            'quantity': c.quantity,
            'amount': amount,
            'totalamount': total_amount,
        }
        return JsonResponse(data)

def minus_cart(request):
    if request.method == 'GET':
        email = request.GET.get('email')
        prod_id = request.GET['prod_id']
        user = MyUser.objects.get(email=email)
        print("user==========", user)
        product = models.Product.objects.get(id=prod_id)
        print("product==========", product)
        c = models.Cart.objects.get(product=product, user=user)
        c.quantity-=1
        c.save()
        amount = 0.0
        shipping_amount = 70.0
        total_amount = 0.0
        cart_product = [p for p in models.Cart.objects.all() if p.user == email]
        if cart_product:
            for p in cart_product:
                tempamount = (p.quantity * p.product.price)
                amount += tempamount
            total_amount = amount + shipping_amount
        data = {
            'quantity': c.quantity,
            'amount': amount,
            'totalamount': total_amount,
        }
        return JsonResponse(data)

def remove_cart(request):
    if request.method == 'GET':
        email = request.GET.get('email')
        prod_id = request.GET['prod_id']
        user = MyUser.objects.get(email=email)
        print("user==========", user)
        product = models.Product.objects.get(id=prod_id)
        print("product==========", product)
        c = models.Cart.objects.get(product=product, user=user)
        c.delete()
        amount = 0.0
        shipping_amount = 70.0
        total_amount = 0.0
        cart_product = [p for p in models.Cart.objects.all() if p.user == email]
        for p in cart_product:
            tempamount = (p.quantity * p.product.price)
            amount += tempamount
        data = {
            'amount': amount,
            'totalamount': amount + shipping_amount,
        }
        return JsonResponse(data)
        # return redirect('/cart/')

def payment_done(request):
    email = request.GET.get('email')
    user = MyUser.objects.get(email=email)
    customer = models.Customer.objects.get(user=user)
    print("addr==========", customer.phone)
    if not customer.shipping_address or not customer.phone:
        msg = {
            'msg': "Please Provide Your Address and Moble No. To Confirm Order"
        }
        return JsonResponse(msg)
    else:
        cart = models.Cart.objects.filter(user=user)
        for c in cart:
            models.OrderPlaced(customer=customer, product=c.product, quantity=c.quantity).save()
            c.delete()
        msg = {
            'msg': "Your order has been placed successfully."
        }
        return JsonResponse(msg)

def orders(request):
    email = request.GET.get('email')
    user = MyUser.objects.get(email=email)
    customer = models.Customer.objects.get(user=user)
    op = models.OrderPlaced.objects.filter(customer=customer).order_by('-id')
    serialized = OrderSerializer(op, many=True)
    return JsonResponse(serialized)

def cancelorder(request):
    id = request.GET.get('id')
    op = models.OrderPlaced.objects.get(id=id)
    op.delete()
    msg = {
        'msg': "Your Order has been cancelled Successfully."
    }
    return JsonResponse(msg)