from django.urls import path

from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('sneakers/', views.website_sneakersView.as_view(), name='sneakers'),
    path('sneakers/<int:sneaker_id>/', views.website_sneakersView.as_view(), name='sneaker_detail'),
    path('search/', views.search_sneakers.as_view(), name='search'),
]