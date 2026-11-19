import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import type { Retailer } from "@/types/Retailer"
import { ArrowUpRight } from "lucide-react"
import { NavLink, useNavigate } from "react-router"

type CardRetailerProps = { retailer: Retailer }

export function CardRetailer({ retailer }: CardRetailerProps) {

  const navigate = useNavigate()
  return (
    <Card className="catalog-card retailer-card">
      <div className="card-image retailer-image">
        <img src={retailer.siteLogo} alt={`Logo de ${retailer.name}`} loading="lazy" />
      </div>
      <CardHeader>
        <CardTitle>{retailer.name}</CardTitle>
        {/* Enlace visual de ejemplo, sin destino ni navegación. */}
        <a className="store-link" aria-disabled="true" onClick={() => {navigate(`/vendedores/${retailer.id}`)}}>
          Ver bicicletas <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </CardHeader>
    </Card>
  )
}

export default CardRetailer
