import React, { useState } from "react"
import { Task } from "../App"
import "./TaskPage.css"
import api from "../api"

interface Props {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskPage: React.FC<Props> = ({ tasks, setTasks }) => {
  const [taskName, setTaskName] = useState("")
  const [priority, setPriority] = useState("Medium")

  // Hjälpfunktion för att visa rätt text för varje uppgift
  const getDifficultyText = (difficulty: number) => {
    const labels: { [key: number]: string } = {
      1: "Låg",
      2: "Medium",
      3: "Hög",
    }
    return labels[difficulty] || "Medium"
  }

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!taskName) return

    try {
      const diffMap: { [key: string]: number } = { Låg: 1, Medium: 2, Hög: 3 }

      const response = await api.post("tasks/", {
        name: taskName,
        difficulty: diffMap[priority] || 2,
        estimated_time: 5.0,
        description: "",
      })

      setTasks([...tasks, response.data])
      setTaskName("")
    } catch (error) {
      console.error("Kunde inte spara uppgift:", error)
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`tasks/${id}/`)
      setTasks(tasks.filter((t) => t.id !== id))
    } catch (error) {
      console.error("Kunde inte radera uppgift:", error)
    }
  }

  return (
    <div className="page-container">
      <h2 className="gradient-text">Hantera Uppgifter ({tasks.length})</h2>

      <form onSubmit={addTask} className="modern-form">
        <input
          placeholder="Vad behöver göras?"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Låg">Låg prioritet</option>
          <option value="Medium">Medium prioritet</option>
          <option value="Hög">Hög prioritet</option>
        </select>
        <button type="submit" className="btn-primary">
          Skapa uppgift
        </button>
      </form>

      <div className="task-grid">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3>{task.name}</h3>
            <div className="task-footer">
              {/* FIXEN: Vi använder task.difficulty istället för 'priority'-staten */}
              <span className="priority-tag">
                Prioritet: {getDifficultyText(task.difficulty)}
              </span>
              <button
                className="delete-btn-small"
                onClick={() => deleteTask(task.id)}
              >
                Ta bort
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskPage
