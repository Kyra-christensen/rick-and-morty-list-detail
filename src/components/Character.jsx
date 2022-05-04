import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Character() {
  const [character, setCharacter] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchCharacter = async () => {
      const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await res.json();
      
      setCharacter(data);
      setIsLoading(false);
    }
    fetchCharacter();
  }, [])

  return(
    <>
    {
      isLoading ? <p>Loading...</p>
      : (
        <>
          <h2>{character.name}</h2>
          <img src={character.image} alt={`Image of ${character.name}`}></img>
          <p>{character.status}</p>
          <span>{character.species}</span>
        </>
      )
    }
    </>
  )
}