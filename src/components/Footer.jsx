import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function Footer() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'PaintingContractor',
    'name': 'PaintByte',
    'url': 'https://paintbyte.com',
    'logo': 'https://paintbyte.com/logo.png',
    'image': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    'description': 'Professional painting contractors specializing in interior, exterior, commercial, and government facility refinishing.',
    'telephone': '+2348065704348',
    'email': 'hello@paintbyte.com',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Ibadan',
      'addressRegion': 'Oyo State',
      'addressCountry': 'NG'
    },
    'openingHours': 'Mo-Sa 08:00-18:00',
    'priceRange': '$$'
  }

  return (
    <footer className="relative border-t border-line bg-ink text-canvas font-body overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <div className="mx-auto max-w-6xl px-6 pt-10 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          
          {/* Brand Identity & Visual Card */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block font-display text-2xl font-normal tracking-tight text-canvas">
              Paint<span className="text-brand">byte</span>
            </Link>
            
            <p className="max-w-sm font-body text-sm text-canvas/70 leading-relaxed">
              Professional painting contractors specializing in interior, exterior, and commercial finishes—delivering precision wall preparation and long-lasting coating solutions.
            </p>

            {/* Visual Micro Snapshot Grid */}
            <div className="pt-2 flex items-center space-x-3">
              <div className="relative group overflow-hidden rounded-sm border border-canvas/20 h-12 w-16 bg-canvas/10">
                <img 
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=200" 
                  alt="Precision wall painting finish detail" 
                  title="PaintByte Wall Preparation Quality"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="relative group overflow-hidden rounded-sm border border-canvas/20 h-12 w-16 bg-canvas/10">
                <img 
                  src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=200" 
                  alt="Color matching and pigment testing" 
                  title="PaintByte Color Matching"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="font-mono text-[10px] text-canvas/40 leading-tight">
                <span>Precision Color</span><br />
                <span>& Surface Prep</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="block font-mono text-xs uppercase tracking-widest text-canvas/40">
              Company
            </span>
            <ul className="space-y-2.5 font-body text-sm text-canvas/80">
              <li>
                <Link to="/studio" className="inline-flex items-center space-x-1.5 transition-colors hover:text-brand-tint">
                  <span>Design your space</span>
                  <span className="text-xs opacity-50" aria-hidden="true">↗</span>
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="inline-flex items-center space-x-1.5 transition-colors hover:text-brand-tint">
                  <span>Portfolio</span>
                  <span className="text-xs opacity-50" aria-hidden="true">↗</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="inline-flex items-center space-x-1.5 transition-colors hover:text-brand-tint">
                  <span>Get an estimate</span>
                  <span className="text-xs opacity-50" aria-hidden="true">↗</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <span className="block font-mono text-xs uppercase tracking-widest text-canvas/40">
              Direct Contact
            </span>
            <ul className="space-y-3 font-body text-sm text-canvas/80">
              <li className="flex items-center space-x-2.5">
                <span className="text-brand-tint" role="img" aria-label="Email Icon">✉️</span>
                <a href="mailto:hello@paintbyte.com" className="hover:text-canvas transition-colors">
                  hello@paintbyte.com
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-brand-tint" role="img" aria-label="Phone Icon">📞</span>
                <a href="tel:+2348065704348" className="hover:text-canvas transition-colors">
                  +234 806 570 4348
                </a>
              </li>
              <li className="pt-2 font-mono text-xs text-canvas/50 flex items-center space-x-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                <span>Operating Monday through Saturday</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Metadata Rules */}
        <div className="mt-14 pt-6 border-t border-canvas/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-canvas/40">
          <p>© {new Date().getFullYear()} PaintByte. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Interior & Exterior Painting</span>
            <span>•</span>
            <span>Commercial Finishes</span>
          </div>
        </div>

      </div>
    </footer>
  )
}