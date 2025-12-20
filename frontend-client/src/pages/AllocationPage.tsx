import React, { useState } from "react"
import "./AllocationPage.css"

interface Allocation {
  resourceName: string
  taskTitle: string
}

const AllocationPage: React.FC = () => {
  const [allocations, setAllocations] = useState<Allocation[]>([])
  const [isAllocating, setIsAllocating] = useState(false)

  // En enkel algoritm som matchar befintlig data (vi hårdkodar lite testdata här för enkelhetens skull)
  const runAllocation = () => {
    setIsAllocating(true)

    // Vi simulerar en beräkningstid för att det ska kännas proffsigt
    setTimeout(() => {
      const results: Allocation[] = [
        { resourceName: "Anna Andersson", taskTitle: "Utveckla Frontend" },
        { resourceName: "Erik Eriksson", taskTitle: "Designa Logotyp" },
      ]
      setAllocations(results)
      setIsAllocating(false)
    }, 1500)
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h2 className="gradient-text">Smart Allokering</h2>
        <p>
          Kör algoritmen för att optimera matchningen mellan resurser och
          uppgifter.
        </p>
      </header>

      <div className="allocation-controls">
        <button
          className={`btn-primary big-btn ${isAllocating ? "loading" : ""}`}
          onClick={runAllocation}
          disabled={isAllocating}
        >
          {isAllocating ? "Beräknar..." : "Kör Optimering 🚀"}
        </button>
      </div>

      {allocations.length > 0 && (
        <section className="results-section">
          <h3>Optimerat Resultat</h3>
          <div className="allocation-list">
            {allocations.map((alloc, index) => (
              <div key={index} className="allocation-item">
                <span className="res-name">{alloc.resourceName}</span>
                <span className="arrow">→</span>
                <span className="task-name">{alloc.taskTitle}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default AllocationPage
