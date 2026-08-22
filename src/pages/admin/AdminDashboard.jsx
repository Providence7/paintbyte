import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../../api/client.js'
import { useAdminAuth } from '../../context/AdminAuthContext.jsx'

export default function AdminDashboard() {
  const { token, logout } = useAdminAuth()
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])
  const [tab, setTab] = useState('projects')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [selectedMessage, setSelectedMessage] = useState(null)

  const authHeader = useMemo(() => ({
    headers: { Authorization: `Bearer ${token}` }
  }), [token])

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setError(null)

    Promise.all([
      apiClient.get('/projects', { params: { published: 'all' }, ...authHeader }),
      apiClient.get('/messages', authHeader)
    ])
      .then(([projRes, msgRes]) => {
        if (!isMounted) return
        setProjects(projRes.data || [])
        setMessages(msgRes.data || [])
      })
      .catch((err) => {
        if (!isMounted) return
        console.error('Failed to load dashboard data:', err)
        setError('Could not fetch dashboard records. Please check your network or login session.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [authHeader])

  const togglePublish = async (project) => {
    try {
      const res = await apiClient.patch(
        `/projects/${project._id}`,
        { published: !project.published },
        authHeader
      )
      setProjects((prev) => prev.map((p) => (p._id === project._id ? res.data : p)))
    } catch (err) {
      alert('Failed to update project publish status.')
    }
  }

  const deleteProject = async (id) => {
    if (!confirm('Delete this project? This action cannot be undone.')) return
    try {
      await apiClient.delete(`/projects/${id}`, authHeader)
      setProjects((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      alert('Failed to delete project.')
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 font-body text-ink">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-amber" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-dark">
              Admin Portal
            </span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-normal tracking-tight">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center justify-center rounded-sm bg-brand px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider text-canvas shadow-sm transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1"
          >
            + New Project
          </Link>
          <button
            onClick={logout}
            className="inline-flex items-center justify-center rounded-sm border border-line bg-canvas px-4 py-2 font-mono text-xs uppercase tracking-wider text-stone transition-colors hover:border-ink hover:text-ink focus:outline-none"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="mt-8 flex gap-4 border-b border-line">
        {['projects', 'messages'].map((t) => {
          const isActive = tab === t
          const isMessages = t === 'messages'

          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative pb-3 font-mono text-xs uppercase tracking-widest transition-colors focus:outline-none ${
                isActive ? 'font-bold text-brand' : 'text-stone hover:text-ink'
              }`}
            >
              <span>{t}</span>
              {isMessages && messages.length > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full bg-amber/20 px-2 py-0.5 font-mono text-[10px] font-bold text-amber">
                  {messages.length}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
              )}
            </button>
          )
        })}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-6 rounded-sm border border-red-200 bg-red-50 p-4 font-mono text-xs text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="mt-12 space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-16 w-full animate-pulse rounded-sm bg-line/30" />
          ))}
        </div>
      ) : (
        <>
          {/* Projects View */}
          {tab === 'projects' && (
            <div className="mt-6 divide-y divide-line/60 rounded-sm border border-line/60 bg-canvas">
              {projects.map((project) => {
                const thumb = project.afterImage || project.images?.[0]

                return (
                  <div
                    key={project._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 transition-colors hover:bg-brand-tint/20"
                  >
                    <div className="flex items-center gap-4">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={project.title}
                          className="h-14 w-14 rounded-sm border border-line object-cover bg-line/20"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-line/30 font-mono text-xs text-stone">
                          🎨
                        </div>
                      )}

                      <div>
                        <p className="font-display font-semibold text-ink text-base">
                          {project.title}
                        </p>
                        <div className="mt-0.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-stone">
                          <span>{project.serviceType || 'General'}</span>
                          <span>·</span>
                          <span
                            className={
                              project.published ? 'text-emerald-700 font-bold' : 'text-amber'
                            }
                          >
                            {project.published ? '● Published' : '○ Draft'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 border-t border-line/40 sm:border-t-0 pt-3 sm:pt-0 font-mono text-xs">
                      <button
                        onClick={() => togglePublish(project)}
                        className="text-brand hover:underline font-medium"
                      >
                        {project.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <Link
                        to={`/admin/projects/${project._id}/edit`}
                        className="text-stone hover:text-ink"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProject(project._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              })}

              {projects.length === 0 && (
                <div className="p-12 text-center">
                  <p className="font-display text-base text-ink">No projects added yet</p>
                  <p className="mt-1 font-body text-xs text-stone">
                    Upload completed client jobs to feature them on your portfolio.
                  </p>
                  <Link
                    to="/admin/projects/new"
                    className="mt-4 inline-block font-mono text-xs text-brand hover:underline"
                  >
                    + Create First Project
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Client Messages View */}
          {tab === 'messages' && (
            <div className="mt-6 divide-y divide-line/60 rounded-sm border border-line/60 bg-canvas">
              {messages.map((msg) => {
                const hasAttachments = msg.images?.length > 0 || Boolean(msg.videoUrl)

                return (
                  <div
                    key={msg._id}
                    onClick={() => setSelectedMessage(msg)}
                    className="cursor-pointer p-5 transition-colors hover:bg-brand-tint/20"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display font-semibold text-ink text-base">
                          {msg.name}
                        </h3>
                        <p className="mt-0.5 font-mono text-xs text-brand">
                          {msg.serviceType || 'General Inquiry'} · {msg.email}{' '}
                          {msg.phone ? `· ${msg.phone}` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {hasAttachments && (
                          <span className="font-mono text-[10px] uppercase tracking-wider text-amber">
                            📎 {msg.images?.length || 0}
                            {msg.videoUrl ? ' + video' : ''}
                          </span>
                        )}
                        <span className="font-mono text-[11px] text-stone">
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })
                            : 'Recent'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 rounded-sm bg-brand-tint/40 p-3 font-body text-sm leading-relaxed text-ink/90 border border-line/30 line-clamp-2">
                      "{msg.message}"
                    </div>
                  </div>
                )
              })}

              {messages.length === 0 && (
                <div className="p-12 text-center font-body text-sm text-stone">
                  No incoming client estimate requests or messages yet.
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4 sm:p-8"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-sm border border-line bg-canvas p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-line pb-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {selectedMessage.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-brand">
                  {selectedMessage.serviceType || 'General Inquiry'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="font-mono text-xs uppercase tracking-widest text-stone hover:text-ink"
              >
                ✕ Close
              </button>
            </div>

            <div className="mt-4 space-y-1 font-mono text-xs text-stone">
              <p>Email: <span className="text-ink">{selectedMessage.email}</span></p>
              {selectedMessage.phone && (
                <p>Phone: <span className="text-ink">{selectedMessage.phone}</span></p>
              )}
              <p>
                Received:{' '}
                <span className="text-ink">
                  {selectedMessage.createdAt
                    ? new Date(selectedMessage.createdAt).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })
                    : 'Recent'}
                </span>
              </p>
            </div>

            <div className="mt-4 rounded-sm bg-brand-tint/40 p-4 font-body text-sm leading-relaxed text-ink/90 border border-line/30">
              {selectedMessage.message}
            </div>

            {(selectedMessage.images?.length > 0 || selectedMessage.videoUrl) && (
              <div className="mt-5">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-stone">
                  Attachments
                </p>
                <div className="flex flex-wrap gap-3">
                  {selectedMessage.images?.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLightboxImage(src)}
                      className="group relative block h-24 w-24 overflow-hidden rounded-sm border border-line focus:outline-none focus:ring-2 focus:ring-brand"
                    >
                      <img
                        src={src}
                        alt={`Attachment ${i + 1} from ${selectedMessage.name}`}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div
                        style={{ display: 'none' }}
                        className="absolute inset-0 flex items-center justify-center bg-red-50 font-mono text-[9px] text-red-600 text-center p-1"
                      >
                        Image failed to load
                      </div>
                    </button>
                  ))}

                  {selectedMessage.videoUrl && (
                    <video
                      src={selectedMessage.videoUrl}
                      controls
                      className="h-24 rounded-sm border border-line bg-black"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 font-mono text-xs uppercase tracking-widest text-white/80 hover:text-white"
          >
            ✕ Close
          </button>
          <img
            src={lightboxImage}
            alt="Attachment preview"
            className="max-h-[85vh] max-w-full rounded-sm object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}