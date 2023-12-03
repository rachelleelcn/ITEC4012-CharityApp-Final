from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Charity(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=100)
    website = models.URLField(max_length=255)
    image = models.ImageField()

    def __str__(self):
        return self.name


class Community(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    featured = models.BooleanField()
    cotm_id = models.ForeignKey(Charity, models.SET_NULL, blank=True, null=True)
    progress = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class User_History(models.Model):
    historyID = models.AutoField(primary_key=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    communityName = models.CharField(max_length=255)
    charityName = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)


class User_Community(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    communityID = models.ForeignKey(Community, on_delete=models.CASCADE)


class Community_History(models.Model):
    historyID = models.AutoField(primary_key=True)
    communityID = models.ForeignKey(Community, on_delete=models.CASCADE)
    charityName = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()



class Community_Charity(models.Model):
    communityID = models.ForeignKey(Community, on_delete=models.CASCADE)
    charityID = models.ForeignKey(Charity, on_delete=models.CASCADE)


class Community_Comment(models.Model):
    commentID = models.AutoField(primary_key=True)
    communityID = models.ForeignKey(Community, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    comment = models.TextField()
    username = models.ForeignKey(User, on_delete=models.CASCADE)
