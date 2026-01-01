import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import ResourcePage from "./pages/ResourcePage"
import TaskPage from "./pages/TaskPage"
import AllocationPage from "./pages/AllocationPage"
import "./App.css"
import api from "./api"

// 1. Uppdaterat Resource-interface (dubbelkolla att fälten matchar din Django-modell)
export interface Resource {
  id: number
  name: string
  available_hours: number
}

// 2. Uppdaterat Task-interface för att matcha TaskPage och Backend
export interface Task {
  id: number
  name: string
  difficulty: number
  estimated_time: number
  description: string
}

const HomePage: React.FC = () => (
  <div className="hero-section">
    <h1 className="hero-title">
      Optimera din <span className="gradient-text">Resursallokering</span>
    </h1>
    <p className="hero-subtitle">
      Matcha rätt kompetens med rätt uppgift på ett ögonblick.
    </p>
  </div>
)

const App: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resResponse = await api.get("resources/")
        const taskResponse = await api.get("tasks/")

        // Här antar vi att Django skickar tillbaka listor med objekt
        setResources(resResponse.data)
        setTasks(taskResponse.data)
      } catch (error) {
        console.error("Kunde inte hämta data från backenden:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <Router>
      <Header />
      <main className="App-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/resources"
            element={
              <ResourcePage resources={resources} setResources={setResources} />
            }
          />
          <Route
            path="/tasks"
            element={<TaskPage tasks={tasks} setTasks={setTasks} />}
          />
          <Route path="/allocate" element={<AllocationPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
