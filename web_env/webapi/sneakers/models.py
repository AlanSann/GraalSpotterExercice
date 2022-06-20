from django.db import models

# Create your models here.
class MySneakers(models.Model):
    id = models.AutoField(
    primary_key=True
    )
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    price = models.CharField(max_length=255)
    creator = models.CharField(max_length=255)

    class Meta:
        db_table = 'my_sneakers'
    
    def _str_(self):
        return self.name

class WebsiteSneakers(models.Model):
    id = models.AutoField(
    primary_key=True
    )
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    price = models.CharField(max_length=255)
    creator = models.CharField(max_length=255)

    class Meta:
        db_table = 'website_sneakers'

