import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import ResourcePage from "./pages/ResourcePage"
import TaskPage from "./pages/TaskPage"
import AllocationPage from "./pages/AllocationPage"
import React from "react"
import "./App.css"

const HomePage: React.FC = () => (
  <div style={{ padding: "20px", textAlign: "center" }}>
    <h1>Välkommen till Resursallokeringssystemet!</h1>
    <p>
      Använd navigationsfältet ovan för att hantera resurser, uppgifter och köra
      optimeringsalgoritmen.
    </p>
  </div>
)

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="App-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resources" element={<ResourcePage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/allocate" element={<AllocationPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
