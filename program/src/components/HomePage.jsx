import React, { useState, useEffect } from 'react';
import Header from './Header';
import GameCard from './GameCard';
import { useFirestore } from '../contexts/FirestoreContext';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { getLikedGames, addLike } = useFirestore();
  const { currentUser } = useAuth();
  const [likedGames, setLikedGames] = useState([]);

  useEffect(() => {
    const fetchLikedGames = async () => {
      if (currentUser) {
        try {
          const likedGamesArray = await getLikedGames(currentUser.uid);
          setLikedGames(likedGamesArray);
          console.log(likedGamesArray);
        } catch (error) {
          console.error('Error fetching liked games:', error);
        }
      }
    };

    fetchLikedGames();
  }, [currentUser, getLikedGames]);

  return (
    <div>
      <Header />
      <h1>Home</h1>
      <GameCard />
      <button onClick={() => {console.log(likedGames);}}>print likedGames</button>
      <button onClick={() => {addLike(currentUser, 'ger')}}>add Like</button>
    </div>
  );
}
