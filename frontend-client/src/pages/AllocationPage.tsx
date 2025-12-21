import React, { useState } from "react"
import { Resource, Task } from "../App"
import "./AllocationPage.css"

interface Props {
  resources: Resource[]
  tasks: Task[]
}

const AllocationPage: React.FC<Props> = ({ resources, tasks }) => {
  const [allocations, setAllocations] = useState<
    { res: string; task: string }[]
  >([])
  const [isAllocating, setIsAllocating] = useState(false)

  const runAllocation = () => {
    if (resources.length === 0 || tasks.length === 0) {
      alert("Du behöver lägga till både resurser och uppgifter först!")
      return
    }

    setIsAllocating(true)

    setTimeout(() => {
      const newResults: { res: string; task: string }[] = []
      // Enkel algoritm: Matcha i ordning (kan utvecklas till prioritet senare)
      tasks.forEach((task, index) => {
        if (resources[index % resources.length]) {
          newResults.push({
            res: resources[index % resources.length].name,
            task: task.title,
          })
        }
      })

      setAllocations(newResults)
      setIsAllocating(false)
    }, 1000)
  }

  return (
    <div className="page-container">
      <h2 className="gradient-text">Smart Allokering</h2>
      <p>
        Status: {resources.length} resurser och {tasks.length} uppgifter
        tillgängliga.
      </p>

      <div className="allocation-controls">
        <button
          className="btn-primary big-btn"
          onClick={runAllocation}
          disabled={isAllocating}
        >
          {isAllocating ? "Beräknar..." : "Kör Optimering 🚀"}
        </button>
      </div>

      <div className="allocation-list">
        {allocations.map((a, i) => (
          <div key={i} className="allocation-item">
            <span>👤 {a.res}</span>
            <span className="arrow">→</span>
            <span>📋 {a.task}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllocationPage
