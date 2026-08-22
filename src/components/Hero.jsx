import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import crewImage from '../assest/img.jpeg' // Adjust relative path as needed
import crewImage1 from '../assest/img1.jpeg' // Adjust relative path as needed
import crewImage2 from '../assest/img2.jpeg' // Adjust relative path as needed

export default function Hero({ projectCount }) {
  // Background images array with your crew image as the first slide
const slides = [
   {
      url: crewImage,
      alt: 'PaintByte crew walking toward residential painting site',
      badge: 'Professional Crew'
    },
    {
      url: crewImage1,
      alt: 'PaintByte crew walking toward residential painting site',
      badge: 'Professional Crew'
    },
    {
      url: crewImage2,
      alt: 'PaintByte crew walking toward residential painting site',
      badge: 'Professional Crew'
    }
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-advance every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-white/10 bg-slate-950 text-white font-body">
      
      {/* Background Image Slider Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={slides[currentIndex].url}
            alt={slides[currentIndex].alt}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Dark Gradient Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
        {/* Ambient Radial Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.15),transparent_50%)]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05]" />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32 w-full">
        <div className="max-w-2xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Dynamic Slide Badge */}
            <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono font-bold uppercase text-emerald-400 border border-emerald-500/20 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{slides[currentIndex].badge}</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-white">
              Transforming walls with{' '}
              <span className="italic font-light text-slate-300 block sm:inline mt-1 sm:mt-0">
                unmatched precision.
              </span>
            </h1>

            {/* Narrative */}
            <p className="font-body text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Seamless execution, and zero mess, We give your home or office the flawless,
              professional look it deserves. From detailed surface preparation to clean, 
              durable coats.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/studio"
                className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3.5 font-mono text-xs 
                font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-500 hover:shadow-emerald-600/40 
                focus:outline-none focus:ring-2 focus:ring-emerald-500 transform hover:-translate-y-0.5"
              >
                <span>🎨 Design A Space</span>
                <span className="ml-2 text-base">→</span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3.5 font-mono text-xs 
                font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-white/20 hover:border-white/40"
              >
                Request Quote
              </Link>
            </div>

            {/* Trust Bar */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between font-mono text-xs text-slate-400 gap-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-amber-400 font-bold">★ 4.9/5</span>
                <span>•</span>
                <span><strong className="text-white font-bold">{projectCount || '100+'}</strong> Projects Painted</span>
              </div>

              {/* Slider Navigation Dots */}
              <div className="flex items-center space-x-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-6 bg-emerald-400' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}