import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext.jsx'

export default function AdminLogin() {
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Incorrect email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto flex max-w-sm flex-col px-6 py-24 font-body text-ink">
      {/* Category Indicator */}
      <div className="flex items-center space-x-2">
        <span className="h-2 w-2 rounded-full bg-amber" />
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-dark">
          Admin Portal
        </span>
      </div>

      <h1 className="mt-3 font-display text-3xl font-normal tracking-tight">
        Sign in
      </h1>
      <p className="mt-1 font-body text-xs text-stone">
        Manage portfolio projects and incoming client messages.
      </p>

      {/* Login Form */}
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block font-mono text-xs uppercase tracking-widest text-stone"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="mt-2 w-full border-b border-line bg-transparent py-2.5 font-body text-sm text-ink transition-colors focus:border-brand focus:outline-none"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block font-mono text-xs uppercase tracking-widest text-stone"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="mt-2 w-full border-b border-line bg-transparent py-2.5 font-body text-sm text-ink transition-colors focus:border-brand focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="rounded-sm border border-red-200 bg-red-50 p-3 font-mono text-xs text-red-700">
            ⚠️ {error}
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-sm bg-brand px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-wider text-canvas shadow-sm transition-all hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in to Dashboard'}
        </button>
      </form>
    </section>
  )
}