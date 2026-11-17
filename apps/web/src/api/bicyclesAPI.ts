import type { Bicycle } from "@/types/Bycicle";

const getBicyclesByName = async (searchText: String) : Promise<Array<Bicycle>> => {
    const url = `http://localhost:3000/bicycles/search/${searchText}`;
    const response = (await fetch(url));
    if (!response.ok) {
      throw new Error("Error al obtener resultados.");
    }
   const json = await response.json();
   return json;
}

export default getBicyclesByName;