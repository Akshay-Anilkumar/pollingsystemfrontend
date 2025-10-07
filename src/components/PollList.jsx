import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { Link } from 'react-router-dom'

export default function PollList() {
  const [polls, setPolls] = useState([])
  useEffect(() => { fetchPolls() }, [])
  const fetchPolls = async () => {
    const res = await API.get('/polls')
    setPolls(res.data)
  }
  const vote = async (id, choice) => {
    try {
      await API.post(`/polls/${id}/vote`, { choice })
      alert('Voted!')
      fetchPolls()
    } catch (error) {
      if (error.response?.status === 400) {
        alert('You have already voted on this poll!')
      }
    }
  }
  return (
    <div>
      <h2>Polls</h2>
      {polls.map(p => (
        <div key={p.id} style={{border:'1px solid #ccc', padding:8, margin:8}}>
          <h3>{p.title}</h3>
          <p>Status: {p.isActive ? 'Active' : 'Expired'}</p>
          {p.isActive ? (
            <div>{p.options.map(opt => <button key={opt} onClick={() => vote(p.id,opt)}>{opt}</button>)}</div>
          ) : (
            <div><Link to={`/polls/${p.id}/results`}>View Results</Link></div>
          )}
        </div>
      ))}
    </div>
  )
}
