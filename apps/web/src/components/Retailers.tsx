import getRetailers from "@/api/retailersAPI"
import type { Retailer } from "@/types/Retailer"
import { useEffect, useState } from "react"
import CardRetailer from "./CardRetailer"
import { Menu } from "./Menu"

function Retailers() {
  const [retailers, setRetailers] = useState<Retailer[]>([])

  useEffect(() => {
    async function loadRetailers() {
      const retailersJson = await getRetailers();
      setRetailers(retailersJson);
    }
    loadRetailers();
  }, [])

  return (
    <>
      <Menu />
      <main className="page-content">
        <section className="page-heading">
          <p className="eyebrow">Conocé los comercios</p>
          <h1>Tiendas de bicicletas</h1>
          <p className="page-description">Explorá las tiendas que forman parte de Pedalea Barato.</p>
        </section>
        <div className="cards-grid">
          {retailers.map(retailer => <CardRetailer key={String(retailer.id)} retailer={retailer} />)}
        </div>
      </main>
    </>
  )
}

export default Retailers
