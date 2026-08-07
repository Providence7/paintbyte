import { motion } from 'framer-motion'

// Custom SVG Icons tailored to each step of the painting workflow
const STEP_ICONS = [
  // 1. Consult: Clipboard / Estimate
  <svg key="consult" className="h-5 w-5 stroke-brand group-hover:stroke-brand-dark transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M9 12h6" />
    <path d="M9 16h4" />
  </svg>,
  
  // 2. Prep: Tape / Sanding / Surface prep
  <svg key="prep" className="h-5 w-5 stroke-amber group-hover:stroke-amber-dark transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" />
    <line x1="12" y1="22" x2="12" y2="12" />
  </svg>,

  // 3. Paint: Paint Roller
  <svg key="paint" className="h-5 w-5 stroke-indigo group-hover:stroke-indigo-dark transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="6" rx="1" />
    <path d="M18 9v3a2 2 0 0 1-2 2H8a2 2 0 0 0-2 2v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4" />
  </svg>,

  // 4. Walkthrough: Inspection / Checkmark Badge
  <svg key="walkthrough" className="h-5 w-5 stroke-coral group-hover:stroke-coral-dark transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>,
]

const STEPS = [
  {
    step: 'Consult',
    tagline: 'Walkthrough & Estimate',
    description: 'We walk the space with you, talk through colors and finishes, and give a clear written estimate.',
    accentColor: 'border-brand/40 group-hover:border-brand',
    badgeBg: 'bg-brand/10 text-brand',
  },
  {
    step: 'Prep',
    tagline: 'Masking & Surface Work',
    description: 'Surfaces are cleaned, patched, sanded, and taped before a single drop of paint goes on.',
    accentColor: 'border-amber/40 group-hover:border-amber',
    badgeBg: 'bg-amber/10 text-amber-dark',
  },
  {
    step: 'Paint',
    tagline: 'Two-Coat Application',
    description: 'Two full coats, applied cleanly, with daily site cleanup so your space stays functional and liveable.',
    accentColor: 'border-indigo/40 group-hover:border-indigo',
    badgeBg: 'bg-indigo/10 text-indigo',
  },
  {
    step: 'Walkthrough',
    tagline: 'Final Inspection',
    description: 'We inspect every wall and trim surface with you and touch up any detail before calling it done.',
    accentColor: 'border-coral/40 group-hover:border-coral',
    badgeBg: 'bg-coral/10 text-coral-dark',
  },
]

export default function Process() {
  return (
    <section className="border-b border-line bg-canvas text-ink py-10 font-body">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Tag & Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
           

            <h2 className="mt-3 max-w-xl font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              Four steps, same order, every single time.
            </h2>
          </div>

          <p className="max-w-xs font-mono text-xs text-stone leading-relaxed">
            [ PREDICTABLE WORKFLOW ]<br />
            No surprises, no rushed surface work, no loose ends.
          </p>
        </div>

        {/* Timeline Steps Grid */}
        <ol className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
          
          {/* Connecting Line (Desktop) */}
          <div 
            className="hidden lg:block absolute top-[42px] left-[10%] right-[10%] h-[2px] bg-line/80 z-0" 
            aria-hidden="true" 
          />

          {STEPS.map((item, i) => (
            <motion.li
              key={item.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative z-10 flex flex-col justify-between rounded-sm border ${item.accentColor} bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
            >
              <div>
                {/* Header: Step Number Pill & SVG Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-sm font-mono text-xs font-bold ${item.badgeBg}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-canvas/80 border border-line/60">
                      {STEP_ICONS[i]}
                    </div>
                  </div>

                  <span className="font-mono text-[10px] font-semibold tracking-wider text-stone/40 uppercase group-hover:text-ink transition-colors">
                    Phase 0{i + 1}
                  </span>
                </div>

                {/* Step Title & Sub-tagline */}
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink group-hover:text-brand transition-colors">
                  {item.step}
                </h3>
                
                <p className="font-mono text-[11px] font-medium text-stone/70 tracking-tight mt-0.5">
                  {item.tagline}
                </p>

                {/* Step Description */}
                <p className="mt-3 font-body text-sm leading-relaxed text-stone">
                  {item.description}
                </p>
              </div>

              {/* Bottom Step Progression Indicator */}
              <div className="mt-8 pt-3 border-t border-line/50 flex items-center justify-between font-mono text-[10px]">
                <span className="text-stone/60 uppercase tracking-wider">
                  {i < STEPS.length - 1 ? `Next: Step 0${i + 2}` : 'Completion'}
                </span>
                
                <span className="flex items-center space-x-1 text-brand font-semibold">
                  <span>{i < STEPS.length - 1 ? '→' : 'DONE'}</span>
                </span>
              </div>
            </motion.li>
          ))}
        </ol>

      </div>
    </section>
  )
}