import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import ProjectCard from './ProjectCard.jsx'

const FILTERS = ['All', 'Interior', 'Exterior', 'Commercial']

export default function PortfolioGrid({ projects = [] }) {
  const [filter, setFilter] = useState('All')

  // Filter logic preserved exactly
  const filtered = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter((p) => p.serviceType === filter)
  }, [projects, filter])

  // Count projects per category
  const counts = useMemo(() => {
    const map = { All: projects.length }
    FILTERS.forEach((f) => {
      if (f !== 'All') {
        map[f] = projects.filter((p) => p.serviceType === f).length
      }
    })
    return map
  }, [projects])

  // Dynamic Schema markup for gallery images
  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    'name': `PaintByte ${filter} Painting Portfolio`,
    'description': `A collection of completed professional ${filter.toLowerCase()} painting projects.`,
    'hasPart': filtered.map((project) => ({
      '@type': 'CreativeWork',
      'name': project.title || 'PaintByte Painting Project',
      'image': project.imageUrl || project.image,
      'description': project.description || `Professional ${project.serviceType} painting finish`
    }))
  }

  return (
    <div className="w-full">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(gallerySchema)}
        </script>
      </Helmet>

      {/* Category Filter Controls */}
      <nav aria-label="Portfolio filters" className="flex flex-wrap items-center gap-2 border-b border-line pb-4">
        {FILTERS.map((f) => {
          const isActive = filter === f
          const count = counts[f] ?? 0

          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={isActive}
              className={`relative inline-flex items-center gap-2 rounded-sm border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1 ${
                isActive
                  ? 'border-brand bg-brand text-canvas font-medium shadow-sm'
                  : 'border-line bg-canvas text-stone hover:border-ink hover:text-ink'
              }`}
            >
              <span>{f}</span>
              <span
                className={`text-[10px] ${
                  isActive ? 'text-canvas/80 font-bold' : 'text-stone/70'
                }`}
              >
                ({count})
              </span>
            </button>
          )
        })}
      </nav>

      {/* Grid Display or Friendly Empty State */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="my-16 flex flex-col items-center justify-center rounded-sm border border-dashed border-line bg-canvas/50 px-6 py-12 text-center"
          >
            <div className="mb-3 h-10 w-10 rounded-full bg-line/40 flex items-center justify-center text-stone" aria-hidden="true">
              🎨
            </div>
            <p className="font-display text-lg font-normal text-ink">
              No {filter.toLowerCase()} projects listed yet
            </p>
            <p className="mt-1 font-body text-sm text-stone max-w-md">
              We update our portfolio regularly as we complete new client jobs. Check back soon or view all completed work.
            </p>
            <button
              onClick={() => setFilter('All')}
              className="mt-5 inline-flex items-center rounded-sm border border-line bg-canvas px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-brand hover:text-brand"
            >
              View All Projects
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            layout
            className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => (
              <motion.div
                key={project._id || project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}