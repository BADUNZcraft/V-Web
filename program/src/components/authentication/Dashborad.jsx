// example code on how to implement users on homepage / header



import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [error, setError]= useState('')
    const {currentUser, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out')
        }
    }
  return (
    <>
        <div>
            <h2>Profile</h2>
            {error && <h2>{error}</h2>}
            <strong>Email:</strong> {currentUser.email}
            <br />
            <Link to='/update-profile'>Update Profile</Link>
        </div>
        <div>
            <input type="button" name="Log Out" id="logOut" onClick={handleLogout} value={"Log Out"}/>
        </div>
    </>
  )
}
