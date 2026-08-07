import ContactForm from '../components/ContactForm.jsx'

export default function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-6 sm:py-20 font-body text-ink">
      
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-start">
        
        {/* Left Column: Information & Direct Contact */}
        <div>
          {/* Section Indicator */}
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-amber" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-dark">
            Get in touch
            </span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
            Tell us about the job
          </h1>

          <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-stone">
            Share a few details and we'll get back to you with next steps —
            usually within one business day. For urgent jobs, feel free to call or WhatsApp us directly.
          </p>
  <div className="rounded-sm border border-line bg-canvas p-6 sm:p-8 shadow-sm">
          <ContactForm />
        </div>

          {/* Contact Information List */}
          <dl className="mt-4 divide-y divide-line/60 border-t border-b border-line/60">
            {/* Phone */}
            <div className="py-1 flex items-start justify-between">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-stone">
                  Phone / WhatsApp
                </dt>
                <dd className="mt-1 font-display font-medium text-base text-ink">
                  <a 
                    href="tel:+2340000000000" 
                    className="hover:text-brand transition-colors"
                  >
                    +234 000 000 0000
                  </a>
                </dd>
              </div>
              <span className="text-amber font-mono text-xs">📞</span>
            </div>

            {/* Email */}
            <div className="py-1 flex items-start justify-between">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-stone">
                  Email
                </dt>
                <dd className="mt-1 font-display font-medium text-base text-ink">
                  <a 
                    href="mailto:hello@paintbyte.com" 
                    className="hover:text-brand transition-colors"
                  >
                    hello@paintbyte.com
                  </a>
                </dd>
              </div>
              <span className="text-amber font-mono text-xs">✉️</span>
            </div>

            {/* Service Area */}
            <div className="py-1 flex items-start justify-between">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-stone">
                  Service Area
                </dt>
                <dd className="mt-1 font-body text-sm text-ink">
                  Akobo ibadan , oyo state & beyond
                </dd>
              </div>
              <span className="text-amber font-mono text-xs">📍</span>
            </div>

            {/* Hours */}
            <div className="py-1 flex items-start justify-between">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-stone">
                  Working Hours
                </dt>
                <dd className="mt-1 font-body text-sm text-stone">
                  Monday – Saturday: 8:00 AM – 6:00 PM
                </dd>
              </div>
              <span className="text-amber font-mono text-xs">🕒</span>
            </div>
          </dl>
        </div>

        {/* Right Column: Contact Form */}
      
      </div>
    </section>
  )
}