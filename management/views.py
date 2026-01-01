# management/views.py

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Resource, Task
from .serializers import ResourceSerializer, TaskSerializer 
from .allocation_logic import allocate_tasks 

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class AllocationViewSet(viewsets.ViewSet): 
    """
    API-slutpunkt för att hantera allokeringslogik.
    """

    @action(detail=False, methods=['post'])
    def run_allocation(self, request):
        result = allocate_tasks()
        if result['success']:
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

    # LÄGG TILL DENNA DEL FÖR RENSA-KNAPPEN:
    @action(detail=False, methods=['post'])
    def clear_allocations(self, request):
        """
        Nollställer alla uppdrag i databasen genom att sätta assigned_to till null.
        Nås via: /api/allocate/clear_allocations/
        """
        try:
            # Vi nollställer fältet assigned_to på alla uppgifter samtidigt
            Task.objects.all().update(assigned_to=None)
            return Response({'success': True, 'message': 'Alla allokeringar har rensats.'})
        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)