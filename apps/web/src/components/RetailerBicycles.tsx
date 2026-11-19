import { ArrowLeft, ArrowUpRight, Bike, Store } from 'lucide-react'
import { Menu } from './Menu'
import type { Bicycle } from '@/types/Bycicle'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getBicyclesByRetailerId } from '@/api/retailersAPI'
import type { Retailer } from '@/types/Retailer'
import CardBicycle from './CardBicycle'

// Template estático: catálogo, precios y comercio de ejemplo, sin lógica conectada.
export function RetailerBicycles() {
  const { retailerId } = useParams();
  const [retailer, setRetailer] = useState<Retailer | null>(null);
  const navigate = useNavigate();

  const getRetailerWithBicycles = async () => {
    const retailer = await getBicyclesByRetailerId(Number(retailerId));
    setRetailer(retailer);
  };

  useEffect(()=>{
    getRetailerWithBicycles();
  }, [])


  return (
    <>
      <Menu />
      <main className="page-content retailer-catalog-page">
        <a className="detail-back" onClick={() => {navigate(-1)}}><ArrowLeft size={16} aria-hidden="true" /> Volver a las tiendas</a>
        <section className="retailer-hero" aria-labelledby="retailer-title">
          <div className="retailer-logo-placeholder"><img src={retailer?.siteLogo} alt={`Logo de ${retailer?.name}`} loading="lazy" /></div>
          <div className="retailer-intro">
            <p className="eyebrow">Conocé su catálogo</p>
            <h1 id="retailer-title">{retailer?.name}</h1>
            <p className="page-description">Todas sus bicicletas en un solo lugar. Explorá los modelos y consultá el precio publicado por el comercio.</p>
          </div>
          <a type="button" className="retailer-visit" href={retailer?.url} target="blank">Visitar tienda <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>
        { retailer?.bicycles && <section className="retailer-products" aria-labelledby="catalog-title">
          <div className="section-heading">
            <div><p className="eyebrow">Elegí tu próxima bici</p><h2 id="catalog-title">Bicicletas de esta tienda</h2></div>
            <span className="catalog-currency">Precios en pesos argentinos (ARS)</span>
          </div>
          <div className="cards-grid">
            {
              retailer?.bicycles.map( (bicycle: Bicycle) => {
              return ( <CardBicycle bicycle={bicycle}></CardBicycle>)
              })
            }
          </div>
          <p className="catalog-note">La compra se realiza directamente en la tienda. Consultá allí el stock, las formas de pago y las condiciones de envío.</p>
        </section>}
      </main>
    </>
  )
}

export default RetailerBicycles
