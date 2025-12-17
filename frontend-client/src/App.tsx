import React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Header from "./components/Header"
import ResourcePage from "./pages/ResourcePage"
import TaskPage from "./pages/TaskPage"
import AllocationPage from "./pages/AllocationPage"
import "./App.css"

// En modernare startsida
const HomePage: React.FC = () => (
  <div className="hero-section">
    <div className="hero-content">
      <h1 className="hero-title">
        Optimera din <br />
        <span className="gradient-text">Resursallokering</span>
      </h1>
      <p className="hero-subtitle">
        Ett modernt verktyg för att effektivt matcha uppgifter med rätt resurser
        genom smarta algoritmer och intuitiv design.
      </p>

      <div className="hero-buttons">
        <Link to="/resources" className="btn btn-primary">
          Hantera Resurser
        </Link>
        <Link to="/allocate" className="btn btn-secondary">
          Starta Optimering
        </Link>
      </div>
    </div>

    {/* Dekorativa kort som visar funktioner */}
    <div className="features-grid">
      <div className="feature-card">
        <h3>📊 Resurser</h3>
        <p>Lägg till och redigera personal och deras kompetenser.</p>
      </div>
      <div className="feature-card">
        <h3>✅ Uppgifter</h3>
        <p>Skapa uppgifter och definiera krav för att slutföra dem.</p>
      </div>
      <div className="feature-card">
        <h3>🚀 Allokering</h3>
        <p>Låt algoritmen hitta den perfekta matchningen automatiskt.</p>
      </div>
    </div>
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
