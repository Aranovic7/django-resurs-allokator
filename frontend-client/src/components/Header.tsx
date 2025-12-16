import React from "react"
import { Link } from "react-router-dom"
import "./Header.css" // Vi lägger till en CSS-fil snart

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Resursallokeringssystem
        </Link>
        <nav className="nav">
          <Link to="/resources">Resurser</Link>
          <Link to="/tasks">Uppgifter</Link>
          <Link to="/allocate">Allokering</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
