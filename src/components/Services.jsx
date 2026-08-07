import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Inline SVG icons for visual anchoring (No external image files needed)
const SERVICE_ICONS = {
  'PB-02.1': (
    <svg className="h-6 w-6 stroke-brand" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
      <path d="M3 21h18" />
      <path d="M9 7h1" /><path d="M9 11h1" /><path d="M14 7h1" /><path d="M14 11h1" />
    </svg>
  ),
  'PB-02.2': (
    <svg className="h-6 w-6 stroke-brand" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'PB-02.3': (
    <svg className="h-6 w-6 stroke-brand" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  'PB-02.4': (
    <svg className="h-6 w-6 stroke-brand" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      'Walls, ceilings, trim, and cabinetry — prepped and finished to a clean, even coat.',
    tags: ['Walls & Ceilings', 'Cabinets', 'Trim & Doors'],
  },
  {
    code: 'PB-02.2',
    title: 'Exterior painting',
    accentColor: 'bg-amber',
    description:
      'Siding, stucco, fences, and railings, painted to hold up against weather and sun.',
    tags: ['Weatherproof Coats', 'Siding & Stucco', 'Decking & Gates'],
  },
  {
    code: 'PB-02.3',
    title: 'Commercial projects',
    accentColor: 'bg-indigo',
    description:
      'Offices, retail spaces, and multi-unit buildings, scheduled around your operating hours.',
    tags: ['Offices & Retail', 'After-Hours Scheduling', 'High-Durability Paint'],
  },
  {
    code: 'PB-02.4',
    title: 'Color consultation',
    accentColor: 'bg-coral',
    description:
      'Help choosing colors and finishes that suit the space and the light it gets.',
    tags: ['Color Matching', 'Finish Selection', 'Sample Testing'],
  },
]

export default function Services() {
  return (
    <section className="border-b border-line bg-canvas text-ink font-body py-10">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-dark">
                Services
              </span>
            </div>
            <h2 className="mt-3 max-w-lg font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              What we take on
            </h2>
          </div>

          <p className="max-w-md font-body text-sm text-stone leading-relaxed">
            Every job starts with proper surface prep and ends with a thorough cleanup. Here is how we help refresh your home or building.
          </p>
        </div>

        {/* Services Grid with Border Dividers */}
        <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col justify-between bg-canvas p-8 transition-all duration-300 hover:bg-white hover:shadow-md"
            >
              {/* Top Accent Swatch Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${service.accentColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              <div>
                {/* Header Info with Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-tint/60 transition-colors group-hover:bg-brand-tint">
                      {SERVICE_ICONS[service.code]}
                    </div>
                    <span className="font-mono text-xs font-semibold tracking-widest text-brand">
                      {service.code}
                    </span>
                  </div>

                  <span className="font-mono text-xs font-bold text-stone/30 transition-colors group-hover:text-amber">
                    0{i + 1}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink group-hover:text-brand transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 font-body text-sm leading-relaxed text-stone">
                  {service.description}
                </p>
              </div>

              {/* Service Feature Tags */}
              <div className="mt-8 pt-4 border-t border-line/60 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm bg-line/30 border border-line/50 px-2.5 py-1 font-mono text-[10px] font-medium text-ink/80 transition-colors group-hover:border-brand/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Estimate Link Bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between rounded-sm border border-line bg-brand-tint/20 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div className="h-2 w-2 rounded-full bg-amber" />
            <span className="font-body text-sm text-ink font-medium">
              Need something specific or custom wall prep? We can inspect your walls in person.
            </span>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-sm bg-brand px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-canvas shadow-sm transition-all hover:bg-brand-dark hover:translate-x-0.5"
          >
            <span>Get an Estimate</span>
            <span className="ml-2 font-body">→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}