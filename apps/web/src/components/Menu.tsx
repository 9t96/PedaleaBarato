import { NavLink } from "react-router"
import "./pages.css"

export function Menu() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-brand">
          <img src="/logo.png" alt="Pedalea Barato Argentina" width={2172} height={724} />
        </div>
        <nav className="site-nav" aria-label="Navegación principal">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/vendedores">Tiendas</NavLink>
        </nav>
      </div>
    </header>
  )
}
