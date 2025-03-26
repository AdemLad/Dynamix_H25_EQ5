from django.shortcuts import render, HttpResponse

# Create your views here.


def home(request) : 
    return render(request, "home.html")

def simulation(request) : 
   return render(request, "simulation.html")


