from django.db import models


class UsersTable(models.Model):
    username = models.CharField(max_length=200, unique=True, null=False)
    email = models.EmailField(max_length=200, unique=True, null=False)

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'UsersTable'


class Products(models.Model):
    productName = models.CharField(max_length=200)
    productCount = models.IntegerField()

    def __str__(self):
        return self.productName

    class Meta:
        db_table = 'ProductsTable'
