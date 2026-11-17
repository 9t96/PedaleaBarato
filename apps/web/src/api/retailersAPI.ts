import type { Retailer } from "@/types/Retailer";

const getRetailers = async () : Promise<Array<Retailer>> => {
    const url = `http://localhost:3000/retailers`;
    const response = (await fetch(url));
    if (!response.ok) {
      throw new Error("Error al obtener resultados.");
    }
    return await response.json();
}

export default getRetailers;