import { Link } from 'react-router-dom'
import BeforeAfterSlider from './BeforeAfterSlider.jsx'

export default function ProjectCard({ project }) {
  if (!project) return null

  const afterImg = project.afterImage || project.images?.[0]

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-line bg-canvas transition-all duration-300 hover:border-brand/60 hover:shadow-md">
      
      {/* Before/After Slider Container - Prevent Link Triggering on Slider Drag */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden bg-brand-tint"
        onClick={(e) => {
          // If the user is interacting with the slider, don't trigger link navigation
          if (e.defaultPrevented) return
        }}
      >
        <BeforeAfterSlider
          beforeImage={project.beforeImage}
          afterImage={afterImg}
          altText={project.title || 'Completed painting project'}
        />

        {/* Floating Category Badge */}
        <div className="pointer-events-none absolute top-3 left-3 z-10">
          <span className="rounded-sm bg-ink/90 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-canvas backdrop-blur-sm">
            {project.serviceType || 'Painting Job'}
          </span>
        </div>
      </div>

      {/* Card Details & Navigation Link */}
      <Link
        to={`/portfolio/${project._id || project.id}`}
        className="flex flex-1 flex-col justify-between p-5 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
      >
        <div>
          {/* Title with hover color state */}
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-brand">
            {project.title}
          </h3>

          {/* Location */}
          {project.location && (
            <p className="mt-1 flex items-center font-body text-xs text-stone">
              <span className="mr-1 text-amber">📍</span>
              <span>{project.location}</span>
            </p>
          )}

          {/* Optional Painting Metadata (e.g., paint type, duration) */}
          {(project.paintBrand || project.finishType || project.scope) && (
            <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-line/40 font-mono text-[10px] text-stone">
              {project.paintBrand && (
                <span className="rounded-sm bg-line/30 px-1.5 py-0.5">
                  {project.paintBrand}
                </span>
              )}
              {project.finishType && (
                <span className="rounded-sm bg-line/30 px-1.5 py-0.5">
                  {project.finishType}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer Link Prompt */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-line/60 font-mono text-xs text-stone">
          <span className="group-hover:text-ink transition-colors">View Case Study</span>
          <span className="text-amber transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </Link>

    </article>
  )
}