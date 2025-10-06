import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) setUser({ email });
  }, []);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.access_token);
    localStorage.setItem('email', email);
    setUser({ email });
  };
  const register = async (email, password, role='USER') => {
    await API.post('/auth/register', { email, password, role });
    await login(email, password);
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUser(null);
  };
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}