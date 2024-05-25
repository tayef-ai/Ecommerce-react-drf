from django.db import models
from core.models import MyUser

STATUS = (
    ('Accepted', 'Accepted'),
    ('Packed', 'Packed'),
    ('On the way', 'On the way'),
    ('Delivered', 'Delivered'),
    ('Canceled', 'Canceled'),
)
class Customer(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE)
    shipping_address = models.TextField(null=True)
    phone = models.CharField(max_length=100, null=True)
    def __str__(self):
        return self.user.name
    

class Category(models.Model):
    categoryname = models.CharField(max_length=100)
    detail = models.TextField(null=True)
    def __str__(self):
        return self.categoryname
    

class Product(models.Model):
    title = models.CharField(max_length=100)
    selling_price = models.FloatField()
    discounted_price = models.FloatField(null=True, blank=True)
    description = models.TextField()
    brand = models.CharField(max_length=100, null=True, blank=True, default='No Brand')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='product_category')

    @property
    def price(self):
        if self.discounted_price is None:
            return self.selling_price
        else:
            return self.discounted_price
        
    def __str__(self):
        return self.title
    
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_image')
    image = models.ImageField(upload_to='product_image', null=True)

    def __str__(self):
        return self.image.url

class Cart(models.Model):
    user = models.ForeignKey(MyUser, related_name="user_cart", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cart_product')
    quantity = models.PositiveIntegerField(default=1)

    @property
    def total_cost(self):
        if self.product.discounted_price is None:
            return self.quantity * self.product.selling_price
        else:
            return self.quantity * self.product.discounted_price
    
    def __str__(self):
        return self.user.name + " " + self.product.title
    
        

class OrderPlaced(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    order_date = models.DateTimeField(auto_now=True)
    status = models.CharField(default='Pending', choices=STATUS, max_length=100)

    @property
    def total_cost(self):
        if self.product.discounted_price is None:
            return self.quantity * self.product.selling_price
        else:
            return self.quantity * self.product.discounted_price
        
class Contact(models.Model):
    cname = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    message = models.TextField()
    date = models.DateTimeField(auto_now=True)