import type { Retailer } from "@/types/Retailer";

const getRetailers = async () : Promise<Array<Retailer>> => {
    const url = `http://localhost:3000/retailers`;
    const response = (await fetch(url));
    if (!response.ok) {
      throw new Error("Error al obtener resultados.");
    }
    return await response.json();
}

export async function getBicyclesByRetailerId(retailerId: number) : Promise<Retailer> {
    const url = `http://localhost:3000/retailers/${retailerId}`;
    const response = (await fetch(url));
    if (!response.ok) {
      throw new Error("Error al obtener resultados.");
    }
   const json = await response.json();
   return json;
}

export default getRetailers;