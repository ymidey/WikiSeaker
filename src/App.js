import { useState } from 'react'

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  const handleSearch = async e => {
    e.preventDefault();
    if (search == "") return;

    const endpoint = `https://fr.wikipedia.org/w/api.php?action=query&list=search&prop=pageimages|info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${search}`

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const json = await response.json()
    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
    console.log(results)
  }

  return (
    <div className="App">
      <header>
        <h1 className='title'>Wiki seeker</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Qu'est-ce que vous cherchez ?"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
        {(searchInfo.totalhits) ? <p>Nombre de résultat: {searchInfo.totalhits}</p> : ''}
      </header>
      <div className="results">
        {results.map((result, i) => {
          const url = `https://fr.wikipedia.org/?curid=${result.pageid}`;

          return (
            <div className="result" key={i}>
              <h3>{result.title}</h3>
              <img href={result.pageimage} alt="" />
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url} target="_blank" rel="noreferrer">Voir plus</a>
            </div>
          )
        })}
      </div>
      <div className='random-link'>
        <a href="https://fr.wikipedia.org/wiki/Special:Random" alt="un article aléatoire" target="_blank" rel='noreferrer'>Ouvrir un article aléatoire de wikipédia</a>
      </div>
    </div>
  );
}

export default App;
