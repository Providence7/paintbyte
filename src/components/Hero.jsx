import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero({ projectCount }) {
  // Unsplash image links
  const image1 =
    'https://images.unsplash.com/photo-1742900280861-32bed068938b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  
  const image2 =
    'https://images.unsplash.com/photo-1523198780259-41f275ab6e3d?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas text-ink font-body">
      
      {/* Background Grid Accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#14181A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-12 md:grid-cols-12 md:py-20 lg:py-24">
        
        {/* Left Column — E-Commerce Styled Headline & Value Props */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-6 lg:col-span-6 z-10 space-y-6"
        >
          {/* Studio Distinction Tag */}
        

          {/* Bold E-Com Style Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-ink">
            Craftsmanship in every coat.{' '}
            <span className="italic font-light text-stone block mt-1">
              Precision in every detail.
            </span>
          </h1>

          {/* Narrative / Value Proposition */}
          <p className="font-body text-sm italic sm:text-lg text-stone leading-relaxed mx-10 max-w-xl">
            High-specification surface coatings for residential and commercial spaces. Engineered for durability, finished by hand, and backed by recorded proof.
          </p>

          {/* SPLIT CALL TO ACTION (Dominant Primary + Subdued Secondary Link) */}
          <div className="pt-2 flex flex-wrap items-center gap-6">
            {/* Primary Action — Main Button */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-sm bg-brand px-5 py-3 font-mono text-xs 
              font-semibold uppercase tracking-wider text-canvas shadow-md transition-all hover:bg-brand-dark hover:shadow-lg 
              focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <span>Request Consultation</span>
              <span className="ml-2 text-base">→</span>
            </Link>

            {/* Secondary Action — Subtle Inline Link (Not a full equal button) */}
            <Link
              to="/portfolio"
              className="group inline-flex items-center space-x-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-brand"
            >
              <span className="border-b border-ink/40 pb-0.5 group-hover:border-brand">
                Explore Works
              </span>
              <span className="text-stone transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand">
                ↗
              </span>
            </Link>
          </div>

          {/* Live Trust Bar */}
          <div className="pt-4 border-t border-line/60 flex items-center justify-between font-mono text-xs text-stone">
            <div className="flex items-center space-x-2">
              <span className="text-amber font-bold">★ 4.9/5</span>
              <span>•</span>
              <span><strong className="text-ink font-bold">{projectCount || '100+'}</strong> Projects Completed</span>
            </div>
            <span className="hidden sm:inline font-semibold text-brand-dark uppercase">Grade A Finish</span>
          </div>
        </motion.div>

        {/* Right Column — Bold E-Commerce Showcase Framing */}
        <div className="md:col-span-6 lg:col-span-6 relative flex items-center justify-center pt-4 md:pt-0">
          
          {/* Glow Backdrop */}
          <div className="absolute -inset-2 rounded-3xl bg-brand/10 blur-2xl pointer-events-none" />

          {/* Main Visual Display Frame */}
          <div className="relative w-full max-w-lg">
            
            {/* Primary Hero Photo (Image 1) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-lg border-2 border-line bg-white p-2 sm:p-3 shadow-2xl overflow-hidden group"
            >
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-md bg-ink/5">
                <img
                  src={image1}
                  alt="Master craftsman at work"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Contrast Gradient for Typography Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className="inline-flex items-center space-x-1.5 rounded bg-ink/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] uppercase font-bold text-amber border border-white/10 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
                    <span>Active Studio Spec</span>
                  </span>
                </div>

                {/* Bottom Image Details */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-canvas">
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-brand-tint">
                      FEATURED APPLICATOR
                    </span>
                    <p className="font-display text-lg sm:text-xl font-medium tracking-wide">
                      Master Surface Finish
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-amber">
                    VOL. 2026
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Secondary Overlapping E-Com Feature Card (Image 2) */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 -right-2 sm:-right-6 z-20 w-[60%] sm:w-[55%] rounded-lg border-2 border-line bg-white p-2 shadow-2xl transition-transform hover:scale-105"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-ink/5">
                <img
                  src={image2}
                  alt="Surface preparation materials"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/20" />
                
                <div className="absolute top-2 left-2">
                  <span className="rounded bg-brand px-1.5 py-0.5 font-mono text-[8px] uppercase font-bold text-canvas">
                    Substrate
                  </span>
                </div>
              </div>

              {/* Product Spec Micro Label */}
              <div className="mt-2 px-1 flex items-center justify-between font-mono text-[10px] text-stone">
                <span className="font-semibold text-ink uppercase">Prep Standard</span>
                <span className="text-brand font-bold">100% Quality</span>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}