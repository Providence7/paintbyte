import { useState } from 'react'
import apiClient from '../api/client.js'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  serviceType: 'Interior',
  message: '',
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_IMAGES = 5

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [attachments, setAttachments] = useState({ images: [], video: null })
  const [attachmentError, setAttachmentError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const onFilesSelected = (e) => {
    const files = Array.from(e.target.files)
    let newImages = [...attachments.images]
    let newVideo = attachments.video
    let error = ''

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        error = `"${file.name}" is over 10MB and wasn't added.`
        continue
      }
      if (file.type.startsWith('video/')) {
        newVideo = file // only one video allowed — replaces any previous pick
      } else if (file.type.startsWith('image/')) {
        if (newImages.length < MAX_IMAGES) {
          newImages = [...newImages, file]
        } else {
          error = `You can attach up to ${MAX_IMAGES} photos.`
        }
      } else {
        error = `"${file.name}" isn't a photo or video and wasn't added.`
      }
    }

    setAttachments({ images: newImages, video: newVideo })
    setAttachmentError(error)
    e.target.value = '' // lets the same file be re-selected later if removed
  }

  const removeImage = (index) => {
    setAttachments((a) => ({ ...a, images: a.images.filter((_, i) => i !== index) }))
  }

  const removeVideo = () => {
    setAttachments((a) => ({ ...a, video: null }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const data = new FormData()
      Object.entries(form).forEach(([key, value]) => data.append(key, value))
      attachments.images.forEach((file) => data.append('images', file))
      if (attachments.video) data.append('video', attachments.video)

      await apiClient.post('/messages', data)

      setStatus('sent')
      setForm(initialForm)
      setAttachments({ images: [], video: null })
      setAttachmentError('')
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <section 
        aria-labelledby="success-heading" 
        className="mx-auto w-full max-w-2xl rounded-sm border border-brand/30 bg-brand-tint/60 p-8 sm:p-12 text-ink shadow-sm animate-fadeUp"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-canvas shadow-sm">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-dark">
            CORRESPONDENCE RECEIVED
          </span>
        </div>

        <h3 id="success-heading" className="font-display text-3xl font-normal text-brand-dark">
          Message successfully sent.
        </h3>

        <blockquote className="mt-4 border-l-2 border-brand/40 pl-4 font-display italic text-stone">
          &ldquo;A pen is mightier than a sword.&rdquo;
        </blockquote>

        <p className="mt-4 font-body text-sm text-stone leading-relaxed">
          Thank you for reaching out. We review every architectural & interior query carefully and reply to most estimate requests within one business day.
        </p>

        <div className="mt-8 pt-6 border-t border-brand/20 flex items-center justify-between font-mono text-xs text-brand-dark">
          <span>REF: EST-{Math.floor(1000 + Math.random() * 9000)}</span>
          <span>STUDIO HOURS: 08:00 – 18:00 EST</span>
        </div>
      </section>
    )
  }

  return (
    <section 
      aria-labelledby="contact-heading"
      className="mx-auto w-full max-w-2xl rounded-sm border border-line bg-canvas p-6 sm:p-10 shadow-sm font-body text-ink animate-fadeUp"
      itemScope 
      itemType="https://schema.org/ContactPage"
    >
      {/* Editorial Adage Header with Keyword Rich Structure */}
      <header className="mb-8 border-b border-line pb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-stone">
            ESTIMATE REQUEST
          </span>
        </div>

        <h1 id="contact-heading" className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-ink" itemProp="name">
          Start the Conversation
        </h1>

        <p className="mt-2 font-display italic text-base text-brand-dark">
          &ldquo;A pen is mightier than a sword.&rdquo;
        </p>
        <p className="mt-1 font-body text-xs text-stone" id="form-subtitle">
          Tell us about your space, timing, and vision—we respond to interior & architectural inquiries within 24 hours.
        </p>
      </header>

      {/* Form Area with ARIA context */}
      <form onSubmit={onSubmit} className="space-y-6" aria-describedby="form-subtitle">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-stone">
              Name <span className="text-coral" aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              aria-required="true"
              value={form.name}
              onChange={onChange}
              placeholder="e.g. Eleanor Vance"
              className="mt-2 w-full border-b border-line bg-transparent py-2.5 font-body text-ink placeholder:text-stone/40 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/20 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block font-mono text-xs uppercase tracking-widest text-stone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              placeholder="+234 000 000 0000"
              className="mt-2 w-full border-b border-line bg-transparent py-2.5 font-body text-ink placeholder:text-stone/40 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/20 transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-stone">
            Email <span className="text-coral" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            value={form.email}
            onChange={onChange}
            placeholder="eleanor@gmail.com"
            className="mt-2 w-full border-b border-line bg-transparent py-2.5 font-body text-ink placeholder:text-stone/40 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/20 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="serviceType" className="block font-mono text-xs uppercase tracking-widest text-stone">
            Service Needed
          </label>
          <div className="relative">
            <select
              id="serviceType"
              name="serviceType"
              value={form.serviceType}
              onChange={onChange}
              className="mt-2 w-full appearance-none border-b border-line bg-transparent py-2.5 pr-8 font-body text-ink focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/20 transition-colors cursor-pointer"
            >
              <option value="Interior" className="bg-canvas text-ink">Interior Design & Painting</option>
              <option value="Exterior" className="bg-canvas text-ink">Exterior Restoration</option>
              <option value="Commercial" className="bg-canvas text-ink">Commercial Property</option>
              <option value="Color consultation" className="bg-canvas text-ink">Color & Material Consultation</option>
            </select>
            <div className="pointer-events-none absolute right-2 bottom-3 text-stone" aria-hidden="true">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-stone">
            Tell us about the space <span className="text-coral" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            aria-required="true"
            value={form.message}
            onChange={onChange}
            placeholder="Dimensions, current condition, architectural era, desired timeline..."
            className="mt-2 w-full border-b border-line bg-transparent py-2.5 font-body text-ink placeholder:text-stone/40 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/20 transition-colors resize-none"
          />
        </div>

        {/* Attachments */}
        <div>
          <label htmlFor="attachments" className="block font-mono text-xs uppercase tracking-widest text-stone">
            Photos or a Video <span className="font-normal normal-case text-stone/70">(optional, max 10MB each)</span>
          </label>

          <label
            htmlFor="attachments"
            className="mt-2 flex cursor-pointer items-center justify-center rounded-sm border border-dashed border-line bg-brand-tint/20 px-4 py-6 text-center transition-colors hover:border-brand hover:bg-brand-tint/40"
          >
            <div className="flex flex-col items-center space-y-1">
              <svg className="h-5 w-5 text-brand-dark" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 12v9m0-9l-3 3m3-3l3 3" />
              </svg>
              <span className="font-body text-xs text-stone">
                Up to {MAX_IMAGES} photos, or a short video — 10MB max each
              </span>
            </div>
            <input
              id="attachments"
              name="attachments"
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={onFilesSelected}
              className="hidden"
            />
          </label>

          {attachmentError && (
            <p className="mt-2 font-body text-xs text-coral-dark" role="alert">{attachmentError}</p>
          )}

          {(attachments.images.length > 0 || attachments.video) && (
            <ul className="mt-3 space-y-1.5" aria-label="Attached files">
              {attachments.images.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between rounded-sm border border-line bg-canvas px-3 py-1.5 font-body text-xs text-stone"
                >
                  <span className="truncate">{file.name} · {(file.size / (1024 * 1024)).toFixed(1)}MB</span>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="ml-3 flex-shrink-0 font-mono text-[10px] uppercase text-coral-dark hover:underline"
                    aria-label={`Remove image ${file.name}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
              {attachments.video && (
                <li className="flex items-center justify-between rounded-sm border border-line bg-canvas px-3 py-1.5 font-body text-xs text-stone">
                  <span className="truncate">{attachments.video.name} · {(attachments.video.size / (1024 * 1024)).toFixed(1)}MB</span>
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="ml-3 flex-shrink-0 font-mono text-[10px] uppercase text-coral-dark hover:underline"
                    aria-label={`Remove video ${attachments.video.name}`}
                  >
                    Remove
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>

        {status === 'error' && (
          <div className="rounded-sm border border-coral/30 bg-coral-tint p-3 font-body text-xs text-coral-dark flex items-center space-x-2" role="alert">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Something went wrong sending your message. Please try again, or call us directly.</span>
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
                <svg className="h-3.5 w-3.5 animate-spin text-canvas" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Sending Message…</span>
              </span>
            ) : (
              <span>Send Message</span>
            )}
          </button>
        </div>
      </form>
    </section>
  )
}