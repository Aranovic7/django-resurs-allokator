from django.db import models

# Create your models here.
# management/models.py

class Resource(models.Model):
    """
    Representerar en resurs (t.ex. en student/teammedlem).
    """
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, default="Medlem")
    available_hours = models.DecimalField(
        max_digits=4, 
        decimal_places=2, 
        help_text="Tillgängliga timmar per vecka."
    )

    def __str__(self):
        return f"{self.name} - {self.role}"

class Task(models.Model):
    """
    Representerar en uppgift som ska allokeras.
    """
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    
    # Kärnan i vår allokeringslogik
    DIFFICULTY_CHOICES = [
        (1, 'Lätt'),
        (2, 'Måttlig'),
        (3, 'Svår'),
        (4, 'Mycket Svår'),
    ]
    difficulty = models.IntegerField(
        choices=DIFFICULTY_CHOICES, 
        default=2, 
        help_text="Svårighetsgrad (1-4)."
    )
    estimated_time = models.DecimalField(
        max_digits=4, 
        decimal_places=2, 
        help_text="Beräknad tid att slutföra (timmar)."
    )
    
    is_completed = models.BooleanField(default=False)
    
    # Relation till Resource (vem har tilldelats uppgiften)
    assigned_to = models.ForeignKey(
        Resource, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='tasks'
    )
    
    def __str__(self):
        return self.name