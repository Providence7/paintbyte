import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
    { to: '/studio', label: 'Design a Space' },
  { to: '/contact', label: 'Get an Estimate' },

]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Top Heritage Ribbon / Announcement Bar */}
      <div className="bg-ink text-canvas py-1.5 px-6 border-b border-canvas/10 text-[11px] font-mono tracking-wider uppercase hidden sm:block">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
            <span className="text-canvas/80">Studio & Atelier — Residential & Commercial</span>
          </div>
          <span className="font-display italic text-canvas/60 lowercase tracking-normal">
            &ldquo;Simplicity is the ultimate sophistication.&rdquo;
          </span>
          <div className="text-canvas/60">
            Est. 2026
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-canvas/90 backdrop-blur-md border-b border-line shadow-sm py-3'
            : 'bg-canvas/40 backdrop-blur-sm border-b border-line/40 py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
          
          {/* Brand Logo & Monogram */}
          <Link to="/" className="group flex items-center space-x-3 focus:outline-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-ink text-canvas font-display text-sm font-semibold transition-transform duration-300 group-hover:scale-105 group-hover:bg-brand">
              PB
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-normal tracking-tight text-ink">
                Paint<span className="text-brand font-semibold">byte</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone -mt-1 hidden sm:block">
                Master Finishers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center space-x-8 md:flex">
            {NAV_LINKS.map((link, index) => {
              const isEstimate = link.to === '/contact'

              if (isEstimate) {
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="inline-flex items-center justify-center rounded-sm bg-brand px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-canvas shadow-sm transition-all hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 active:scale-95"
                  >
                    <span>{link.label}</span>
                    <span className="ml-1.5 text-xs text-amber-tint">→</span>
                  </NavLink>
                )
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `group relative py-1 font-body text-sm font-medium tracking-wide transition-colors ${
                      isActive ? 'text-brand' : 'text-ink/80 hover:text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {/* Hover / Active Bottom Rule Line */}
                      <span
                        className={`absolute inset-x-0 bottom-0 h-0.5 bg-brand transition-all duration-300 ${
                          isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              )
            })}
          </div>

          {/* Mobile Animated Hamburger Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-line bg-canvas p-2 transition-colors hover:border-ink md:hidden focus:outline-none"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <div className="relative flex h-3.5 w-5 flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-ink transition-transform duration-300 ${
                  open ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-full bg-ink transition-opacity duration-300 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`h-0.5 w-full bg-ink transition-transform duration-300 ${
                  open ? '-translate-y-1.5 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Dropdown Panel */}
        {open && (
          <div className="border-t border-line bg-canvas/98 backdrop-blur-lg px-6 py-6 md:hidden animate-fadeUp">
            <div className="space-y-4">
              {NAV_LINKS.map((link, index) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-line/50 pb-3 font-body text-base transition-colors ${
                      isActive ? 'font-semibold text-brand' : 'text-ink/80 hover:text-brand'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs text-stone">0{index + 1}</span>
                    <span>{link.label}</span>
                  </div>
                  <span className="font-mono text-xs text-stone">↗</span>
                </NavLink>
              ))}
            </div>

            {/* Mobile Footer Stamp */}
            <div className="mt-8 pt-4 border-t border-line flex items-center justify-between font-mono text-[10px] uppercase text-stone">
              <span>Paintbyte Atelier</span>
              <span>Refined Finishes</span>
            </div>
          </div>
        )}
      </header>
    </>
  )
}