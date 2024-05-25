from .models import Cart
from core.models import MyUser

def cart_count(request):
    try:
        user = MyUser.objects.get(email=request.GET.get('email'))
        cart_count = Cart.objects.filter(user=user).count()
        return {'cart_count': cart_count}
    except:
        return{'cart_count': 0}