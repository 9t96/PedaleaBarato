import type { Bicycle } from "@/types/Bycicle"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type CardBicycleProps = {
    bicycle: Bicycle,
}


export function CardBicycle( {bicycle}: CardBicycleProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={bicycle.imageUrl}
        alt="Event cover"
        className="relative z-20 aspect-video w-full h-full object-cover"
      />
      <CardHeader>
{/*         <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction> */}
        <CardTitle>{bicycle.name}</CardTitle>
        <CardDescription>
          
        </CardDescription>
      </CardHeader>
{/*       <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter> */}
    </Card>
  )
}

export default CardBicycle;

