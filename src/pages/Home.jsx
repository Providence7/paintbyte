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