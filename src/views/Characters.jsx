import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const status = new URLSearchParams(location.search).get('status') ?? 'all';

  const handleStatusChange = (event) => {
    history.push(`/?status=${event.target.value}`);
  }

  useEffect(() => {
    const fetchCharacters = async () => {
    const statusParam = new URLSearchParams(location.search).get('status');

    const url =
      statusParam === 'all' || !statusParam
      ? 'https://rickandmortyapi.com/api/character'
      : `https://rickandmortyapi.com/api/character?status=${statusParam}`;

    const res = await fetch(url);

    const { results } = await res.json();

    setCharacters(results);
    setIsLoading(false);
      }
    
      fetchCharacters();
    
  }, [location.search]);


  return (
    <>
      <h1>Characters from Rick and Morty</h1>
      {
        isLoading ? <p>Loading...</p>
        : (
          <div>
            <label htmlFor='status'>Character Status:</label>
            <select name='status' id='status' value={status} onChange={handleStatusChange}>
              <option value='all'>All</option>
              <option value='alive'>Alive</option>
              <option value='dead'>Dead</option>
              <option value='unknown'>Unknown</option>
            </select>
            <div>
              {characters.map((character) => (
                <div key={character.id}>
                  <Link to={`/characters/${character.id}`}>
                    <h4>{character.name}</h4>
                  </Link>
                  <p>{character.status}</p>
                  <img src={character.image}/>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </>
  )
}
