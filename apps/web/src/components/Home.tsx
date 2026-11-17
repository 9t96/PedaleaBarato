import { useState } from 'react'
import { Search } from 'lucide-react'
import type { Bicycle } from '../types/Bycicle'
import CardBicycle from './CardBicycle'
import getBicyclesByName from '../api/bicyclesAPI'
import { Menu } from './Menu'

function Home() {
  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState<Bicycle[]>([])

  const doSearch = async () => {
    const bicyclesJson = await getBicyclesByName(searchText);
    setSearchResult(bicyclesJson);
  }


  //this is the function that implement the feature
  const handlekeyPress=(e: React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key=='Enter'){
      doSearch()      
    }
  }

  return (
    <>
      <Menu />
      <main className="page-content home-page">
        <section className="home-intro" aria-labelledby="home-title">
          <p className="eyebrow">Tu próxima bici empieza acá</p>
          <h1 id="home-title" className="sr-only">Pedaleá más. Pagá menos.</h1>
          <a className="home-banner" href="#bicycle-search" aria-label="Buscar ofertas de bicicletas">
            <img src="/hero.png" alt="Ciclista entre ofertas de bicicletas en Argentina" width={1896} height={829} fetchPriority="high" />
          </a>
          <p className="page-description">Encontrá bicicletas de tiendas de Argentina en un solo lugar.</p>
        </section>
        <section className="search-section" aria-label="Buscar bicicletas">
          <div className="search-form">
            <label htmlFor="bicycle-search" className="sr-only">Nombre o modelo de bicicleta</label>
            <Search size={22} aria-hidden="true" />
            <input id="bicycle-search" value={searchText} onKeyUp={handlekeyPress} onChange={e => setSearchText(e.target.value)} type="search" placeholder="Probá con rodado 29, mountain bike…" />
            <button onClick={doSearch} type="button">Buscar bicicletas</button>
          </div>
          <p className="search-hint">Buscá por nombre o modelo. La compra se realiza en el sitio de cada tienda.</p>
        </section>
        <section className="results-section" aria-label="Resultados de búsqueda">
          <h2>Encontrá tu próxima bicicleta</h2>
          <div className="cards-grid">
            {searchResult.map((bicycle: Bicycle) => (
              <CardBicycle bicycle={bicycle} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
