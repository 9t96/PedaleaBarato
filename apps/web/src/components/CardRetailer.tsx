import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import type { Retailer } from "@/types/Retailer"
import { useNavigate } from "react-router"

type CardRetailerProps = { retailer: Retailer }

export function CardRetailer({ retailer }: CardRetailerProps) {
  const navigate = useNavigate();

  return (
    <Card className="catalog-card retailer-card" onClick={() => navigate(`/vendedores/${retailer.id}`)}>
      <div className="card-image retailer-image">
        <img src={retailer.siteLogo} alt={`Logo de ${retailer.name}`} loading="lazy" />
      </div>
      <CardHeader>
        <CardTitle>{retailer.name}</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default CardRetailer
