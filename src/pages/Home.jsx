import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Services from '../components/Services.jsx'
import Process from '../components/Process.jsx'
import PortfolioGrid from '../components/PortfolioGrid.jsx'
import Testimonials from '../components/Testimonials.jsx'
import apiClient from '../api/client.js'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    apiClient
      .get('/projects', { params: { published: true, limit: 6 } })
      .then((res) => {
        if (isMounted) {
          setProjects(res.data || [])
        }
      })
      .catch(() => {
        if (isMounted) {
          setProjects([])
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <Hero
        featuredImage={projects[0]?.afterImage || projects[0]?.images?.[0]}
        projectCount={projects.length}
      />

      {/* Streamlined 3D Studio Banner */}
      <section 
        aria-labelledby="studio-banner-heading"
        className="relative overflow-hidden border-b border-line bg-slate-900 py-10 text-white"
      >
        {/* Decorative Grid Backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            
            {/* Left Content Column */}
            <div className="space-y-4 lg:col-span-7">
              <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Zero Guesswork Experience</span>
              </div>

              <h2 id="studio-banner-heading" className="font-display text-2xl font-normal leading-tight tracking-tight sm:text-3xl text-white">
                Not sure how colors will look?{' '}
                <span className="italic text-emerald-400">Test them live.</span>
              </h2>

              <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Mix and match authentic paint shades across walls, trims, and roofs on interactive 3D building models before buying paint.
              </p>

              {/* Compact Horizontal Feature Badges */}
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11px] text-slate-300 pt-1">
                <span className="flex items-center space-x-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>100% Free Tool</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Authentic Color Codes</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>1-Click WhatsApp Quote</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  to="/studio"
                  className="inline-flex items-center justify-center rounded bg-emerald-500 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-slate-950 transition-colors hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Launch 3D Studio ↗
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded border border-slate-700 bg-slate-800/60 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800"
                >
                  Book Consultation
                </Link>
              </div>
            </div>

            {/* Right Interactive Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 font-mono text-[11px]">
                  <span className="font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Live Spec Builder
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[9px] text-slate-400">
                    3D Visualizer
                  </span>
                </div>

                {/* Color Palette Spec Preview */}
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between rounded bg-slate-900/80 p-2 border border-slate-800">
                    <span className="text-slate-400">Exterior Walls</span>
                    <div className="flex items-center space-x-2">
                      <span className="h-3.5 w-3.5 rounded-full bg-slate-200 border border-slate-400" />
                      <span className="text-slate-200 font-semibold text-[11px]">Sandstone White</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded bg-slate-900/80 p-2 border border-slate-800">
                    <span className="text-slate-400">Trim & Columns</span>
                    <div className="flex items-center space-x-2">
                      <span className="h-3.5 w-3.5 rounded-full bg-amber-800 border border-amber-600" />
                      <span className="text-slate-200 font-semibold text-[11px]">Terracotta Ochre</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded bg-slate-900/80 p-2 border border-slate-800">
                    <span className="text-slate-400">Roof Accent</span>
                    <div className="flex items-center space-x-2">
                      <span className="h-3.5 w-3.5 rounded-full bg-slate-800 border border-slate-600" />
                      <span className="text-slate-200 font-semibold text-[11px]">Charcoal Slate</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/studio"
                  className="block w-full text-center rounded bg-slate-900 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all"
                >
                  Customize Spec ↗
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <Services />

      {/* Recent Portfolio Section */}
      <section className="border-b border-line bg-canvas py-16 font-body text-ink" aria-labelledby="portfolio-heading">
        <div className="mx-auto max-w-6xl px-6">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-stone">Portfolio Highlights</span>
              <h2 id="portfolio-heading" className="mt-2 max-w-lg font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
                Real jobs, drag to compare
              </h2>
            </div>

            <p className="max-w-md font-body text-sm leading-relaxed text-stone">
              Explore before-and-after transformations across residential and commercial spaces.
            </p>
          </div>

          {/* Portfolio Grid or Loading Skeleton */}
          <div className="mt-12">
            {loading ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="h-80 w-full animate-pulse rounded-sm bg-line/20"
                  />
                ))}
              </div>
            ) : (
              <PortfolioGrid projects={projects} />
            )}
          </div>

          {/* View Full Gallery Link */}
          {projects.length > 0 && (
            <div className="mt-12 text-center">
              <Link
                to="/portfolio"
                className="inline-flex items-center space-x-2 rounded-sm border border-line bg-canvas px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:border-brand hover:text-brand"
              >
                <span>View All Portfolio Projects</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* Process & Methodology Section */}
      <Process />

      {/* Client Testimonials Section */}
      <Testimonials />
    </main>
  )
}