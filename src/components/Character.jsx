import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Character() {
  const [character, setCharacter] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  
}