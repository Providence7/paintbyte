import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink text-canvas font-body overflow-hidden">
      
      <div className="mx-auto max-w-6xl px-6 pt-5 pb-8">
        
        {/* Top Adage Banner */}
    

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          
          {/* Brand Identity & Visual Card */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block font-display text-2xl font-normal tracking-tight text-canvas">
              Paint<span className="text-brand">byte</span>
            </Link>
            
            <p className="max-w-sm font-body text-sm text-canvas/70 leading-relaxed">
              A professional painting company for interior, exterior, and commercial work—with every finished job kept as proof.
            </p>

            {/* Visual Micro Snapshot Grid */}
            <div className="pt-2 flex items-center space-x-3">
              <div className="relative group overflow-hidden rounded-sm border border-canvas/20 h-12 w-16 bg-canvas/10">
                <img 
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=200" 
                  alt="Finish detail" 
                  className="h-full w-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="relative group overflow-hidden rounded-sm border border-canvas/20 h-12 w-16 bg-canvas/10">
                <img 
                  src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=200" 
                  alt="Pigment test" 
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
                <Link to="/portfolio" className="inline-flex items-center space-x-1.5 transition-colors hover:text-brand-tint">
                  <span>Portfolio</span>
                  <span className="text-xs opacity-50">↗</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="inline-flex items-center space-x-1.5 transition-colors hover:text-brand-tint">
                  <span>Get an estimate</span>
                  <span className="text-xs opacity-50">↗</span>
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
                <span className="text-brand-tint" role="img" aria-label="Email">✉️</span>
                <a href="mailto:hello@paintbyte.com" className="hover:text-canvas transition-colors">
                  hello@paintbyte.com
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-brand-tint" role="img" aria-label="Phone">📞</span>
                <a href="tel:+2340000000000" className="hover:text-canvas transition-colors">
                  +234 000 000 0000
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
          <p>© {new Date().getFullYear()} Paintbyte. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Interior & Exterior</span>
            <span>•</span>
            <span>Commercial Finishes</span>
          </div>
        </div>

      </div>
    </footer>
  )
}