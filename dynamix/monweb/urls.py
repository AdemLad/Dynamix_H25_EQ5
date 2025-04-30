from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.home, name="home"),
    path("simulations/", views.simulations, name="simulations"),

    path("simulation/pendule/", views.pendule, name="pendule"),
    
]
    

