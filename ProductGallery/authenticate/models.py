from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import User


class UserDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    gender = models.CharField(max_length=10)
    mobileNumber = PhoneNumberField()

    class Meta:
        db_table = 'UserDetails'

    def __str__(self):
        return self.user.username
