import React, { useState } from 'react';

export default function GameCard() {
  const [isLiked, setIsLiked] = useState(false);

  const toggleHeart = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
<div className="game-card">
        <div className="game-card-image">
          <img src="https://placehold.co/150x150" alt="#" />
        </div>
        <div className="game-card-title">
          <p>Game Name</p>
        </div>
        <div className="game-card-info">
          <div className="game-card-rating">
            <p>000.00 rating</p>
          </div>
          <button onClick={toggleHeart} className="heart-button" style={{ fontSize: '24px' }}>
            {isLiked ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}