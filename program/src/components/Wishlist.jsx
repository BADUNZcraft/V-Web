import React, {useState, useEffect} from 'react'
import Header from './Header'
import GameCard from './GameCard'
import { useFirestore } from '../contexts/FirestoreContext'
import { useAuth } from '../contexts/AuthContext'

export default function Wishlist() {
  const {getLikedGames} = useFirestore();
  const {currentUser} = useAuth();
  const [likedGames, setLikedGames] = useState([]);

  useEffect(() => {
    const fetchLikedGames = async () => {
      if (currentUser) {
        try {
          const likedGamesArray = await getLikedGames(currentUser.uid);
          setLikedGames(likedGamesArray);
        } catch (error) {
          console.error('Error fetching liked games: ', error);
        }
      }
    }
    fetchLikedGames();
  }, [])
  return (
    <div>
        <Header />
        <h1>Wishlist</h1>
        <div className="games-container">
        {likedGames.map(game => (
          <GameCard key={game.id} gameId={game.gameId} />
        ))}
      </div>
    </div>
  )
}
