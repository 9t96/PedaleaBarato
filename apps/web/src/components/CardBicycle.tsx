import type { Bicycle } from "@/types/Bycicle"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

type CardBicycleProps = { bicycle: Bicycle }

export function CardBicycle({ bicycle }: CardBicycleProps) {
  return (
    <Card className="catalog-card">
      <div className="card-image">
        <img src={bicycle.imageUrl} alt={bicycle.name} loading="lazy" />
      </div>
      <CardHeader>
        <CardTitle>{bicycle.name}</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default CardBicycle
