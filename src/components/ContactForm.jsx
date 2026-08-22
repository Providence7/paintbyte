import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import apiClient from '../api/client.js'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  serviceType: 'Interior',
  message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await apiClient.post('/messages', form)
      setStatus('sent')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
    }
  }

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'PaintByte Contact & Estimate Request',
    'description': 'Request an estimate or submit a formal RFP/tender for residential, commercial, and government painting projects.',
    'mainEntity': {
      '@type': 'ContactPoint',
      'telephone': '+2348065704348',
      'contactType': 'customer service',
      'areaServed': ['NG'],
      'availableLanguage': ['English']
    }
  }

  if (status === 'sent') {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-sm border border-brand/30 bg-brand-tint/60 p-8 sm:p-12 text-ink shadow-sm animate-fadeUp">
        <Helmet>
          <title>Estimate Request Received | PaintByte</title>
          <script type="application/ld+json">
            {JSON.stringify(contactSchema)}
          </script>
        </Helmet>
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-canvas shadow-sm">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-dark">
            CORRESPONDENCE RECEIVED
          </span>
        </div>

        <h3 className="font-display text-3xl font-normal text-brand-dark">
          Estimate or Inquiry Submitted Successfully.
        </h3>

        <blockquote className="mt-4 border-l-2 border-brand/40 pl-4 font-display italic text-stone">
          &ldquo;Precision in communication leads to perfection in execution.&rdquo;
        </blockquote>

        <p className="mt-4 font-body text-sm text-stone leading-relaxed">
          Thank you for reaching out to PaintByte. Whether for residential projects, commercial spaces, or formal tender submissions, our technical team reviews all inquiries within one business day.
        </p>

        <div className="mt-8 pt-6 border-t border-brand/20 flex items-center justify-between font-mono text-xs text-brand-dark">
          <span>REF: EST-{Math.floor(1000 + Math.random() * 9000)}</span>
          <span>ESTIMATE WINDOW: 24 HOURS</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl rounded-sm border border-line bg-canvas p-6 sm:p-10 shadow-sm font-body text-ink animate-fadeUp">
      <Helmet>
        <title>Request an Estimate & Submit RFPs | PaintByte Painting Contractors</title>
        <meta name="description" content="Get a detailed estimate for residential, commercial, or government painting projects. Submit tender documents and RFPs directly to PaintByte." />
        <script type="application/ld+json">
          {JSON.stringify(contactSchema)}
        </script>
      </Helmet>
      
      <header className="mb-8 border-b border-line pb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-stone">
            ESTIMATE & TENDER INQUIRIES
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-ink">
          Request an Estimate or Submit an RFP
        </h2>

        <p className="mt-2 font-display italic text-base text-brand-dark">
          &ldquo;Precision in planning, perfection in painting.&rdquo;
        </p>
        <p className="mt-1 font-body text-xs text-stone">
          Tell us about your residential house, commercial property, or public sector facility—we respond to all contract bids and estimate requests within 24 hours.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-stone">
              Full Name / Company Name <span className="text-coral">*</span>
            </label>
            <input
              id="name"
              name="name"
              required
              aria-required="true"
              value={form.name}
              onChange={onChange}
              placeholder="e.g. Eleanor Vance or Ministry Rep"
              className="mt-2 w-full border-b border-line bg-transparent py-2.5 font-body text-ink placeholder:text-stone/40 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/20 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block font-mono text-xs uppercase tracking-widest text-stone">
              Phone / WhatsApp
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              placeholder="+234 806 570 4348"
              className="mt-2 w-full border-b border-line bg-transparent py-2.5 font-body text-ink placeholder:text-stone/40 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/20 transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-stone">
            Email Address <span className="text-coral">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            value={form.email}
            onChange={onChange}
            placeholder="eleanor@domain.com"
            className="mt-2 w-full border-b border-line bg-transparent py-2.5 font-body text-ink placeholder:text-stone/40 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/20 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="serviceType" className="block font-mono text-xs uppercase tracking-widest text-stone">
            Scope of Service <span className="text-coral">*</span>
          </label>
          <div className="relative">
            <select
              id="serviceType"
              name="serviceType"
              value={form.serviceType}
              onChange={onChange}
              className="mt-2 w-full appearance-none border-b border-line bg-transparent py-2.5 pr-8 font-body text-ink focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/20 transition-colors cursor-pointer"
            >
              <option value="Interior" className="bg-canvas text-ink">Residential Interior Painting</option>
              <option value="Exterior" className="bg-canvas text-ink">Residential Exterior Refinishing</option>
              <option value="Commercial" className="bg-canvas text-ink">Commercial Office & Real Estate</option>
              <option value="Government" className="bg-canvas text-ink">Government Facility Maintenance / Tender</option>
              <option value="Industrial" className="bg-canvas text-ink">Industrial Epoxy & Protective Coatings</option>
              <option value="Consultation" className="bg-canvas text-ink">Color & Material Consultation</option>
            </select>
            <div className="pointer-events-none absolute right-2 bottom-3 text-stone">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-stone">
            Project Scope & Specifications <span className="text-coral">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            aria-required="true"
            value={form.message}
            onChange={onChange}
            placeholder="Provide details: estimated square footage, current wall condition, required site location, timeline, or tender specs..."
            className="mt-2 w-full border-b border-line bg-transparent py-2.5 font-body text-ink placeholder:text-stone/40 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/20 transition-colors resize-none"
          />
        </div>

        {status === 'error' && (
          <div className="rounded-sm border border-coral/30 bg-coral-tint p-3 font-body text-xs text-coral-dark flex items-center space-x-2">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Something went wrong sending your message. Please try again or call us directly at +234 806 570 4348.</span>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center justify-center rounded-sm bg-brand px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-canvas shadow-sm transition-all hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:opacity-50"
          >
            {status === 'sending' ? (
              <span className="flex items-center space-x-2">
                <svg className="h-3.5 w-3.5 animate-spin text-canvas" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Submitting Request…</span>
              </span>
            ) : (
              <span>Request Estimate / Submit RFP</span>
            )}
          </button>

          <span className="font-mono text-[10px] text-stone uppercase tracking-wider">
            256-Bit SSL Encrypted & Confidential
          </span>
        </div>
      </form>
    </div>
  )
}