import { Link } from 'react-router-dom'
import BeforeAfterSlider from './BeforeAfterSlider.jsx'
import ShareButton from './ShareButton.jsx'

export default function ProjectCard({ project }) {
  if (!project) return null

  const afterImg = project.afterImage || project.images?.[0]

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-line bg-canvas transition-all duration-300 hover:border-brand/80 hover:shadow-xl">
      
      {/* Before/After Slider Container */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden bg-brand-tint"
        onClick={(e) => {
          if (e.defaultPrevented) return
        }}
      >
        <BeforeAfterSlider
          beforeImage={project.beforeImage}
          afterImage={afterImg}
          altText={project.title || 'Completed painting project'}
          compact
        />

        {/* Top Floating Badges */}
        <div className="pointer-events-none absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
          <span className="rounded-sm bg-ink/90 px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-wider text-canvas backdrop-blur-md">
            {project.serviceType || 'Painting Job'}
          </span>
          <span className="rounded-sm bg-brand/90 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-canvas backdrop-blur-md">
            Case Study
          </span>
        </div>

        {/* Hover Click-Through Overlay affordance */}
        <Link 
          to={`/portfolio/${project._id || project.id}`}
          className="absolute inset-0 z-20 flex items-center justify-center bg-ink/40 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100"
          aria-label={`View case study for ${project.title}`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-canvas px-4 py-2 font-mono text-xs font-bold text-ink shadow-lg transition-transform duration-300 group-hover:scale-105">
            <span>Explore Case Study</span>
            <span className="text-brand">→</span>
          </span>
        </Link>
      </div>

      {/* Card Body Link */}
      <Link
        to={`/portfolio/${project._id || project.id}`}
        className="flex flex-1 flex-col justify-between p-5 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
      >
        <div>
          {/* Title with prominent CTA indicator */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-brand">
              {project.title}
            </h3>
          </div>

          {/* Location */}
          {project.location && (
            <p className="mt-1 flex items-center font-body text-xs text-stone">
              <span className="mr-1.5 text-amber">📍</span>
              <span>{project.location}</span>
            </p>
          )}

          {/* Paint Specs */}
          {(project.paintBrand || project.finishType || project.scope) && (
            <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-line/40 font-mono text-[10px] text-stone">
              {project.paintBrand && (
                <span className="rounded-sm bg-line/40 px-1.5 py-0.5 font-medium text-ink/80">
                  {project.paintBrand}
                </span>
              )}
              {project.finishType && (
                <span className="rounded-sm bg-line/40 px-1.5 py-0.5 font-medium text-ink/80">
                  {project.finishType}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Strong Action Footer */}
        <div className="mt-4 flex items-center justify-between rounded-sm bg-line/30 px-3 py-2.5 transition-colors group-hover:bg-brand/10 group-hover:text-brand">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink group-hover:text-brand">
            View Full Case Study
          </span>
          <span className="font-mono text-sm font-bold text-brand transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </Link>

    </article>
  )
}