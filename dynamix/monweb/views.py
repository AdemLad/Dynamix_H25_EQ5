from django.shortcuts import render, HttpResponse

# Create your views here.


def home(request) : 
    return render(request, "home.html")

def simulations(request) : 
   return render(request, "simulations.html")


def simulateurStatique(request) : 
   return render(request, "statique2.html")


def pendule(request) : 
   return render(request, "pendule.html")

def lancer(request) : 
   return render(request, "lancer.html")

def collisions(request) : 
   return render(request, "collisions.html")

def frottement(request) : 
   return render(request, "frottement.html")

def poulie(request) : 
   return render(request, "poulie.html")

def densite(request) : 
   return render(request, "densite.html")

def gravite(request) : 
   return render(request, "gravite.html")