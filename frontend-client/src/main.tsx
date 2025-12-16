import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

const rootElement = document.getElementById("root")

if (rootElement) {
  // 2. Skapa roten och rendera appen
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  console.error("Root element with ID 'root' not found in the document.")
}
