import React, { useRef } from 'react'
import { useFirestore } from '../../contexts/FirestoreContext'
import { useAuth } from '../../contexts/AuthContext'

export default function FireStore() {
    const { currentUser } = useAuth()
    const { addLike } = useFirestore()
    const gameIdRef = useRef(0)
    function handleClick(e) {
        e.preventDefault()
        addLike(currentUser, gameIdRef.current.value)
    }
  return (
    <div>
      <form onSubmit={handleClick}>
        <label>Game id:</label>
        <input type="number" ref={gameIdRef}/>
        <input type="submit" content='Submit' />
      </form>
    </div>
  )
}