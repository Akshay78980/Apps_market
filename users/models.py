from django.db import models

from django.contrib.auth.models import AbstractUser
# Create your models here.


class CustomUser(AbstractUser):
    
    points = models.IntegerField(default=0)
    tasks_completed = models.IntegerField(default=0)