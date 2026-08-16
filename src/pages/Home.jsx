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
    <>
      {/* Hero Section */}
      <Hero
        featuredImage={projects[0]?.afterImage || projects[0]?.images?.[0]}
        projectCount={projects.length}
      />

      {/* High-Converting 3D Studio Spotlight Banner */}
      <section className="relative overflow-hidden border-b border-line bg-slate-900 py-16 text-white">
        {/* Decorative Grid Backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            
            {/* Left Content Column */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Zero Guesswork Experience</span>
              </div>

              <h2 className="font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl text-white">
                Not sure how the colors will look? <br />
                <span className="italic text-emerald-400">Test them live in 3D first.</span>
              </h2>

              <p className="font-body text-sm text-slate-300 leading-relaxed sm:text-base max-w-xl">
                Eliminate wrong color choices before buying a single bucket of paint. Mix and match authentic Nigerian paint shades across walls, trims, and roofs on real building models.
              </p>

              {/* Quick Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Authentic Nigerian Color Codes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Instant 3D Wall Previews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>1-Click Custom WhatsApp Quote</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>100% Free Interactive Tool</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/studio"
                  className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5"
                >
                  <span>Launch 3D Design Studio</span>
                  <span className="ml-2 text-base">→</span>
                </Link>

                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center rounded-md border border-slate-700 bg-slate-800/60 px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-slate-800 hover:border-slate-600"
                >
                  View Past Finishes
                </Link>
              </div>
            </div>

            {/* Right Interactive Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
                  <span className="font-bold uppercase tracking-wider text-emerald-400">
                    Live 3D Spec Builder
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                    Interactive
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <div className="flex items-center justify-between rounded border border-slate-800/80 bg-slate-900/60 p-2.5">
                    <span className="text-slate-400">Main Body:</span>
                    <span className="font-semibold text-white flex items-center space-x-2">
                      <span className="h-3 w-3 rounded-full bg-[#E8E3D9] border border-slate-700" />
                      <span>Off-White Satin</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded border border-slate-800/80 bg-slate-900/60 p-2.5">
                    <span className="text-slate-400">Accent Trim:</span>
                    <span className="font-semibold text-white flex items-center space-x-2">
                      <span className="h-3 w-3 rounded-full bg-[#1A2A3A] border border-slate-700" />
                      <span>Royal Navy</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded border border-slate-800/80 bg-slate-900/60 p-2.5">
                    <span className="text-slate-400">Facial Roof Board:</span>
                    <span className="font-semibold text-white flex items-center space-x-2">
                      <span className="h-3 w-3 rounded-full bg-[#2D2D2D] border border-slate-700" />
                      <span>Charcoal Gloss</span>
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    to="/studio"
                    className="block rounded bg-slate-900 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 transition-colors"
                  >
                    Customize Your Building Now ↗
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <Services />

      {/* Recent Portfolio Section */}
      <section className="border-b border-line bg-canvas py-10 font-body text-ink">
        <div className="mx-auto max-w-6xl px-6">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="mt-3 max-w-lg font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
                Real jobs, drag to compare
              </h2>
            </div>

            <p className="max-w-md font-body text-sm leading-relaxed text-stone">
              Explore before-and-after transformations across residential and commercial spaces in Nigeria.
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
                <span>→</span>
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* Process & Methodology Section */}
      <Process />

      {/* Client Testimonials Section */}
      <Testimonials />
    </>
  )
}