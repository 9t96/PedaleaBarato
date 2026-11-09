import { useState } from 'react'
import './App.css'
import type { Bicycle } from './types/Bycicle';
import CardBicycle from './components/CardBicycle';

function App() {

  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState([]);
  const doSearch = async () => {
    const url = `http://localhost:3000/bicycles/search/${searchText}`;
    const response = (await fetch(url));
    if (!response.ok) {
      throw new Error("Error al obtener resultados.");
    }
    const datos = await response.json();
    setSearchResult(datos);
  }

  return (
    <>
      <img src="./hero.png" alt="PedaleaBaratoHero" />
      {searchText}
      <input value={searchText} onChange={e => setSearchText(e.target.value)} type="text" placeholder="Rodado 29..." />
      <button onClick={doSearch}>Buscar</button>

      <div style={{display: "flex", gap: "15px", flexWrap: "wrap"}}>
        { searchResult.map( (bicycle: Bicycle) => (
          <CardBicycle
            bicycle={bicycle}
          />
          )
        )}
      </div>
    </>
  )
}

export default App
