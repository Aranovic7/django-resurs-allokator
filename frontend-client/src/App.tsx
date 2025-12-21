import React, { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import ResourcePage from "./pages/ResourcePage"
import TaskPage from "./pages/TaskPage"
import AllocationPage from "./pages/AllocationPage"
import "./App.css"

// Typer för vår data
export interface Resource {
  id: number
  name: string
  role: string
}

export interface Task {
  id: number
  title: string
  priority: "Låg" | "Medium" | "Hög"
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
  // Här bor all vår data nu!
  const [resources, setResources] = useState<Resource[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  return (
    <Router>
      <Header />
      <main className="App-content">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Vi skickar ner listan och funktionen att uppdatera den som "props" */}
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

          <Route
            path="/allocate"
            element={<AllocationPage resources={resources} tasks={tasks} />}
          />
        </Routes>
      </main>
    </Router>
  )
}

export default App
