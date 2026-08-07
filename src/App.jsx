import { useEffect } from 'react'
import { Route, Routes, useLocation, Link } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import RequireAdmin from './components/RequireAdmin.jsx'
import Home from './pages/Home.jsx'
import Portfolio from './pages/Portfolio.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Contact from './pages/Contact.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminProjectForm from './pages/admin/AdminProjectForm.jsx'

// Automatically scrolls window to top on route transitions
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// 404 Fallback component
function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-24 text-center font-body text-ink">
      <div className="flex items-center space-x-2">
        <span className="h-2 w-2 rounded-full bg-amber" />
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-dark">
          404 — Page Not Found
        </span>
      </div>
      <h1 className="mt-4 font-display text-3xl font-normal tracking-tight sm:text-4xl">
        Looking for a paint job?
      </h1>
      <p className="mt-3 font-body text-sm text-stone max-w-sm">
        The page you are looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-sm bg-brand px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-canvas shadow-sm hover:bg-brand-dark transition-colors"
      >
        Return to Home Page
      </Link>
    </section>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas font-body text-ink">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Public Client Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/projects/new"
            element={
              <RequireAdmin>
                <AdminProjectForm />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/projects/:id/edit"
            element={
              <RequireAdmin>
                <AdminProjectForm />
              </RequireAdmin>
            }
          />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}