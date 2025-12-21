import React, { useState } from "react"
import { Resource } from "../App" // Importera typen
import "./ResourcePage.css"

interface Props {
  resources: Resource[]
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>
}

const ResourcePage: React.FC<Props> = ({ resources, setResources }) => {
  const [newName, setNewName] = useState("")
  const [newRole, setNewRole] = useState("")

  const addResource = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName || !newRole) return
    setResources([
      ...resources,
      { id: Date.now(), name: newName, role: newRole },
    ])
    setNewName("")
    setNewRole("")
  }

  return (
    <div className="page-container">
      <h2 className="gradient-text">Hantera Resurser ({resources.length})</h2>
      <form onSubmit={addResource} className="modern-form">
        <input
          placeholder="Namn"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          placeholder="Roll"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Lägg till
        </button>
      </form>
      <div className="resource-grid">
        {resources.map((res) => (
          <div key={res.id} className="resource-card">
            <h3>{res.name}</h3>
            <p className="role-tag">{res.role}</p>
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
      </div>
    </div>
  )
}

export default ResourcePage
