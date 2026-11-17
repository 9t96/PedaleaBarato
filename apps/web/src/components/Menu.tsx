import { Bike } from "lucide-react"
import { NavLink } from "react-router"
import "./pages.css"

export function Menu() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-brand">
          <Bike size={28} aria-hidden="true" />
          <span>Pedalea <strong>Barato</strong></span>
        </div>
        <nav className="site-nav" aria-label="Navegación principal">
          <span>Inicio</span>
          <NavLink to="/vendedores">Tiendas</NavLink>
        </nav>
      </div>
    </header>
  )
}
