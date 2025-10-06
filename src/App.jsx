import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/PollList'
import AdminDashboard from './components/AdminDashboard'
import PollResults from './components/PollResults'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <div className="container">
        <nav style={{ marginBottom: 20 }}>
          <Link to="/">Home</Link> | <Link to="/polls">Polls</Link> | <Link to="/admin">Admin</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/polls" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/polls/:id/results" element={<PrivateRoute><PollResults /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}