import React, { useState, useEffect } from 'react';
import Header from './Header';
import GameCard from './GameCard';
import { useFirestore } from '../contexts/FirestoreContext';
import { useAuth } from '../contexts/AuthContext';
import { useIGDB } from '../contexts/IGDBContext';

export default function HomePage() {
  const { addLike } = useFirestore();

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

  function addDemoLikes() {
    games.map(game => {
      console.log(game);
    })
    /*
    addLike(currentUser, '119133')
    addLike(currentUser, '11913')
    addLike(currentUser, '1191')
    addLike(currentUser, '119')
    */
  }

  return (
    <div>
      <Header />
      <h1>Browse games...</h1>


      <div className="games-container">
        {games.map(game => (
          <GameCard key={game.id} gameId={game.id} />
        ))}
      </div>
      <button onClick={addDemoLikes}>add Like</button>
    </div>
  );
}



