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

      {/* Reduced Top Padding: pt-4 md:pt-6 */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center px-6 pt-4 pb-12 md:pt-6 md:pb-16 md:grid-cols-12 gap-8">
        
        {/* Left Column — High-Converting Headline & Studio Callouts */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-6 lg:col-span-6 z-10 space-y-4"
        >
          {/* Interactive Feature Badge */}
      {/* Title */}
<h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-ink">
  Transforming walls with{' '}
  <span className="italic font-light text-stone block mt-1">
    unmatched precision.
  </span>
</h1>

{/* Narrative */}
<p className="font-body text-base sm:text-lg text-stone leading-relaxed max-w-xl">
  High-quality paint, seamless execution, and zero mess. We give your home or office the flawless, professional look it deserves.
</p>
          {/* CONVERTING ACTION BUTTONS */}
          <div className="pt-1 flex flex-wrap items-center gap-4">
            {/* Primary Action — Launch 3D Studio */}
            <Link
              to="/studio"
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 font-mono text-xs 
              font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-xl 
              focus:outline-none focus:ring-2 focus:ring-emerald-500 transform hover:-translate-y-0.5"
            >
              <span>🎨 Design A space </span>
              <span className="ml-2 text-base">→</span>
            </Link>

            {/* Secondary Action — Request Quote */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md border border-line bg-white px-5 py-3 font-mono text-xs 
              font-semibold uppercase tracking-wider text-ink shadow-sm transition-all hover:bg-canvas-subtle hover:border-ink/20"
            >
              Request Quote
            </Link>
          </div>

          {/* Live Trust Bar */}
          <div className="pt-3 border-t border-line/60 flex items-center justify-between font-mono text-xs text-stone">
            <div className="flex items-center space-x-2">
              <span className="text-amber font-bold">★ 4.9/5</span>
              <span>•</span>
              <span><strong className="text-ink font-bold">{projectCount || '100+'}</strong> Projects Painted</span>
            </div>
            <span className="hidden sm:inline font-semibold text-brand-dark uppercase">Guaranteed Finish</span>
          </div>
        </motion.div>

        {/* Right Column — Visual Feature Card */}
        <div className="md:col-span-6 lg:col-span-6 relative flex items-center justify-center">
          
          {/* Glow Backdrop */}
          <div className="absolute -inset-2 rounded-3xl bg-emerald-500/10 blur-2xl pointer-events-none" />

          {/* Main Visual Display Frame */}
          <div className="relative w-full max-w-lg">
            
            {/* Primary Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-lg border-2 border-line bg-white p-2 sm:p-3 shadow-2xl overflow-hidden group"
            >
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-md bg-ink/5">
                <img
                  src={image1}
                  alt="Master painter applying precision surface coating"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Contrast Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className="inline-flex items-center space-x-1.5 rounded bg-slate-900/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] uppercase font-bold text-emerald-400 border border-white/10 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>3D Color Matching</span>
                  </span>
                </div>

                {/* Bottom Card Copy */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-canvas">
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                      VIRTUAL STUDIO READY
                    </span>
                    <p className="font-display text-lg sm:text-xl font-medium tracking-wide">
                      Instant Color Previews
                    </p>
                  </div>
                  <Link 
                    to="/studio"
                    className="font-mono text-xs font-bold text-amber hover:underline"
                  >
                    TEST SHADES ↗
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Overlapping Spec Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 -right-2 sm:-right-6 z-20 w-[60%] sm:w-[55%] rounded-lg border-2 border-line bg-white p-2 shadow-2xl transition-transform hover:scale-105"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-ink/5">
                <img
                  src={image2}
                  alt="Surface preparation materials and finish palette"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/20" />
                
                <div className="absolute top-2 left-2">
                  <span className="rounded bg-emerald-600 px-1.5 py-0.5 font-mono text-[8px] uppercase font-bold text-white">
                    Nigeria Codes
                  </span>
                </div>
              </div>

              {/* Product Spec Micro Label */}
              <div className="mt-2 px-1 flex items-center justify-between font-mono text-[10px] text-stone">
                <span className="font-semibold text-ink uppercase">Paint Specs</span>
                <span className="text-emerald-600 font-bold">100% Match</span>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}