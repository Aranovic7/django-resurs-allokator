# management/views.py
from rest_framework import viewsets
from .models import Resource, Task
from .serializers import ResourceSerializer, TaskSerializer

class ResourceViewSet(viewsets.ModelViewSet):
    """
    API-slutpunkt för att hantera resurser (CRUD).
    Rutas till /api/resources/
    """
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

class TaskViewSet(viewsets.ModelViewSet):
    """
    API-slutpunkt för att hantera uppgifter (CRUD).
    Rutas till /api/tasks/
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer