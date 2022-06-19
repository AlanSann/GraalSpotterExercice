from csv import reader
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin
from rest_framework import generics,filters

from .models import website_sneakers
from .models import my_sneakers
from .serializers import website_sneakersSerializer
from .serializers import my_sneakersSerializer

# Create your views here.
class website_sneakersView(
    APIView,
    UpdateModelMixin,
    DestroyModelMixin,
):
    # function to get all sneakers

    def get(self, request, id=None):
        if id:
            try:
               queryset = website_sneakers.objects.get(id=id) # get the data from the database
            except website_sneakers.DoesNotExist:
                return Response({'errors': 'This sneaker does not exist.'},status=404)  # return error message and status code
            read_sneakers_object = website_sneakersSerializer(queryset) # serialize python data to json
        else:
            queryset = website_sneakers.objects.all() # get all the sneakers
            read_sneakers_object = website_sneakersSerializer(queryset, many=True) # serialize Django queryset object to JSON formatted data
        return Response(read_sneakers_object.data)  # return the data and status code


    # function to create a new sneaker
    def post(self, request):
        create_serializer = website_sneakersSerializer(data=request.data)

        if create_serializer.is_valid(): # check if the data is valid
            sneakers_object = create_serializer.save() # save the data
            read_sneakers_object = website_sneakersSerializer(sneakers_object) # serialize python the data to json
            return Response(read_sneakers_object.data, status=201) # return the data and status code

        return Response(create_serializer.errors, status=400) # return the error if not valid


    # function to update a sneaker
    def put(self, request, id=None):
        try:
            sneakers = website_sneakers.objects.get(id=id) # get the data from the database
        except website_sneakers.DoesNotExist:
            return Response({'errors': 'This sneaker does not exist.'},status=404)
        update_serializer = website_sneakersSerializer(sneakers, data=request.data)

        if update_serializer.is_valid():
            sneakers_object = update_serializer.save()
            read_sneakers_object = website_sneakersSerializer(sneakers_object)
            return Response(read_sneakers_object.data, status=200)
        return Response(update_serializer.errors, status=400)


    # function to delete a sneaker
    def delete(self, request, id=None):
        try:
            sneakers = website_sneakers.objects.get(id=id) # get the data from the database
        except website_sneakers.DoesNotExist:
            return Response({'errors': 'This sneaker does not exist.'},status=404)
        sneakers.delete()
        return Response(status=204)


# view for searching sneakers
class search_sneakers(generics.ListCreateAPIView):
    search_fields = ['name','creator']
    filter_backends = [filters.SearchFilter]
    queryset = my_sneakers.objects.all()
    serializer_class = my_sneakersSerializer
