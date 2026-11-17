import { useState } from 'react'
import type { Bicycle } from '../types/Bycicle';
import CardBicycle from '../components/CardBicycle';
import getBicyclesByName from '../api/bicyclesAPI';
import { Menu } from '../components/Menu';

function Home() {

  const [searchText, setSearchText] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Bicycle[]>([]);
  const doSearch = async () => {
    const bicyclesJson = await getBicyclesByName(searchText);
    setSearchResult(bicyclesJson);
  }

  return (
    <>
        <Menu></Menu>
        <img src="./hero.png" alt="PedaleaBaratoHero" />
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

export default Home;
