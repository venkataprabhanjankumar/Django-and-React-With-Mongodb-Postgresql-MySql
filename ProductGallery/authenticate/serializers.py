from rest_framework import serializers
from .models import UserDetails, User


class UserDetailsSerializer(serializers.ModelSerializer):
    gender = serializers.CharField(max_length=10, required=False)
    mobilenumber = serializers.CharField(max_length=10, required=False)

    class Meta:
        model = UserDetails
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=200, required=True)
    password = serializers.CharField(max_length=200, required=False)
    email = serializers.CharField(max_length=200, required=False)
    first_name = serializers.CharField(max_length=200, required=False)
    last_name = serializers.CharField(max_length=200, required=False)
    is_staff = serializers.BooleanField(default=False, required=False, read_only=True)
    is_active = serializers.BooleanField(default=True, required=False)
    is_superuser = serializers.BooleanField(default=False, required=False, read_only=True)

    class Meta:
        model = User
        fields = '__all__'
