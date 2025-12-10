# management/serializers.py

from rest_framework import serializers
from .models import Resource, Task

class ResourceSerializer(serializers.ModelSerializer):
    """
    Serializer för Resource-modellen.
    """
    class Meta:
        model = Resource
        fields = '__all__'  # Inkludera alla fält

class TaskSerializer(serializers.ModelSerializer):
    """
    Serializer för Task-modellen. 
    Visar namnet på den tilldelade resursen för enkel läsning.
    """
    # Visar namnet på resursen istället för bara ID:t när vi läser data (GET)
    assigned_to_name = serializers.CharField(source='assigned_to.name', read_only=True)

    class Meta:
        model = Task
        fields = '__all__'