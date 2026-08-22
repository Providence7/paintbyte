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

      {/* Streamlined 3D Studio Banner */}
      <section className="relative overflow-hidden border-b border-line bg-slate-900 py-8 text-white">
        {/* Decorative Grid Backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            
            {/* Left Content Column */}
            <div className="space-y-3 lg:col-span-7">
              <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 font-mono text-[11px] font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Zero Guesswork Experience</span>
              </div>

              <h2 className="font-display text-xl font-normal leading-snug tracking-tight sm:text-2xl text-white">
                Not sure how colors will look?{' '}
                <span className="italic text-emerald-400">Test them live .</span>
              </h2>

              <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Mix and match authentic paint shades across walls, trims, and roofs on interactive 3D building models before buying paint.
              </p>

              {/* Compact Horizontal Feature Badges */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-slate-300 pt-1">
                <span className="flex items-center space-x-1">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>100% Free Tool</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Authentic Color Codes</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>1-Click WhatsApp Quote</span>
                </span>
              </div>

              {/* Compact CTA Buttons */}
             
            </div>

            {/* Right Compact Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-xl space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 font-mono text-[11px]">
                  <span className="font-bold uppercase tracking-wider text-emerald-400">
                    Live Spec Builder
                  </span>
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] text-slate-400">
                    Interactive
                  </span>
                </div>

               
                <Link
                  to="/studio"
                  className="block w-full text-center rounded bg-slate-900 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 transition-colors"
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