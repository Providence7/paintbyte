import { useCallback, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'

export default function BeforeAfterSlider({
  beforeImage = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
  afterImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
  altText = 'Architectural Restoration',
  title = 'The Living Room Transformation',
  adage = 'A picture is worth a thousand words.',
  subtitle = 'From neglected mid-century heritage to restored craftsmanship.',
  category = 'VOL. 01 — RESTORATION',
  compact = false,
  projectType = 'Residential Interior Painting',
  location = 'Ibadan, Nigeria',
  keywords = 'surface preparation, living room repainting, wall refinishing'
}) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e) => {
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }

  const onPointerMove = (e) => {
    if (!isDragging) return
    updateFromClientX(e.clientX)
  }

  const stopDragging = (e) => {
    if (isDragging) {
      setIsDragging(false)
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch (err) {
        // Pointer capture safety check
      }
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 5))
    if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 5))
    if (e.key === 'Home') setPosition(0)
    if (e.key === 'End') setPosition(100)
  }

  const beforeAlt = `${altText} — Before surface preparation (${projectType} in ${location})`
  const afterAlt = `${altText} — After PaintByte finish (${projectType} in ${location})`

  const imageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    'name': `${title} - Before and After Painting Comparison`,
    'description': `${subtitle} Featuring ${keywords} by PaintByte in ${location}.`,
    'contentUrl': afterImage,
    'thumbnail': afterImage,
    'keywords': keywords
  }

  const slider = (
    <div
      ref={containerRef}
      className={`relative w-full select-none overflow-hidden bg-slate-900 cursor-ew-resize touch-none group shadow-2xl ${
        compact
          ? 'h-full rounded-none border-0'
          : 'aspect-[4/3] sm:aspect-[16/10] rounded-xl border border-line bg-canvas'
      }`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(imageSchema)}
        </script>
      </Helmet>

      {/* 1. AFTER IMAGE */}
      <img
        src={afterImage}
        alt={afterAlt}
        title={`${title} - Completed PaintByte Project`}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* 2. BEFORE IMAGE */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden z-10"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          title={`${title} - Original Condition`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* 3. DYNAMIC LABELS LAYER */}
      <div className="pointer-events-none absolute inset-x-3 top-3 z-30 flex justify-between items-center">
        <div 
          className="flex items-center space-x-1.5 rounded-full bg-slate-950/80 backdrop-blur-md px-3 py-1 text-white border border-white/20 shadow-lg transition-all duration-200"
          style={{ opacity: position < 8 ? 0.15 : 1 }}
        >
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-amber-300">
            Before Prep
          </span>
        </div>

        <div 
          className="flex items-center space-x-1.5 rounded-full bg-emerald-950/80 backdrop-blur-md px-3 py-1 text-white border border-emerald-500/30 shadow-lg transition-all duration-200"
          style={{ opacity: position > 92 ? 0.15 : 1 }}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-emerald-300">
            After PaintByte Finish
          </span>
        </div>
      </div>

      {/* 4. INTERACTIVE SLIDER HANDLE */}
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Interactive comparison slider for ${title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={onKeyDown}
        className={`absolute inset-y-0 flex -translate-x-1/2 cursor-ew-resize items-center justify-center focus:outline-none z-20 ${
          compact ? 'w-6' : 'w-10'
        }`}
        style={{ left: `${position}%` }}
      >
        <div className="h-full w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-colors group-hover:bg-emerald-400" />
        <div
          className={`absolute flex items-center justify-center rounded-full border-2 border-white bg-slate-900/90 text-emerald-400 shadow-2xl backdrop-blur-md transition-all duration-150 ${
            compact ? 'h-8 w-8' : 'h-11 w-11'
          } ${
            isDragging
              ? 'scale-110 border-emerald-400 bg-slate-950 text-emerald-300 ring-4 ring-emerald-500/30'
              : 'group-hover:scale-105 group-hover:border-emerald-400'
          }`}
        >
          <svg className={compact ? 'h-3.5 w-3.5' : 'h-5 w-5'} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </div>
      </div>

      {/* 5. INTERACTION PROMPT FOOTER */}
      {!compact && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-20 rounded-full bg-slate-950/75 backdrop-blur-md px-3.5 py-1 text-white border border-white/10 shadow-lg opacity-80 transition-opacity group-hover:opacity-100">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
            {isDragging ? `${Math.round(position)}% Revealed` : 'Drag or use arrow keys'}
          </span>
        </div>
      )}
    </div>
  )

  if (compact) return slider

  return (
    <figure className="mx-auto w-full max-w-4xl rounded-2xl bg-canvas p-5 sm:p-8 border border-line shadow-lg font-body text-ink animate-fadeUp">
      <header className="mb-6 border-b border-line/80 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            {category}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-stone">
            {projectType} • {location}
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
          {title}
        </h3>

        <div className="mt-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <p className="font-display italic text-sm sm:text-base text-emerald-600 dark:text-emerald-400">
            &ldquo;{adage}&rdquo;
          </p>
          <figcaption className="font-body text-xs text-stone">
            {subtitle}
          </figcaption>
        </div>
      </header>

      {slider}

      <footer className="mt-5 flex flex-wrap items-center justify-between text-xs text-stone border-t border-line/80 pt-4">
        <div className="font-mono text-[11px] flex items-center space-x-2">
          <span>State:</span>
          <span className="rounded bg-line/30 px-2 py-0.5 font-bold text-ink">
            {Math.round(position)}% Initial Condition
          </span>
          <span>/</span>
          <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-bold text-emerald-600 dark:text-emerald-400">
            {100 - Math.round(position)}% PaintByte Transformed
          </span>
        </div>
        <span className="font-display italic text-stone text-[11px]">
          Crafted with care & precision by PaintByte
        </span>
      </footer>
    </figure>
  )
}