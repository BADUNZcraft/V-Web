import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ component: Component }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />;
}