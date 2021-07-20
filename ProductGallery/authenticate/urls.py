from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register),
    path('get_csrf', views.getCsrfToken),
    path('login', views.login),
    path('check', views.check),
    path('change-password', views.changePassword),
    path('logout', views.logout)
]
