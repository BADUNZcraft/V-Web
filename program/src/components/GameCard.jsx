import React, { useEffect, useState } from 'react';
import { useIGDB } from '../contexts/IGDBContext';
import { useFirestore } from '../contexts/FirestoreContext';
import { useAuth } from '../contexts/AuthContext';

export default function GameCard({ gameId }) {
  const { currentUser } = useAuth()
  const { getData, initializeToken, token } = useIGDB()
  const { getLikedGames, removeLike, addLike } = useFirestore()
  const [isLiked, setIsLiked] = useState(false);
  const [game, setGame] = useState([]);

  useEffect(() => {
    initializeToken()
  })

  const fetchData = async () => {
    if(token) {
      try {
        const result = await getData('games', `fields name, rating; where id=${gameId};`)
        setGame(result[0])
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten: ', error);
      }
    }
  }

  const checkLike = async () => {
    const likedGames = await getLikedGames(currentUser.uid)
    if(likedGames.some(obj => obj.gameId === game.id)) {
      setIsLiked(true)
    } 
  }

  

  useEffect(() => {
    fetchData()
  }, [token])

  useEffect(() => {
    checkLike()
  }, [game])


  const toggleHeart = async () => {
    setIsLiked(!isLiked);

    if(isLiked) {
      removeLike(currentUser, game.id)     
      console.log('remove like'); 
    } else {
      addLike(currentUser, game.id)
      console.log('add like');
    }
  };

  return (
    <div>
      <div className="game-card">
        <div className="game-card-image">
          <img src="https://placehold.co/150x150" alt="#" />
        </div>
        <div className="game-card-title">
          <p>{game?.name || 'loading'}</p>
        </div>
        <div className="game-card-info">
          <div className="game-card-rating">
            <p>{Math.round(game?.rating) || 'loading'}</p>
          </div>
          <button onClick={toggleHeart} className="heart-button" style={{ fontSize: '24px' }}>
            {isLiked ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}