import type { Bicycle } from "@/types/Bycicle"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Retailer } from "@/types/Retailer"
import { useNavigate } from "react-router"

type CardRetailerProps = {
    retailer: Retailer,
}


export function CardRetailer( {retailer}: CardRetailerProps) {

    const navigate = useNavigate();
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0" onClick={() => navigate(`/vendedores/${retailer.id}`)}>
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={retailer.siteLogo}
        alt="Event cover"
        className="relative z-20 aspect-video w-full h-full object-cover"
      />
      <CardHeader>
        <CardTitle>{retailer.name}</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default CardRetailer;

