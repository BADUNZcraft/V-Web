import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import GameCard from './GameCard';
import { useFirestore } from '../contexts/FirestoreContext';
import { useAuth } from '../contexts/AuthContext';
import { useIGDB } from '../contexts/IGDBContext';

export default function HomePage() {
  const { addLike } = useFirestore();
  const searchRef = useRef();
  const {getData, initializeToken, token} = useIGDB()
  const { currentUser } = useAuth();
  const [games, setGames] = useState([]);

  useEffect(() => {
    initializeToken()
  })

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const result = await getData('games', 'fields *; limit 8; sort rating_count desc;')
          setGames(result)
        } catch (error) {
          console.error('Fehler beim Abrufen der Daten:', error)
        }
      }
    }
    fetchData()
  }, [token]);

  async function handleSearchSubmit(e) {
    e.preventDefault()
    console.log(`Searching for ${searchRef.current.value}`);
    var data = null
    try{
      if (searchRef.current.value){
        data = await getData('games', `fields name; limit 8; search "${searchRef.current.value}";`)
      } else {
        data = await getData('games', 'fields *; limit 8; sort rating_count desc;')
      }
    }
    catch{
      data = games
    }
    setGames(data)
  }

  return (
    <div>
      <Header />
      <h1>Browse games...</h1>

      <div className="container-search">
        <form onSubmit={handleSearchSubmit}>
          <input type="text" placeholder='Search Games' ref={searchRef} className="input-style"/>
          <button type="submit" className="button-style">Search</button>
        </form>
      </div>


      <div className="games-container">
        {games.map(game => (
          <GameCard key={game.id} gameId={game.id} />
        ))}
      </div>
    </div>
  );
}
