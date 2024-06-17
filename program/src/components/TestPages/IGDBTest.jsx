import React, { useEffect, useState } from 'react'
import { useIGDB } from '../../contexts/IGDBContext'

export default function IGDBTest() {
  const { getData, initializeToken, token } = useIGDB()
  const [data, setData] = useState([])

  useEffect(() => {
    initializeToken()
  })

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const result = await getData('games', 'fields *; limit 3; sort rating_count desc;')
          setData(result)
        } catch (error) {
          console.error('Fehler beim Abrufen der Daten:', error)
        }
      }
    }
    fetchData()
  }, [token]);



  return (
    <div>
      <h2>{token?.access_token || 'loading'}</h2>
      <button onClick={() => { console.log('Aktuelle Daten:', data); }}>print data</button>
      <div>{data.map((DataObject) => (
        <h2 key={DataObject.id}>{DataObject.name}</h2>
      ))}</div>
    </div>
  )
}
