from django.shortcuts import render, HttpResponse

# Create your views here.


def home(request) : 
    return render(request, "home.html")

def statique(request) : 
    return HttpResponse("Hello statique")

def cinetique(request) : 
    return HttpResponse("Hello cinetique")
