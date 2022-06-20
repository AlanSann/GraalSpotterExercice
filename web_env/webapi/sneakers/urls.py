from django.urls import path

from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('sneakers/', views.WebsiteSneakersView.as_view(), name='sneakers'),
    path('sneakers/<int:sneaker_id>/', views.WebsiteSneakersView.as_view(), name='sneaker_detail'),
    path('search/', views.SearchSneakers.as_view(), name='search'),
    path('search/<int:sneaker_id>/', views.SearchSneakers.as_view(), name='search_detail'),
]