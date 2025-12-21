import React, { useState } from "react"
import { Task } from "../App" // Vi hämtar typ-definitionen från App.tsx
import "./TaskPage.css"

interface Props {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskPage: React.FC<Props> = ({ tasks, setTasks }) => {
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState<"Låg" | "Medium" | "Hög">("Medium")

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    const newTask: Task = {
      id: Date.now(),
      title,
      priority,
    }

    setTasks([...tasks, newTask])
    setTitle("")
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h2 className="gradient-text">Hantera Uppgifter ({tasks.length})</h2>
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
            <button
              className="delete-btn"
              onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
            >
              Ta bort
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}

export default TaskPage
