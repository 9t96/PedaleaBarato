const getBicyclesByName = async (searchText: String) => {
    const url = `http://localhost:3000/bicycles/search/${searchText}`;
    const response = (await fetch(url));
    if (!response.ok) {
      throw new Error("Error al obtener resultados.");
    }
    return await response.json();
}

export default getBicyclesByName;