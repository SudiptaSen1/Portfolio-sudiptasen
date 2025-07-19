from django.contrib import admin
from django.urls import path, include
from base import views

urlpatterns = [
    path('host/', admin.site.urls),
    path('', views.home, name='home'),
    path('api/contact', views.contact, name='contact'),
]