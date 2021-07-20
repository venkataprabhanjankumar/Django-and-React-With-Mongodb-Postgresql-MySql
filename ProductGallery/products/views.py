from django.views.decorators.csrf import csrf_protect
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED

from .models import ProductsCollection, Tags, Comments


@api_view(['POST'])
@csrf_protect
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([FormParser, MultiPartParser])
def uploadProducts(request):
    if request.user.is_authenticated:
        print(request.data)
        print(request.FILES)
        productName = request.data.get('productName')
        productCount = request.data.get('productCount')
        productsBy = request.data.get('productBy')
        tagsList = request.data.get('tags')
        tags = tagsList.split(',')
        productLikes = request.data.get('productLikes')
        productPrice = request.data.get('productPrice')
        productImage = request.FILES.get('productImage')
        print(productName)
        print(tags)
        products = ProductsCollection(
            productName=productName,
            productLikes=productLikes,
            productCount=productCount,
            productBy=productsBy,
            productImage=productImage,
            productPrice=productPrice
        )
        products.save()
        print("Saved")
        for tag in tags:
            tagInstance, created = Tags.objects.get_or_create(tagName=tag)
            products.tags.add(tagInstance)
        print("Tags Saved")
        return Response({'status': 'Ok'})
    else:
        return Response(status=HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getProducts(request):
    productsList = []
    print(request.GET)
    userTag = request.GET.get('tagName')
    productTag = Tags.objects.get(tagName=userTag)
    products = productTag.productscollection_set.all()
    for product in products:
        print(product.comments.all())
        productsList.append({
            'productName': product.productName,
            'productImage': str(product.productImage),
            'productPrice': product.productPrice,
            'productLikes': product.productLikes,
            'productId': product.id
        })
    return Response({'status': 'Ok', 'productList': productsList}, content_type='application/json')


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getUserProducts(request):
    productsList = []
    print(request.user)
    if request.user.is_authenticated:
        username = request.user
        products = ProductsCollection.objects.filter(productBy=username)
        for product in products:
            productsList.append({
                'productName': product.productName,
                'productImage': str(product.productImage),
                'productPrice': product.productPrice
            })
        return Response({'status': 'Ok', 'productList': productsList}, content_type='application/json')
    else:
        return Response(status=HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def handleLikes(request):
    print(request)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def handleComments(request):
    print(request.data)
    username = request.data.get('username')
    user_comment = request.data.get('comment')
    product_id = request.data.get('product_id')
    product = ProductsCollection.objects.get(id=product_id)
    comment = Comments.objects.create(commentBy=username, comment=user_comment)
    comment.productscollection_set.add(product)
    print("Comment Saved")
    return Response({'status': 'Ok'})


@api_view(['Get'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def productDetails(request):
    productComments = []
    if request.user.is_authenticated:
        print(request.GET)
        product_id = request.GET.get('productId')
        product = ProductsCollection.objects.get(id=product_id)
        comments = product.comments.all()
        for productComment in comments:
            productComments.append({'commentBy': productComment.commentBy, 'comment': productComment.comment})
        return Response({
            'status': 'Ok',
            'ProductName': product.productName,
            'productImage': str(product.productImage),
            'productPrice': product.productPrice,
            'productComments': productComments,
            'productLikes': product.productLikes
        })
    else:
        return Response(status=HTTP_401_UNAUTHORIZED)

