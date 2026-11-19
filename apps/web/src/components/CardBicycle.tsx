import type { Bicycle } from "@/types/Bycicle"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import formatPrice from "@/helpers/priceHelper"

type CardBicycleProps = { bicycle: Bicycle }

export function CardBicycle({ bicycle }: CardBicycleProps) {

  return (
    <Card className="catalog-card">
      <div className="card-image">
        <img src={bicycle.imageUrl} alt={bicycle.name} loading="lazy" />
      </div>
      <CardHeader>
        <CardTitle>{bicycle.name}</CardTitle>
        {/* Valores de ejemplo para conectar con los datos más adelante. */}
        <div className="card-pricing">
          <p className="card-price-label">Precio en pesos argentinos (ARS)</p>
          { bicycle.oldPrice != null && bicycle.oldPrice > 0 && (<p className="card-old-price"><span className="sr-only">Precio anterior: </span><s>{formatPrice(bicycle.oldPrice)}</s></p>) }
          <p className="card-price">{formatPrice(bicycle.price)}</p>
          { bicycle.discount && bicycle.discount.length > 0  && (<span className="card-discount">{bicycle.discount} de descuento</span>)}
        </div>
      </CardHeader>
    </Card>
  )
}

export default CardBicycle
