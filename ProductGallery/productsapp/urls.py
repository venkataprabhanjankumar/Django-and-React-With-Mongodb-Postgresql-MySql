from django.urls import path
from . import views

urlpatterns = [
    path('users', views.Users),
    path('products', views.productDetails)
]
