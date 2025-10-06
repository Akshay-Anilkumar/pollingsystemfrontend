import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../services/api'

export default function PollResults() {
  const { id } = useParams()
  const [results, setResults] = useState(null)

  useEffect(() => { if (id) load() }, [id])

  const load = async () => {
    const res = await API.get(`/polls/${id}/results`)
    setResults(res.data)
  }

  if (!results) return <div>Loading...</div>

  const total = Object.values(results.tally || {}).reduce((a,b)=>a+b,0)

  return (
    <div>
      <h2>Results - {results.poll.title}</h2>
      <p>Total votes: {total}</p>
      <ul>
        {Object.entries(results.tally || {}).map(([opt,count]) => (
          <li key={opt}>{opt}: {count} ({total>0?((count/total)*100).toFixed(1):0}%)</li>
        ))}
      </ul>
    </div>
  )
}