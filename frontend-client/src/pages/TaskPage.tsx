import React, { useState } from "react"
import "./TaskPage.css"

interface Task {
  id: number
  title: string
  priority: "Låg" | "Medium" | "Hög"
  description: string
}

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Utveckla Frontend",
      priority: "Hög",
      description: "Bygg grunden i React",
    },
    {
      id: 2,
      title: "Designa Logotyp",
      priority: "Medium",
      description: "Skapa en modern profil",
    },
  ])

  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState<"Låg" | "Medium" | "Hög">("Medium")

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    const newTask: Task = {
      id: Date.now(),
      title,
      priority,
      description: "Standardbeskrivning",
    }

    setTasks([...tasks, newTask])
    setTitle("")
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h2 className="gradient-text">Hantera Uppgifter</h2>
        <p>Definiera projektets uppgifter och deras brådskande status.</p>
      </header>

      <section className="form-section">
        <form onSubmit={addTask} className="modern-form">
          <input
            type="text"
            placeholder="Uppgiftens namn"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="priority-select"
          >
            <option value="Låg">Låg Prioritet</option>
            <option value="Medium">Medium Prioritet</option>
            <option value="Hög">Hög Prioritet</option>
          </select>
          <button type="submit" className="btn-primary">
            Skapa Uppgift
          </button>
        </form>
      </section>

      <section className="task-grid">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-card border-${task.priority.toLowerCase()}`}
          >
            <div className="priority-indicator">{task.priority}</div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button
              className="delete-btn"
              onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
            >
              Markera som klar
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}

export default TaskPage
