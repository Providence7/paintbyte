import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx'
import apiClient from '../api/client.js'

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    apiClient
      .get(`/projects/${id}`)
      .then((res) => {
        if (isMounted) setProject(res.data)
      })
      .catch((err) => {
        console.error('Failed to load project details:', err)
        if (isMounted) setProject(null)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16 font-body text-ink">
        <div className="h-4 w-32 animate-pulse rounded bg-line/40" />
        <div className="mt-4 h-10 w-3/4 animate-pulse rounded bg-line/40" />
        <div className="mt-8 h-96 w-full animate-pulse rounded bg-line/20" />
      </section>
    )
  }

  if (!project) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-24 text-center font-body text-ink">
        <h2 className="font-display text-2xl font-normal text-ink">
          Project Not Found
        </h2>
        <p className="mt-2 text-sm text-stone">
          The requested project could not be located or may have been removed.
        </p>
        <Link
          to="/portfolio"
          className="mt-6 inline-flex items-center space-x-2 font-mono text-xs font-semibold uppercase tracking-wider text-brand hover:underline"
        >
          <span>← Back to portfolio</span>
        </Link>
      </section>
    )
  }

  const formattedDate = project.completedDate
    ? new Date(project.completedDate).toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric'
      })
    : null

  return (
    <article className="mx-auto max-w-4xl px-6 py-16 font-body text-ink">
      {/* Top Breadcrumb & Back Action */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          to="/portfolio"
          className="font-mono text-xs uppercase tracking-wider text-stone hover:text-ink transition-colors"
        >
          ← Back to Portfolio
        </Link>
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-amber" />
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-dark">
            {project.serviceType || 'Project Showcase'}
          </span>
        </div>
      </div>

      {/* Main Title & Metadata */}
      <h1 className="font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
        {project.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-stone">
        {project.location && <span>📍 {project.location}</span>}
        {project.location && formattedDate && <span>·</span>}
        {formattedDate && <span>🗓️ Completed {formattedDate}</span>}
      </div>

      {/* Interactive Before/After Comparison */}
      <div className="mt-8 rounded-sm border border-line bg-canvas p-2 shadow-sm">
        <BeforeAfterSlider
          beforeImage={project.beforeImage}
          afterImage={project.afterImage || project.images?.[0]}
          altText={project.title}
        />
        <div className="p-3 text-center font-mono text-[11px] text-stone uppercase tracking-wider">
          Drag slider horizontally to compare before and after
        </div>
      </div>

      {/* Narrative Description */}
      {project.description && (
        <div className="mt-10 border-t border-line/60 pt-8">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-stone">
            Project Overview
          </h2>
          <p className="mt-3 font-body text-base leading-relaxed text-ink/90 sm:text-lg">
            {project.description}
          </p>
        </div>
      )}

      {/* Video Walkthrough */}
      {project.videoUrl && (
        <div className="mt-12 border-t border-line/60 pt-8">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-amber" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-dark">
              Walkthrough Video
            </span>
          </div>
          <video
            controls
            className="mt-4 w-full rounded-sm border border-line bg-ink"
            src={project.videoUrl}
          />
        </div>
      )}

      {/* Gallery Grid */}
      {project.images?.length > 1 && (
        <div className="mt-12 border-t border-line/60 pt-8">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-stone">
            Additional Gallery Views
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {project.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${project.title} detailed shot ${i + 1}`}
                className="aspect-square w-full rounded-sm border border-line/60 object-cover transition-transform hover:scale-[1.02]"
              />
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <div className="mt-16 rounded-sm border border-line bg-brand-tint/30 p-8 text-center sm:p-10">
        <h3 className="font-display text-2xl font-normal">
          Have a similar job in mind?
        </h3>
        <p className="mt-2 font-body text-xs text-stone max-w-md mx-auto">
          Contact our team today to get a free estimate tailored to your project requirements.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-sm bg-brand px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-canvas shadow-sm hover:bg-brand-dark transition-colors"
          >
            Request Free Estimate
          </Link>
        </div>
      </div>
    </article>
  )
}