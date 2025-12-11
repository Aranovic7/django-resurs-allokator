# management/views.py

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Resource, Task
from .serializers import ResourceSerializer, TaskSerializer 
from .allocation_logic import allocate_tasks 

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

class AllocationViewSet(viewsets.ViewSet): # <-- Denna rad FÅR INTE vara indragen
    """
    API-slutpunkt för att utlösa den systemvetenskapliga allokeringsalgoritmen.
    """

    @action(detail=False, methods=['post'])
    def run_allocation(self, request):
        """
        Kör allokeringsalgoritmen och returnerar sammanfattning.
        Denna slutpunkt nås via: /api/allocate/run_allocation/
        """
        result = allocate_tasks()
        
        if result['success']:
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)