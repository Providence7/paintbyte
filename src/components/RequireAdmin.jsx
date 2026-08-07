import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

export default function RequireAdmin({ children }) {
  const { token, loading } = useAdminAuth()

  if (loading) {
    return <p className="mx-auto max-w-6xl px-6 py-16 font-body text-sm text-stone">Loading…</p>
  }

  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
