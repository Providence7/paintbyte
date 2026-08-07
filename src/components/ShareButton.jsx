import { useState } from 'react'

function buildShareUrl(projectId) {
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  return `${apiBase.replace('/api', '')}/share/project/${projectId}`
}

/**
 * variant="icon"  — small circular icon button, for overlaying on a card image
 * variant="label" — full button with text, for the project detail page
 */
export default function ShareButton({ projectId, variant = 'icon' }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const shareUrl = buildShareUrl(projectId)

    if (navigator.share) {
      try {
        await navigator.share({ url: shareUrl, title: 'Paintbyte project' })
        return
      } catch (err) {
        // user cancelled the native share sheet — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Could not copy share link:', err)
    }
  }

  if (variant === 'label') {
    return (
      <button type="button" onClick={handleShare} className="btn-secondary">
        {copied ? 'Link copied' : 'Share project'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Copy share link for this project"
      className="relative z-20 flex h-9 w-9 items-center justify-center rounded-full bg-ink/80 text-canvas backdrop-blur-sm transition-colors hover:bg-brand"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.6" y1="10.5" x2="15.4" y2="6.5" />
        <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
      </svg>

      {copied && (
        <span className="absolute -bottom-8 right-0 whitespace-nowrap rounded-sm bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-canvas">
          Copied
        </span>
      )}
    </button>
  )
}