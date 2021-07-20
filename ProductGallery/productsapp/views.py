from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import UsersTable, Products


@api_view(['POST', 'GET'])
@permission_classes([AllowAny])
@csrf_exempt
def Users(request):
    usersList = []
    if request.method == 'POST':
        username = request.data.get('username')
        email = request.data.get('email')
        user = UsersTable.objects.create(username=username, email=email)
        user.save()
        return Response({'status': 'User Added'})
    if request.method == 'GET':
        users = UsersTable.objects.all()
        for user in users:
            usersList.append({'username': user.username, 'email': user.email})
        return Response({'Users': usersList})


@api_view(['POST', 'GET'])
@permission_classes([AllowAny])
@csrf_exempt
def productDetails(request):
    productsList = []
    if request.method == 'POST':
        productName = request.data.get('productName')
        productCount = request.data.get('productCount')
        product = Products.objects.create(productName=productName, productCount=productCount)
        product.save()
        return Response({'status': 'Product Added'})
    if request.method == 'GET':
        products = Products.objects.all()
        for product in products:
            productsList.append({
                'productName': product.productName,
                'productCount': product.productCount
            })
        return Response({'Product': productsList})
