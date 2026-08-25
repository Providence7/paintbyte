import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import crewImage from '../assest/img.jpeg' // Adjust relative path as needed
import crewImage1 from '../assest/img1.jpeg' // Adjust relative path as needed
import crewImage2 from '../assest/img2.jpeg' // Adjust relative path as needed

export default function Hero({ projectCount }) {
  const slides = [
    {
      url: crewImage,
      alt: 'PaintByte professional painting crew on-site preparing residential walls',
      badge: 'Professional Crew'
    },
    {
      url: crewImage1,
      alt: 'PaintByte painters applying premium coats with precision',
      badge: 'Expert Craftsmanship'
    },
    {
      url: crewImage2,
      alt: 'PaintByte team completing a commercial interior painting project',
      badge: 'Quality Execution'
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

  // AggregateRating Schema for Google Search Results Stars
  const heroSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'PaintByte',
    'image': crewImage,
    'telephone': '+2348065704348',
    'priceRange': '$$',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '124',
      'bestRating': '5',
      'worstRating': '1'
    }
  }

  return (
    <section className="relative min-h-[55vh] flex items-center overflow-hidden border-b border-white/10 bg-slate-950 text-white font-body">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(heroSchema)}
        </script>
      </Helmet>

      {/* Background Image Slider Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={slides[currentIndex].url}
            alt={slides[currentIndex].alt}
            title={slides[currentIndex].badge}
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            /* 
              KEY FIX FOR MOBILE ZOOM: 
              - object-[center_20%] positions the view higher up on mobile screens so people/crews aren't cut off.
              - sm:object-center reverts to standard center alignment on larger devices.
            */
            className="absolute inset-0 h-full w-full object-cover object-[center_20%] sm:object-center"
          />
        </AnimatePresence>

        {/* Dark Gradient Overlay for High Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
        {/* Ambient Radial Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.15),transparent_50%)]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05]" />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-4 sm:py-8 lg:py-12 w-full">
        <div className="max-w-2xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Dynamic Slide Badge */}
            <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/10 backdrop-blur-md px-3.5
             py-1.5 text-xs font-mono font-bold uppercase text-emerald-400 border border-emerald-500/20 shadow-sm">
              <span>{slides[currentIndex].badge}</span>
            </div>

            {/* Main SEO Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-white">
              Transforming walls with{' '}
              <span className="italic font-light text-slate-300 block sm:inline mt-1 sm:mt-0">
                unmatched precision.
              </span>
            </h1>

            {/* Narrative */}
            <p className="font-body text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Seamless execution and zero mess. We give your home or office the flawless, professional finish it deserves—from meticulous surface preparation to durable, clean topcoats.
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/studio"
                className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3.5 font-mono text-xs 
                font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-500 hover:shadow-emerald-600/40 
                focus:outline-none focus:ring-2 focus:ring-emerald-500 transform hover:-translate-y-0.5"
              >
                <span>🎨 Design A Space</span>
                <span className="ml-2 text-base" aria-hidden="true">→</span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3.5 font-mono text-xs 
                font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-white/20 hover:border-white/40"
              >
                Request Quote
              </Link>
            </div>



          </motion.div>
        </div>
      </div>
    </section>
  )
}