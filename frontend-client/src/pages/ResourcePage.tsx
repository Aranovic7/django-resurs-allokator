import React, { useState } from "react"
import "./ResourcePage.css"

interface Resource {
  id: number
  name: string
  role: string
  competence: string
}

const ResourcePage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      name: "Anna Andersson",
      role: "Utvecklare",
      competence: "React, TypeScript",
    },
    { id: 2, name: "Erik Eriksson", role: "Designer", competence: "Figma, UX" },
  ])

  const [newName, setNewName] = useState("")
  const [newRole, setNewRole] = useState("")

  const addResource = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName || !newRole) return

    const newRes: Resource = {
      id: Date.now(),
      name: newName,
      role: newRole,
      competence: "Allmän", // Kan utökas senare
    }

    setResources([...resources, newRes])
    setNewName("")
    setNewRole("")
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h2 className="gradient-text">Hantera Resurser</h2>
        <p>Lägg till personal och definiera deras expertis.</p>
      </header>

      <section className="resource-form-section">
        <form onSubmit={addResource} className="modern-form">
          <input
            type="text"
            placeholder="Namn"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Roll (t.ex. Utvecklare)"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            Lägg till
          </button>
        </form>
      </section>

      <section className="resource-grid">
        {resources.map((res) => (
          <div key={res.id} className="resource-card">
            <div className="card-icon">👤</div>
            <h3>{res.name}</h3>
            <p className="role-tag">{res.role}</p>
            <p className="competence-text">
              <strong>Kompetens:</strong> {res.competence}
            </p>
            <button
              className="delete-btn"
              onClick={() =>
                setResources(resources.filter((r) => r.id !== res.id))
              }
            >
              Ta bort
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}

export default ResourcePage
