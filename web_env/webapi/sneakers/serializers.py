from rest_framework import serializers
from .models import MySneakers
from .models import WebsiteSneakers

class WebsiteSneakersSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255, required=True)
    image = serializers.CharField(max_length=255, required=False)
    price = serializers.CharField(max_length=255, required=True)
    creator = serializers.CharField(max_length=255, required=True)
    if (image == None ):
        image = "N/A"
    def create(self, validated_data):
        return WebsiteSneakers.objects.create(
            name=validated_data.get('name'),
            image=validated_data.get('image'),
            price=validated_data.get('price'),
            creator=validated_data.get('creator')
        )


    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.image = validated_data.get('image', instance.image)
        instance.price = validated_data.get('price', instance.price)
        instance.creator = validated_data.get('creator', instance.creator)
        instance.save()
        return instance

    class Meta:
        model = WebsiteSneakers
        fields = ('__all__')




class MySneakersSerializer(serializers.ModelSerializer):
    # name = serializers.CharField(max_length=255, required=True)
    # image = serializers.CharField(max_length=255)
    # price = serializers.CharField(max_length=255, required=True)
    # creator = serializers.CharField(max_length=255, required=True)

    # def create(self, validated_data):
    #     return my_sneakers.objects.create(
    #         name=validated_data.get('name'),
    #         image=validated_data('image'),
    #         price=validated_data.get('price'),
    #         creator=validated_data.get('creator')
    #     )

    # def update(self, instance, validated_data):
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.image = validated_data.get('image', instance.image)
    #     instance.price = validated_data.get('price', instance.price)
    #     instance.creator = validated_data.get('creator', instance.creator)
    #     instance.save()
    #     return instance

    class Meta:
        model = MySneakers
        fields = ('id', 'name', 'image', 'price', 'creator')