from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.home, name="home"),
    path("simulations/", views.simulations, name="simulations"),

    path("simulation/statique/", views.simulateurStatique, name="simulateur statique"),

    path("simulation/pendule/", views.pendule, name="pendule"),
    
]
    
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
