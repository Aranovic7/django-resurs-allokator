"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# core/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from management.views import ResourceViewSet, TaskViewSet, AllocationViewSet # Importera våra ViewSets

# 1. Skapa en router (hanterar URL-skapandet automatiskt)
router = DefaultRouter()

# 2. Registrera våra ViewSets
router.register(r'resources', ResourceViewSet) # Skapar /api/resources/
router.register(r'tasks', TaskViewSet)       # Skapar /api/tasks/
router.register(r'allocate', AllocationViewSet, basename='allocation')

urlpatterns = [
    path('admin/', admin.site.urls),
    # 3. Inkludera alla router-URL:er under prefixet 'api/'
    path('api/', include(router.urls)),
]