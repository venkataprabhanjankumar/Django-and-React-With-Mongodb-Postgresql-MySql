from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authenticate/', include('authenticate.urls')),
    path('products/', include('products.urls')),
    path('productsapp/', include('productsapp.urls'))
]
