import { ArrowUpRight, Code } from 'lucide-react'
import './pages.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <a href="/" className="footer-brand">Pedalea<span>Barato</span></a>
          <p>Tu próxima bicicleta, a un precio que te cierre. Explorá y compará opciones de tiendas de Argentina.</p>
        </div>
        <nav className="footer-links" aria-label="Explorar Pedalea Barato">
          <h2>Explorá</h2>
          <a href="/">Buscar bicicletas</a>
          <a href="/vendedores">Conocer las tiendas</a>
        </nav>
        <nav className="footer-links" aria-label="Proyecto y contacto">
          <h2>Proyecto y contacto</h2>
          <a href="https://github.com/9t96/PedaleaBarato" target="_blank" rel="noopener noreferrer"><Code size={16} aria-hidden="true" /> Ver en GitHub <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (abre en otra pestaña)</span></a>
          <a href="https://github.com/9t96/PedaleaBarato/issues" target="_blank" rel="noopener noreferrer">Reportar un problema <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (abre en otra pestaña)</span></a>
          <p>Hecho en Argentina, para seguir pedaleando.</p>
        </nav>
        <div className="footer-bottom">
          <span>Pedalea Barato · Proyecto en desarrollo</span>
          <p>La compra se realiza en el sitio de cada comercio. Los precios y la disponibilidad pueden cambiar; confirmalos en la tienda antes de comprar.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
