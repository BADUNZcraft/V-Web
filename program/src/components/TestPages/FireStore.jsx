import React from 'react'
import { useFirestore } from '../../contexts/FirestoreContext'

export default function FireStore() {
    const { testFunction } = useFirestore()
  return (
    <div>
      {testFunction()}
    </div>
  )
}
