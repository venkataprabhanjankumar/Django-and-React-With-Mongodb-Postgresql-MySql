from djongo import models


class Tags(models.Model):
    tagName = models.CharField(max_length=200)

    def __str__(self):
        return self.tagName

    class Meta:
        db_table = 'Tags'


class Comments(models.Model):
    commentBy = models.CharField(max_length=200)
    comment = models.TextField()

    def __str__(self):
        return self.commentBy

    class Meta:
        db_table = 'Comments'


class ProductsCollection(models.Model):
    productBy = models.CharField(max_length=200)
    productImage = models.ImageField()
    productName = models.CharField(max_length=200)
    productCount = models.IntegerField()
    productLikes = models.IntegerField()
    productPrice = models.IntegerField()
    comments = models.ManyToManyField(Comments)
    tags = models.ManyToManyField(Tags)

    def __str__(self):
        return self.productName

    class Meta:
        db_table = 'ProductsCollection'
        indexes = [
            models.Index(fields=['productName'])
        ]
