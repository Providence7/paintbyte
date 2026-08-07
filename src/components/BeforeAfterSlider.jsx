import { useCallback, useRef, useState } from 'react'

export default function BeforeAfterSlider({
  beforeImage = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
  afterImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
  altText = 'Architectural Restoration',
  title = 'The Living Room Transformation',
  adage = 'A picture is worth a thousand words.',
  subtitle = 'From neglected mid-century heritage to restored craftsmanship.',
  category = 'VOL. 01 — RESTORATION'
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
        // Pointer capture release safety check
      }
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 5))
    if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 5))
    if (e.key === 'Home') setPosition(0)
    if (e.key === 'End') setPosition(100)
  }

  return (
    <figure className="mx-auto w-full max-w-4xl rounded-sm bg-canvas p-4 sm:p-8 border border-line shadow-sm font-body text-ink animate-fadeUp">
      
      {/* Narrative & Adage Header Section */}
      <header className="mb-6 border-b border-line pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-brand">
            {category}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-stone">
            Interactive Visual Comparison
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-ink">
          {title}
        </h3>

        <div className="mt-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <p className="font-display italic text-base text-brand-dark">
            &ldquo;{adage}&rdquo;
          </p>
          <p className="font-body text-xs text-stone">
            {subtitle}
          </p>
        </div>
      </header>

      {/* Main Interactive Canvas */}
      <div
        ref={containerRef}
        className="relative aspect-[4/3] sm:aspect-[16/10] w-full select-none overflow-hidden rounded-sm border border-line bg-ink/5 cursor-ew-resize touch-none group"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        {/* AFTER IMAGE (Base Layer) */}
        <img
          src={afterImage}
          alt={`${altText} — After`}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* BEFORE IMAGE (Clipped Overlay Layer) */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={`${altText} — Before`}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* Interactive Slider Divider Handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Drag horizontally to compare before and after state"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onKeyDown={onKeyDown}
          className="absolute inset-y-0 flex w-10 -translate-x-1/2 cursor-ew-resize items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand z-20"
          style={{ left: `${position}%` }}
        >
          {/* Vertical Line */}
          <div className="h-full w-0.5 bg-canvas shadow-[0_0_8px_rgba(20,24,26,0.3)] transition-colors group-hover:bg-amber-tint" />

          {/* Center Handle Button */}
          <div
            className={`absolute flex h-10 w-10 items-center justify-center rounded-full border border-canvas/40 bg-brand text-canvas shadow-lg transition-transform duration-150 ${
              isDragging ? 'scale-110 bg-brand-dark ring-4 ring-brand-tint/50' : 'group-hover:scale-105'
            }`}
          >
            <svg
              className="h-4 w-4 text-canvas"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
            </svg>
          </div>
        </div>

        {/* Dynamic Context Labels */}
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center space-x-1.5 rounded-sm bg-ink/80 backdrop-blur-md px-2.5 py-1 text-canvas shadow-sm border border-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest font-medium">
            Before
          </span>
        </div>

        <div className="pointer-events-none absolute right-3 top-3 z-10 flex items-center space-x-1.5 rounded-sm bg-brand-dark/90 backdrop-blur-md px-2.5 py-1 text-canvas shadow-sm border border-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          <span className="font-mono text-[10px] uppercase tracking-widest font-medium">
            After
          </span>
        </div>

        {/* Interaction Prompt Hint */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-10 rounded-full bg-canvas/80 backdrop-blur-sm px-3 py-1 text-ink shadow-sm border border-line opacity-80 transition-opacity group-hover:opacity-100">
          <span className="font-mono text-[10px] uppercase tracking-wider text-stone">
            {isDragging ? `${Math.round(position)}% Revealed` : 'Drag or use arrow keys'}
          </span>
        </div>
      </div>

      {/* Footer Meta & Legend */}
      <footer className="mt-4 flex flex-wrap items-center justify-between text-xs text-stone border-t border-line/60 pt-3">
        <span className="font-mono text-[11px]">
          Compare State: <strong className="text-ink">{Math.round(position)}% Before</strong> / <strong className="text-ink">{100 - Math.round(position)}% After</strong>
        </span>
        <span className="font-display italic text-stone">
          Crafted with care & precision
        </span>
      </footer>
    </figure>
  )
}