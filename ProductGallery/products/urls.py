from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('upload-products', views.uploadProducts),
    path('searchProducts/', views.getProducts),
    path('display-products', views.getUserProducts),
    path('get-product/', views.productDetails),
    path('likes', views.handleLikes),
    path('comments', views.handleComments),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# images is accessed by https://127.0.0.1:8000/products/products_EmjLE9M.png
