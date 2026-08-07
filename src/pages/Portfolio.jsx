import { useEffect, useState, useMemo } from 'react'
import PortfolioGrid from '../components/PortfolioGrid.jsx'
import apiClient from '../api/client.js'

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    let isMounted = true

    apiClient
      .get('/projects', { params: { published: true } })
      .then((res) => {
        if (isMounted) {
          setProjects(res.data || [])
        }
      })
      .catch((err) => {
        console.error('Failed to load portfolio projects:', err)
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

  // Categories extracted dynamically from project list
  const categories = useMemo(() => {
    const list = ['All']
    projects.forEach((p) => {
      if (p.serviceType && !list.includes(p.serviceType)) {
        list.push(p.serviceType)
      }
    })
    return list
  }, [projects])

  // Filter projects according to selected category tab
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects
    return projects.filter(
      (p) => p.serviceType?.toLowerCase() === selectedCategory.toLowerCase()
    )
  }, [projects, selectedCategory])

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20 font-body text-ink">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-amber" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-dark">
               Portfolio
            </span>
          </div>
          <h1 className="mt-3 max-w-lg font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
            Every job we've finished
          </h1>
          <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-stone">
            Filter by service type, then drag any comparison slider to see the actual
            before and after transformation.
          </p>
        </div>

        {/* Dynamic Category Filter Tabs */}
        {!loading && projects.length > 0 && (
          <div className="flex flex-wrap gap-2 border-b border-line pb-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors rounded-sm ${
                    isActive
                      ? 'bg-brand text-canvas font-medium'
                      : 'bg-canvas text-stone hover:text-ink hover:bg-brand-tint/40'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Portfolio Grid or Skeleton Loading State */}
      <div className="mt-12">
        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-80 w-full animate-pulse rounded-sm bg-line/20 border border-line/40"
              />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <PortfolioGrid projects={filteredProjects} />
        ) : (
          <div className="py-16 text-center border border-dashed border-line rounded-sm bg-canvas">
            <p className="font-display text-base text-ink">
              No projects found in this category
            </p>
            <p className="mt-1 font-body text-xs text-stone">
              Try selecting another service type tab above.
            </p>
          </div>
        )}
      </div>

    </section>
  )
}