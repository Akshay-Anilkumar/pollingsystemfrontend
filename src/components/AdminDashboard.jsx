import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

export default function AdminDashboard() {
  const [polls, setPolls] = useState([])
  const [title, setTitle] = useState('')
  const [options, setOptions] = useState('')
  const [duration, setDuration] = useState(60)
  const [isPublic, setIsPublic] = useState(true)
  const [allowedUsers, setAllowedUsers] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{ load() },[])
  const load = async () => {
    const res = await API.get('/polls')
    setPolls(res.data)
  }

  const create = async (e) => {
    e.preventDefault()
    const payload = {
      title,
      options: options.split(',').map(s=>s.trim()),
      duration: parseInt(duration),
      isPublic
    }
    if (!isPublic) payload.allowedUserIds = allowedUsers.split(',').map(e=>e.trim())
    await API.post('/polls', payload)
    setTitle(''); setOptions(''); setDuration(60); setIsPublic(true); setAllowedUsers('')
    load()
  }

  const remove = async (id) => {
    try {
      await API.delete(`/polls/${id}`)
      alert('Deleted!')
      load()
    } catch (error) {
      if (error.response?.status === 403) {
        alert('Not owner!')
      }
    }
  }
  
  const edit = async (id) => {
    const newTitle = prompt('New title')
    if (newTitle) { await API.patch(`/polls/${id}`, { title: newTitle }); load() }
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={create}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required/><br/>
        <input placeholder="Options (comma separated)" value={options} onChange={e=>setOptions(e.target.value)} required/><br/>
        <input placeholder="Duration (minutes)" type="number" value={duration} onChange={e=>setDuration(e.target.value)} required/><br/>
        <label><input type="checkbox" checked={isPublic} onChange={e=>setIsPublic(e.target.checked)}/> Public</label><br/>
        {!isPublic && <input placeholder="Allowed users (emails comma separated)" value={allowedUsers} onChange={e=>setAllowedUsers(e.target.value)}/>}<br/>
        <button>Create</button>
      </form>
      <hr/>
      <h3>All Polls</h3>
      {polls.map(p=>(
        <div key={p.id} style={{border:'1px solid #ccc', padding:8, margin:8}}>
          <h4>{p.title}</h4>
          <p>{p.isActive ? 'Active' : 'Expired'}</p>
          <button onClick={()=>edit(p.id)} disabled={!p.isActive}>Edit</button>
          <button onClick={()=>remove(p.id)}>Delete</button>
          <button onClick={()=>navigate(`/polls/${p.id}/results`)}>Results</button>
        </div>
      ))}
    </div>
  )
}
