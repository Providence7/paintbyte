import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Inline SVG icons
const SERVICE_ICONS = {
  'PB-02.1': (
    <svg className="h-5 w-5 stroke-brand" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
      <path d="M3 21h18" />
      <path d="M9 7h1" /><path d="M9 11h1" /><path d="M14 7h1" /><path d="M14 11h1" />
    </svg>
  ),
  'PB-02.2': (
    <svg className="h-5 w-5 stroke-brand" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'PB-02.3': (
    <svg className="h-5 w-5 stroke-brand" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  'PB-02.4': (
    <svg className="h-5 w-5 stroke-brand" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.72 1.7-1.63 0-.41-.15-.78-.41-1.07-.27-.29-.42-.68-.42-1.08 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.97-4.48-9-10-9z" />
    </svg>
  ),
}

const SERVICES = [
  {
    code: 'PB-02.1',
    title: 'Interior painting',
    accentColor: 'bg-brand',
    description:
      'Walls, ceilings, trim, and cabinetry prepped and finished to a clean, even coat.',
    tags: ['Walls & Ceilings', 'Cabinets', 'Trim & Doors'],
  },
  {
    code: 'PB-02.2',
    title: 'Exterior painting',
    accentColor: 'bg-amber',
    description:
      'Siding, stucco, fences, and railings painted to withstand harsh weather.',
    tags: ['Weatherproof Coats', 'Siding & Stucco', 'Decking & Gates'],
  },
  {
    code: 'PB-02.3',
    title: 'Commercial projects',
    accentColor: 'bg-indigo',
    description:
      'Offices and retail spaces scheduled around your business hours.',
    tags: ['Offices & Retail', 'After-Hours', 'High-Durability'],
  },
  {
    code: 'PB-02.4',
    title: 'Color consultation',
    accentColor: 'bg-coral',
    description:
      'Expert advice matching colors and finishes tailored to your space.',
    tags: ['Color Matching', 'Finish Selection', 'Sample Testing'],
  },
]

export default function Services() {
  return (
    <section className="border-b border-line bg-canvas text-ink font-body py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-brand-dark">
                Services
              </span>
            </div>
            <h2 className="mt-1 font-display text-2xl font-normal tracking-tight sm:text-3xl">
              What we take on
            </h2>
          </div>

          <p className="max-w-md font-body text-xs sm:text-sm text-stone leading-relaxed">
            Every job starts with proper surface prep and ends with a thorough cleanup.
          </p>
        </div>

        {/* Compact Services Grid */}
        <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.code}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative flex flex-col justify-between bg-canvas p-5 transition-all duration-300 hover:bg-white hover:shadow-sm"
            >
              {/* Accent Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${service.accentColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              <div>
                {/* Header Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand-tint/60 transition-colors group-hover:bg-brand-tint">
                      {SERVICE_ICONS[service.code]}
                    </div>
                    <span className="font-mono text-[10px] font-semibold tracking-widest text-brand">
                      {service.code}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] font-bold text-stone/40 transition-colors group-hover:text-amber">
                    0{i + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-ink group-hover:text-brand transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-1 font-body text-xs leading-relaxed text-stone">
                  {service.description}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-4 pt-3 border-t border-line/60 flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm bg-line/30 border border-line/50 px-2 py-0.5 font-mono text-[9px] font-medium text-ink/80 transition-colors group-hover:border-brand/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Streamlined Bottom Banner */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between rounded-sm border border-line bg-brand-tint/20 px-4 py-3 shadow-sm gap-3">
          <div className="flex items-center space-x-2">
            <div className="h-1.5 w-1.5 rounded-full bg-amber shrink-0" />
            <span className="font-body text-xs text-ink font-medium">
              Need custom wall prep? We inspect walls in person.
            </span>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-sm bg-brand px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-canvas transition-all hover:bg-brand-dark shrink-0"
          >
            <span>Get an Estimate</span>
            <span className="ml-1.5">→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}