import { useState } from 'react'
import './App.css'
import type { Bicycle } from './types/Bycicle';
import CardBicycle from './components/CardBicycle';
import getBicyclesByName from './api/bicyclesAPI';

function App() {

  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState([]);
  const doSearch = async () => {
    const bicyclesJson = await getBicyclesByName(searchText)
    setSearchResult(bicyclesJson);
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
