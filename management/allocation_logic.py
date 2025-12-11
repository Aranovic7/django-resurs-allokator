# management/allocation_logic.py

from .models import Resource, Task
from django.db import transaction
from decimal import Decimal

def allocate_tasks():
    """
    Implementerar den systemvetenskapliga allokeringsalgoritmen.
    1. Beräknar en vikt (prioritet) för varje icke-slutförd uppgift.
    2. Allokerar uppgifter till tillgängliga resurser baserat på högst vikt först.
    """
    
    # 1. Hämta alla resurser och uppgifter
    resources = list(Resource.objects.all())
    # Hämta endast icke-slutförda uppgifter som ännu inte är tilldelade
    tasks_to_allocate = list(Task.objects.filter(is_completed=False, assigned_to__isnull=True))

    # Nollställ tilldelning för alla icke-slutförda uppgifter i början av en ny körning
    # Detta säkerställer att vi allokerar om vid varje körning.
    Task.objects.filter(is_completed=False).update(assigned_to=None) 
    
    # För att hålla koll på hur mycket tid varje resurs har kvar under allokeringen
    resource_time_map = {res: res.available_hours for res in resources}
    
    if not resources:
        return {"success": False, "message": "Inga resurser tillgängliga för allokering."}

    # 2. Beräkna vikt för varje uppgift (Systemvetenskaplig logik)
    # Vikt = Beräknad tid * Svårighetsgrad. Högre vikt = Högre prioritet.
    weighted_tasks = []
    for task in tasks_to_allocate:
        # Säkerställ att vi hanterar siffror korrekt med Decimal
        time = Decimal(task.estimated_time)
        difficulty = Decimal(task.difficulty)
        
        weight = time * difficulty
        
        weighted_tasks.append({
            'task': task,
            'weight': weight,
            'estimated_time': time
        })

    # Sortera efter vikt, högst prioritet först
    weighted_tasks.sort(key=lambda x: x['weight'], reverse=True)

    # 3. Allokeringsprocessen
    allocation_summary = []
    unallocated_count = 0

    # Använd transaction.atomic() för att garantera att alla ändringar sparas eller ingen sparas
    with transaction.atomic():
        for item in weighted_tasks:
            task = item['task']
            time_needed = item['estimated_time']
            
            # Hitta den resurs som har mest tid kvar och kan hantera uppgiften
            # Sortera resurser baserat på tillgänglig tid (störst först)
            resources.sort(key=lambda res: resource_time_map[res], reverse=True)
            
            best_resource = None
            
            # Hitta den resurs som har tillräckligt med tid
            for res in resources:
                if resource_time_map[res] >= time_needed:
                    best_resource = res
                    break

            if best_resource:
                # Tilldela uppgiften och spara i databasen
                task.assigned_to = best_resource
                task.save()
                
                # Uppdatera resursens kvarvarande tid i vår lokala karta
                resource_time_map[best_resource] -= time_needed
                
                allocation_summary.append({
                    "task": task.name,
                    "assigned_to": best_resource.name,
                    "time": str(time_needed)
                })
            else:
                unallocated_count += 1
    
    return {
        "success": True, 
        "total_allocated": len(allocation_summary),
        "total_unallocated": unallocated_count,
        "allocations": allocation_summary,
        "resource_load": {res.name: str(res.available_hours - resource_time_map[res]) for res in resources}
    }