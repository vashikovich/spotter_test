from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_route, name='get_route'),
]