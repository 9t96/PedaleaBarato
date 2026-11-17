import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Menu } from './Menu'

// Template visual con contenido de ejemplo, sin datos ni navegación conectados.
function BicycleDetail() {
  return (
    <>
      <Menu />
      <main className="page-content">
        <span className="detail-back"><ArrowLeft size={16} aria-hidden="true" /> Volver al buscador</span>
        <article className="bicycle-detail" aria-labelledby="bicycle-title">
          <div className="detail-image">
            <p>Imagen de la bicicleta</p>
          </div>
          <div className="detail-info">
            <p className="eyebrow">Tu próxima bicicleta</p>
            <h1 id="bicycle-title">Nombre de la bicicleta</h1>
            <div className="detail-retailer">
              <div><span className="detail-label">Disponible en</span><strong>Nombre de la tienda</strong></div>
            </div>
            <div className="detail-pricing">
              <p className="detail-label">Precio publicado · pesos argentinos (ARS)</p>
              <p className="detail-old-price"><span className="sr-only">Precio anterior: </span><s>$ 600.000,00</s></p>
              <p className="detail-price">$ 540.000,00</p>
              <span className="detail-discount">10% de descuento</span>
            </div>
            <dl className="detail-facts"><div><dt>Última actualización</dt><dd>Fecha de ejemplo</dd></div></dl>
            <button type="button" className="detail-buy" disabled>
              Ver en la tienda <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <p className="search-hint">La compra se realiza en el sitio del comercio. Consultá allí el precio vigente, el stock y las condiciones de envío.</p>
          </div>
        </article>
      </main>
    </>
  )
}

export default BicycleDetail
