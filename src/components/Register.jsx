import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
export default function Register() {
  const { register } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await register(email, password, role)
      navigate('/polls')
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
        <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select><br/>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  )
}