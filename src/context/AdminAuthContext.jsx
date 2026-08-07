import { createContext, useContext, useEffect, useState } from 'react'
import apiClient from '../api/client.js'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('pb_admin_token'))
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    apiClient
      .get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setAdmin(res.data))
      .catch(() => {
        setToken(null)
        localStorage.removeItem('pb_admin_token')
      })
      .finally(() => setLoading(false))
  }, [token])

  const login = async (email, password) => {
    const res = await apiClient.post('/auth/login', { email, password })
    localStorage.setItem('pb_admin_token', res.data.token)
    setToken(res.data.token)
    setAdmin(res.data.admin)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('pb_admin_token')
    setToken(null)
    setAdmin(null)
  }

  return (
    <AdminAuthContext.Provider value={{ token, admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
