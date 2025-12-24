import React, { useState } from "react"
import { Task } from "../App"
import api from "../api"
import "./TaskPage.css"

interface Props {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskPage: React.FC<Props> = ({ tasks, setTasks }) => {
  const [name, setName] = useState("") // Ändrat från title till name
  const [priority, setPriority] = useState<"Låg" | "Medium" | "Hög">("Medium")

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return

    try {
      const response = await api.post("tasks/", {
        name: name, // Matchar Django
        estimated_time: 5.0, // Krävs av Django-modell
        difficulty: priority === "Hög" ? 3 : priority === "Medium" ? 2 : 1,
        description: "",
      })

      setTasks([...tasks, response.data])
      setName("")
    } catch (error) {
      console.error("Kunde inte spara uppgift:", error)
    }
  }

  return (
    <div className="page-container">
      <h2 className="gradient-text">Hantera Uppgifter ({tasks.length})</h2>

      <form onSubmit={addTask} className="modern-form">
        <input
          placeholder="Uppgiftens namn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
        >
          <option value="Låg">Låg</option>
          <option value="Medium">Medium</option>
          <option value="Hög">Hög</option>
        </select>
        <button type="submit" className="btn-primary">
          Skapa
        </button>
      </form>

      <div className="task-grid">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            {/* ANVÄND task.name ISTÄLLET FÖR task.title */}
            <h3>{task.name}</h3>
            <p>Prioritet: {task.priority || "Ej satt"}</p>
            <button
              onClick={async () => {
                await api.delete(`tasks/${task.id}/`)
                setTasks(tasks.filter((t) => t.id !== task.id))
              }}
            >
              Ta bort
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskPage
