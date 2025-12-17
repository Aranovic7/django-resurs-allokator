// src/components/Header.tsx

import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import "./Header.css"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Effekt för att ändra headerns utseende när man scrollar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <NavLink to="/" className="logo" onClick={closeMenu}>
          Resurs<span className="logo-accent">Allokering</span>
        </NavLink>

        {/* Den nya moderna hamburgaren */}
        <button
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Öppna meny"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigationen */}
        <nav className={`nav ${isMenuOpen ? "is-open" : ""}`}>
          <div className="nav-links">
            <NavLink to="/resources" className="nav-link" onClick={closeMenu}>
              Resurser
            </NavLink>
            <NavLink to="/tasks" className="nav-link" onClick={closeMenu}>
              Uppgifter
            </NavLink>
            <NavLink
              to="/allocate"
              className="nav-link highlight"
              onClick={closeMenu}
            >
              Starta Allokering
            </NavLink>
          </div>
        </nav>

        {/* En mörk bakgrund som täcker resten av sidan när menyn är öppen */}
        <div
          className={`overlay ${isMenuOpen ? "show" : ""}`}
          onClick={closeMenu}
        />
      </div>
    </header>
  )
}

export default Header
