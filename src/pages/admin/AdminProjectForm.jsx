import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import apiClient from '../../api/client.js'
import { useAdminAuth } from '../../context/AdminAuthContext.jsx'

const emptyForm = {
  title: '',
  location: '',
  serviceType: 'Interior',
  description: '',
  completedDate: '',
}

export default function AdminProjectForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { token } = useAdminAuth()

  const authHeader = useMemo(
    () => ({ headers: { Authorization: `Bearer ${token}` } }),
    [token]
  )

  const [form, setForm] = useState(emptyForm)
  const [beforeFile, setBeforeFile] = useState(null)
  const [afterFile, setAfterFile] = useState(null)
  const [galleryFiles, setGalleryFiles] = useState([])
  const [videoFile, setVideoFile] = useState(null)

  // Image preview state
  const [existingBeforeUrl, setExistingBeforeUrl] = useState('')
  const [existingAfterUrl, setExistingAfterUrl] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEdit) {
      setLoading(true)
      apiClient
        .get(`/projects/${id}`)
        .then((res) => {
          const p = res.data || {}
          setForm({
            title: p.title || '',
            location: p.location || '',
            serviceType: p.serviceType || 'Interior',
            description: p.description || '',
            completedDate: p.completedDate ? p.completedDate.slice(0, 10) : '',
          })
          setExistingBeforeUrl(p.beforeImage || '')
          setExistingAfterUrl(p.afterImage || p.images?.[0] || '')
        })
        .catch((err) => {
          console.error('Error fetching project:', err)
          setError('Could not load existing project details.')
        })
        .finally(() => setLoading(false))
    }
  }, [id, isEdit])

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      if (beforeFile) data.append('beforeImage', beforeFile)
      if (afterFile) data.append('afterImage', afterFile)
      galleryFiles.forEach((f) => data.append('images', f))
      if (videoFile) data.append('video', videoFile)

      if (isEdit) {
        await apiClient.patch(`/projects/${id}`, data, {
          headers: {
            ...authHeader.headers,
            'Content-Type': 'multipart/form-data',
          },
        })
      } else {
        await apiClient.post('/projects', data, {
          headers: {
            ...authHeader.headers,
            'Content-Type': 'multipart/form-data',
          },
        })
      }
      navigate('/admin/dashboard')
    } catch (err) {
      console.error(err)
      setError('Could not save the project. Check the fields and try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-12 font-body text-ink">
        <div className="h-8 w-48 animate-pulse rounded bg-line/40" />
        <div className="mt-8 space-y-4">
          <div className="h-12 w-full animate-pulse rounded bg-line/30" />
          <div className="h-24 w-full animate-pulse rounded bg-line/30" />
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-12 font-body text-ink">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-amber" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-dark">
              Admin Portal
            </span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-normal tracking-tight">
            {isEdit ? 'Edit project' : 'Upload a finished job'}
          </h1>
        </div>

        <Link
          to="/admin/dashboard"
          className="font-mono text-xs text-stone hover:text-ink transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        {/* Title & Location */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-stone">
              Project Title *
            </label>
            <input
              name="title"
              required
              value={form.title}
              onChange={onChange}
              className="mt-2 w-full border-b border-line bg-transparent py-2 text-sm text-ink transition-colors focus:border-brand focus:outline-none"
              placeholder="e.g. 3-bedroom exterior repaint"
            />
          </div>
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-stone">
              Location *
            </label>
            <input
              name="location"
              required
              value={form.location}
              onChange={onChange}
              className="mt-2 w-full border-b border-line bg-transparent py-2 text-sm text-ink transition-colors focus:border-brand focus:outline-none"
              placeholder="e.g. Gwarinpa, Abuja"
            />
          </div>
        </div>

        {/* Service Type & Date */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-stone">
              Service Category
            </label>
            <select
              name="serviceType"
              value={form.serviceType}
              onChange={onChange}
              className="mt-2 w-full border-b border-line bg-transparent py-2 text-sm text-ink transition-colors focus:border-brand focus:outline-none"
            >
              <option value="Interior">Interior</option>
              <option value="Exterior">Exterior</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-stone">
              Completed Date
            </label>
            <input
              type="date"
              name="completedDate"
              value={form.completedDate}
              onChange={onChange}
              className="mt-2 w-full border-b border-line bg-transparent py-2 text-sm text-ink transition-colors focus:border-brand focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-stone">
            Project Notes & Details
          </label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={onChange}
            className="mt-2 w-full rounded-sm border border-line bg-canvas p-3 text-sm text-ink leading-relaxed transition-colors focus:border-brand focus:outline-none"
            placeholder="Describe surface condition, paint colors/brands used, or special prep work completed for the client."
          />
        </div>

        {/* Before & After Photo Uploads */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-sm border border-dashed border-line p-4 bg-canvas/60">
            <label className="block font-mono text-xs uppercase tracking-widest text-stone">
              Before Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBeforeFile(e.target.files[0])}
              className="mt-2 w-full font-body text-xs text-stone file:mr-3 file:rounded-sm file:border-0 file:bg-line/40 file:px-2.5 file:py-1 file:font-mono file:text-xs file:text-ink hover:file:bg-line/60"
            />
            {beforeFile ? (
              <p className="mt-2 font-mono text-[11px] text-brand">
                Selected: {beforeFile.name}
              </p>
            ) : (
              existingBeforeUrl && (
                <img
                  src={existingBeforeUrl}
                  alt="Current Before"
                  className="mt-3 h-16 w-20 rounded-sm object-cover border border-line"
                />
              )
            )}
          </div>

          <div className="rounded-sm border border-dashed border-line p-4 bg-canvas/60">
            <label className="block font-mono text-xs uppercase tracking-widest text-stone">
              After Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAfterFile(e.target.files[0])}
              className="mt-2 w-full font-body text-xs text-stone file:mr-3 file:rounded-sm file:border-0 file:bg-line/40 file:px-2.5 file:py-1 file:font-mono file:text-xs file:text-ink hover:file:bg-line/60"
            />
            {afterFile ? (
              <p className="mt-2 font-mono text-[11px] text-brand">
                Selected: {afterFile.name}
              </p>
            ) : (
              existingAfterUrl && (
                <img
                  src={existingAfterUrl}
                  alt="Current After"
                  className="mt-3 h-16 w-20 rounded-sm object-cover border border-line"
                />
              )
            )}
          </div>
        </div>

        {/* Gallery Upload */}
        <div className="rounded-sm border border-dashed border-line p-4 bg-canvas/60">
          <label className="block font-mono text-xs uppercase tracking-widest text-stone">
            Additional Gallery Photos
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setGalleryFiles(Array.from(e.target.files))}
            className="mt-2 w-full font-body text-xs text-stone file:mr-3 file:rounded-sm file:border-0 file:bg-line/40 file:px-2.5 file:py-1 file:font-mono file:text-xs file:text-ink hover:file:bg-line/60"
          />
          {galleryFiles.length > 0 && (
            <p className="mt-2 font-mono text-[11px] text-brand">
              {galleryFiles.length} additional photo(s) selected
            </p>
          )}
        </div>

        {/* Video Upload */}
        <div className="rounded-sm border border-dashed border-line p-4 bg-canvas/60">
          <label className="block font-mono text-xs uppercase tracking-widest text-stone">
            Walkthrough Video (Optional)
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="mt-2 w-full font-body text-xs text-stone file:mr-3 file:rounded-sm file:border-0 file:bg-line/40 file:px-2.5 file:py-1 file:font-mono file:text-xs file:text-ink hover:file:bg-line/60"
          />
          {videoFile && (
            <p className="mt-2 font-mono text-[11px] text-brand">
              Video selected: {videoFile.name}
            </p>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="rounded-sm border border-red-200 bg-red-50 p-3 font-mono text-xs text-red-700">
            ⚠️ {error}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-sm bg-brand px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-canvas shadow-sm transition-all hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? 'Saving Project…'
              : isEdit
              ? 'Save Changes'
              : 'Publish Project'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="inline-flex items-center justify-center rounded-sm border border-line bg-canvas px-5 py-3 font-mono text-xs uppercase tracking-wider text-stone hover:border-ink hover:text-ink"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}