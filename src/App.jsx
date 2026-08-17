import { useEffect } from 'react'
import { Route, Routes, useLocation, Link } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import DesignStudio from './components/DesignStudio.jsx'
import RequireAdmin from './components/RequireAdmin.jsx'
import Home from './pages/Home.jsx'
import Portfolio from './pages/Portfolio.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Contact from './pages/Contact.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminProjectForm from './pages/admin/AdminProjectForm.jsx'
import DesignStudio3D from './components/DesignStudio.jsx'

// WhatsApp Floating CTA Button Component
function WhatsAppCTA({ phoneNumber = "2348000000000", defaultMessage = "Hi! I would like to make an inquiry about a painting project." }) {
  const location = useLocation()
  
  // Hide CTA button on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null
  }

  const encodedMessage = encodeURIComponent(defaultMessage)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-xl hover:bg-[#20ba5a] transition-all transform hover:scale-105 active:scale-95"
    >
      <svg
        className="h-6 w-6 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001L2 22l5.127-1.339c1.464.796 3.111 1.218 4.881 1.218 5.508 0 9.991-4.478 9.991-9.985 0-2.668-1.038-5.176-2.925-7.062A9.923 9.923 0 0012.012 2zm5.733 14.152c-.244.688-1.42 1.314-1.96 1.393-.503.074-1.152.106-3.327-.79-2.784-1.147-4.577-3.985-4.717-4.172-.138-.186-1.127-1.503-1.127-2.866 0-1.363.708-2.035.959-2.312.251-.277.548-.347.731-.347.183 0 .366.002.525.01.171.009.398-.065.623.475.231.554.787 1.92.856 2.059.068.139.114.301.023.485-.091.185-.138.299-.274.462-.138.163-.29.364-.414.49-.138.139-.282.292-.122.568.16.276.711 1.174 1.528 1.902 1.05.936 1.936 1.226 2.212 1.364.276.139.438.115.6-.07.162-.185.698-.813.883-1.091.185-.278.368-.231.618-.139.251.092 1.59.75 1.864.887.274.138.457.208.525.323.069.116.069.671-.175 1.359z" />
      </svg>
      <span className="hidden font-mono text-xs font-bold uppercase tracking-wider md:inline-block">
        Chat with Us
      </span>
    </a>
  )
}

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
          <Route path="/studio" element={<DesignStudio3D />} />
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

      {/* Floating WhatsApp CTA */}
      <WhatsAppCTA phoneNumber="2348065704348" />
    </div>
  )
}