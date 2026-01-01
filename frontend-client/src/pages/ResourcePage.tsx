import React, { useState } from "react"
import { Resource } from "../App"
import "./ResourcePage.css"
import api from "../api"

interface Props {
  resources: Resource[]
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>
}

const ResourcePage: React.FC<Props> = ({ resources, setResources }) => {
  const [nameInput, setNameInput] = useState("")
  const [roleInput, setRoleInput] = useState("") // Staten för titeln (t.ex. "Ekonomiassistent")

  const addResource = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nameInput || !roleInput) return

    try {
      // Vi skickar båda fälten till Django
      const response = await api.post("resources/", {
        name: nameInput,
        role: roleInput,
        available_hours: 40.0, // Vi sätter standardtimmar i bakgrunden
      })

      setResources([...resources, response.data])
      setNameInput("")
      setRoleInput("")
    } catch (error) {
      console.error("Kunde inte spara resurs:", error)
      alert("Fel vid sparande till databasen.")
    }
  }

  const deleteResource = async (id: number) => {
    try {
      await api.delete(`resources/${id}/`)
      setResources(resources.filter((r) => r.id !== id))
    } catch (error) {
      console.error("Kunde inte radera:", error)
    }
  }

  return (
    <div className="page-container">
      <h2 className="gradient-text">Hantera Resurser ({resources.length})</h2>

      <form onSubmit={addResource} className="modern-form">
        <input
          placeholder="Namn (t.ex. Aran)"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <input
          placeholder="Roll (t.ex. Utvecklare)"
          value={roleInput}
          onChange={(e) => setRoleInput(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Lägg till person
        </button>
      </form>

      <div className="resource-grid">
        {resources.map((res) => (
          <div key={res.id} className="resource-card">
            <div className="card-content">
              <h3>{res.name}</h3>
              <span className="role-badge">{res.role}</span>{" "}
              {/* Här visas titeln */}
            </div>
            <button
              className="delete-btn"
              onClick={() => deleteResource(res.id)}
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
