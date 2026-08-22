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
    <section 
      aria-labelledby="testimonials-heading"
      className="border-b border-line bg-brand-tint/30 text-ink font-body py-20"
      itemScope 
      itemType="https://schema.org/LocalBusiness"
    >
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 id="testimonials-heading" className="mt-3 max-w-lg font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              What it's like to work with us
            </h2>
          </div>

          {/* Google Verified Header Badge */}
          <div className="flex items-center space-x-2 rounded-full border border-line bg-canvas px-3 py-1.5 shadow-sm">
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="font-mono text-xs text-stone">5.0 Star Google Reviews</span>
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
              itemProp="review"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div>
                {/* Rating & Google Verified Icon */}
                <div className="flex items-center justify-between">
                  <div 
                    className="flex text-amber text-xs space-x-0.5"
                    itemProp="reviewRating"
                    itemScope
                    itemType="https://schema.org/Rating"
                  >
                    <meta itemProp="ratingValue" content={t.rating.toString()} />
                    {'★'.repeat(t.rating || 5)}
                  </div>
                  
                  {/* Mini Google Verified Icon */}
                  <div className="flex items-center space-x-1 font-mono text-[10px] text-stone/80">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Verified</span>
                  </div>
                </div>

                {/* Quote Body */}
                <blockquote className="mt-4 font-display text-base sm:text-lg leading-relaxed text-ink/90" itemProp="reviewBody">
                  “{t.quote}”
                </blockquote>
              </div>

              {/* Client Info Footer */}
              <figcaption className="mt-6 pt-4 border-t border-line/50 flex items-center justify-between">
                <div>
                  <div className="font-display font-semibold text-sm text-ink" itemProp="author">
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