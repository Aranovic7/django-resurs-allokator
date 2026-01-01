import React, { useState } from "react"
import api from "../api" // Importera din API-klient
import "./AllocationPage.css"

// Vi definierar hur resultatet från Python ser ut
interface AllocationResult {
  resource_name: string
  task_name: string
}

const AllocationPage: React.FC = () => {
  const [allocations, setAllocations] = useState<AllocationResult[]>([])
  const [isAllocating, setIsAllocating] = useState(false)

  // 1. Kör den riktiga algoritmen i Python
  const runSmartAllocation = async () => {
    setIsAllocating(true)
    try {
      const response = await api.post("allocate/run_allocation/")
      if (response.data.success) {
        // Vi hämtar resultaten som din Python-funktion 'allocate_tasks' skickar
        setAllocations(response.data.results || [])
      }
    } catch (error) {
      console.error("Allokeringen misslyckades:", error)
      alert(
        "Kunde inte köra optimeringen. Kontrollera att du har resurser och uppgifter inlagda."
      )
    } finally {
      setIsAllocating(false)
    }
  }

  // 2. Rensa-funktionen vi precis skapade i Django
  const clearAll = async () => {
    if (!window.confirm("Vill du rensa alla tilldelningar i databasen?")) return
    try {
      const response = await api.post("allocate/clear_allocations/")
      if (response.data.success) {
        setAllocations([])
        alert("Databasen är nollställd!")
      }
    } catch (error) {
      console.error("Kunde inte rensa:", error)
    }
  }

  return (
    <div className="page-container">
      <h2 className="gradient-text">Smart Allokering</h2>
      <p>Använder Django-backenden för att beräkna optimal resursfördelning.</p>

      <div
        className="allocation-controls"
        style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
      >
        <button
          className="btn-primary big-btn"
          onClick={runSmartAllocation}
          disabled={isAllocating}
        >
          {isAllocating ? "Beräknar i Python..." : "Kör Optimering 🚀"}
        </button>

        <button
          className="btn-secondary big-btn"
          onClick={clearAll}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            color: "white",
            border: "1px solid #444",
          }}
        >
          Rensa allt 🗑️
        </button>
      </div>

      <div className="allocation-list" style={{ marginTop: "2rem" }}>
        {allocations.map((a, i) => (
          <div key={i} className="allocation-item">
            <span>👤 {a.resource_name}</span>
            <span className="arrow">→</span>
            <span>📋 {a.task_name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllocationPage
