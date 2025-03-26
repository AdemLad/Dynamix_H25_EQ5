from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("statique/", views.statique, name="statique"),
    path("cinetique/", views.cinetique, name="cinetique"),
    path("simulationStatique/", views.simulationStatique, name="simulationStatique")
]
    

