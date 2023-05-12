# Create your models here.
from django.db import models

class Message(models.Model):
    id = models.AutoField(primary_key=True)
    reciever = models.CharField(max_length=255)
    emailAddress = models.EmailField(max_length=255, default='abe@gmail.com')
    fact = models.TextField()

    def __str__(self):
        return self.reciever
