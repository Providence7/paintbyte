import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote:
      'They matched the exterior color exactly to what we picked and finished two days ahead of schedule.',
    name: 'Amaka O.',
    context: 'Exterior repaint, Ibadan',
    rating: 5,
  },
  {
    quote:
      'Clean lines on every edge, no drips on the floor tiles, and they covered every piece of furniture themselves.',
    name: 'Tunde B.',
    context: 'Interior repaint, Lagos',
    rating: 5,
  },
  {
    quote:
      'We needed the office painted over a weekend so it wouldn’t affect staff. They planned around it without being asked.',
    name: 'Grace E.',
    context: 'Commercial project, Ibadan',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="border-b border-line bg-brand-tint/30 text-ink font-body py-20">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            
            <h2 className="mt-3 max-w-lg font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              What it's like to work with us
            </h2>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs text-stone">
            <span className="text-amber">★★★★★</span>
            <span>Verified Client Feedback</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col justify-between rounded-sm border border-line/80 bg-canvas p-6 shadow-sm transition-all duration-300 hover:border-brand/60"
            >
              <div>
                {/* Rating & Decorative Quote */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber text-xs space-x-0.5">
                    {'★'.repeat(t.rating || 5)}
                  </div>
                  <span className="font-display text-3xl text-line select-none">“</span>
                </div>

                {/* Quote Body */}
                <blockquote className="mt-2 font-display text-base sm:text-lg leading-relaxed text-ink/90">
                  “{t.quote}”
                </blockquote>
              </div>

              {/* Client Info Footer */}
              <figcaption className="mt-6 pt-4 border-t border-line/50 flex items-center justify-between">
                <div>
                  <div className="font-display font-semibold text-sm text-ink">
                    {t.name}
                  </div>
                  <div className="font-mono text-[11px] text-stone mt-0.5">
                    {t.context}
                  </div>
                </div>

                {/* Avatar Initials */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-tint font-mono text-xs font-bold text-brand-dark border border-brand/20">
                  {t.name.slice(0, 2)}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

      </div>
    </section>
  )
}