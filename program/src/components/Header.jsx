import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [error, setError]= useState('')
    const {currentUser, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            console.log('Failed to log out')
        }
    }
  return (
    <header>
      <div className="header">
        <nav className="navbar">
          <div className="nav-group">
            <a href="/" className="nav-item">Home</a>
            <a href="/wishlist" className="nav-item">Wishlist</a>
          </div>
          <input type='button' onClick={handleLogout} className="nav-item button" value={'Log out'}/>
        </nav>
      </div>
    </header>
  );
}