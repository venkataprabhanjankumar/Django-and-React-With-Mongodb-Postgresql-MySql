from django.contrib.auth.hashers import check_password
from django.db.models import Q
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import permission_classes, api_view, authentication_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from django.contrib.auth.hashers import make_password
from rest_framework.status import HTTP_401_UNAUTHORIZED

from .models import User
from .models import UserDetails


@api_view(['GET'])
@authentication_classes([TokenAuthentication, BasicAuthentication])
@permission_classes([permissions.IsAuthenticated])
def check(request):
    if request.user.is_authenticated:
        user = User.objects.get(username=request.user)
        username = user.username
        email = user.email
        first_name = user.first_name
        last_name = user.last_name
        userDetails = UserDetails.objects.get(user=user)
        gender = userDetails.gender
        mobileNumber = userDetails.mobileNumber
        print(mobileNumber)
        return Response({
            'status': 'Ok',
            'username': username,
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'gender': gender,
            'mobileNumber': str(mobileNumber)
        })


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
@csrf_protect
def login(request):
    print(request.data)
    username = request.data.get('username')
    password = request.data.get('password')
    users = User.objects.get(Q(username=username) | Q(email=username))
    if check_password(password, users.password):
        try:
            authToken = Token.objects.get(user_id=users.id)
            authKey = authToken.key
            print(authKey)
            return Response({'login_status': 'Ok', 'authKey': authKey})
        except Token.DoesNotExist:
            token_generation = Token.objects.create(user_id=users.id)
            token_generation.save()
            authToken = Token.objects.get(user_id=users.id)
            authKey = authToken.key
            print(authKey)
            return Response({'login_status': 'Ok', 'authKey': authKey})
    else:
        return Response({'login_status': 'Invalid'})


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
@csrf_protect
def register(request):
    print(request.method)
    print(request.data)
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    users = User.objects.filter(Q(username=username) | Q(password=password))
    if len(users) != 0:
        return Response({'msg': 'User Already Exist', 'status_msg': 'NotOk'})
    user = User.objects.create_user(
        username=username,
        password=password,
        email=email,
    )
    user.first_name = first_name
    user.last_name = last_name
    user.save()
    gender = request.data.get('gender')
    mobilenumber = request.data.get('mobilenumber')
    userInstance = User.objects.get(username=username)
    userDetail = UserDetails(user=userInstance, gender=gender, mobileNumber=mobilenumber)
    userDetail.save()
    print("saved")
    return Response({'status_msg': 'Ok', 'msg': 'Successfully Registered'})


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
@ensure_csrf_cookie
def getCsrfToken(request):
    print(request)
    return Response({'status': 'Ok'})


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def changePassword(request):
    if request.user.is_authenticated:
        print(request.user)
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        user = User.objects.get(username=request.user)
        if check_password(old_password, user.password):
            user.password = make_password(new_password)
            user.save()
            print("Saved")
            return Response({'status': 'Ok'})
        else:
            return Response({'status':'NotOk'})
    else:
        return Response(status=HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def logout(request):
    if request.user.is_authenticated:
        print(request.user)
        user = User.objects.get(username=request.user)
        token = Token.objects.get(user_id=user.id)
        token.delete()
        print("Deleted")
        return Response({'status': 'Ok'})
    else:
        return Response(status=HTTP_401_UNAUTHORIZED)
