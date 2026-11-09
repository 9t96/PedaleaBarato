import { useState } from 'react'
import './App.css'

function App() {

  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState([]);
  const doSearch = async () => {
    const url = `http://localhost:3000/bicycles/search/${searchText}`;
    const response = await fetch(url);
    console.log(response)
  }

  return (
    <>
      <img src="./hero.png" alt="PedaleaBaratoHero" />
      {searchText}
      <input value={searchText} onChange={e => setSearchText(e.target.value)} type="text" placeholder="Rodado 29..." />
      <button onClick={doSearch}>Buscar</button>
    </>
  )
}

export default App
