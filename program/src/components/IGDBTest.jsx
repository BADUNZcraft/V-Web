import React from 'react'
import { useIGDB } from '../contexts/IGDBContext'

export default function IGDBTest() {
  const { test } = useIGDB()

  return (
    <div>
      <button onClick={test}>Click me</button>
    </div>
  )
}