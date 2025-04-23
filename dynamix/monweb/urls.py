from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("simulations/", views.simulations, name="simulations"),

    path("simulation/statique/", views.simulateurStatique, name="simulateur statique"),

    path("simulation/pendule/", views.pendule, name="pendule"),
    
]
    

