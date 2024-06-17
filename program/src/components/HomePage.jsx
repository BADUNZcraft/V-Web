import React from 'react'
import Header from './Header'
import GameCard from './GameCard'

export default function HomePage() {
  return (
    <div>
        <Header />
        <h1>Home</h1>
        <GameCard />
        <GameCard />
    </div>
  )
}