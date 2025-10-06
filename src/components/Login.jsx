import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
export default function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/polls')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
        <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  )
}