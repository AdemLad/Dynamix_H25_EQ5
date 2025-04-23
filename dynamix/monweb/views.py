from django.shortcuts import render, HttpResponse

# Create your views here.


def home(request) : 
    return render(request, "home.html")

def simulations(request) : 
   return render(request, "simulations.html")

def pendule(request) : 
   return render(request, "pendule.html")

def simulateurStatique(request) : 
   return render(request, "statique2.html")

