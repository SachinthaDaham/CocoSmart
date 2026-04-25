import { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import './UploadPage.css'

export default function UploadPage() {
  const apiBaseUrl = useMemo(() => import.meta.env.VITE_API_URL || '/api', [])

  const [fields, setFields] = useState({ title: '', description: '', password: '' })
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [feedback, setFeedback] = useState({ text: '', error: false })
  const fileRef = useRef(null)

  const [documents, setDocuments] = useState([])
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    axios.get(`${apiBaseUrl}/documents`)
      .then((res) => setDocuments(res.data))
      .catch(() => {})
  }, [apiBaseUrl])

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setFeedback({ text: 'Please select a file.', error: true })
      return
    }
    setUploading(true)
    setFeedback({ text: '', error: false })

    const form = new FormData()
    form.append('title', fields.title)
    form.append('description', fields.description)
    form.append('password', fields.password)
    form.append('file', file)

    try {
      const res = await axios.post(`${apiBaseUrl}/documents/upload`, form)
      setDocuments((prev) => [res.data.document, ...prev])
      setFeedback({ text: res.data.message, error: false })
      setFields((prev) => ({ ...prev, title: '', description: '' }))
      setFile(null)
      if (fileRef.current) fileRef.current.value = ''
    } catch (err) {
      setFeedback({ text: err.response?.data?.message || 'Upload failed.', error: true })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (doc) => {
    if (!fields.password) {
      setFeedback({ text: 'Enter your password above before deleting.', error: true })
      return
    }
    if (!window.confirm(`Delete "${doc.title}"?`)) return

    setDeletingId(doc._id)
    try {
      await axios.delete(`${apiBaseUrl}/documents/${doc._id}`, {
        data: { password: fields.password },
      })
      setDocuments((prev) => prev.filter((d) => d._id !== doc._id))
      setFeedback({ text: `"${doc.title}" deleted.`, error: false })
    } catch (err) {
      setFeedback({ text: err.response?.data?.message || 'Delete failed.', error: true })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="upload-page">
      <div className="upload-card">
        <a href="/" className="back-link">← Back to site</a>
        <h1>Research Documents</h1>
        <p className="upload-subtitle">Upload files here — they appear on the main page for visitors to download.</p>

        <form onSubmit={handleSubmit} className="upload-form-page">
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter upload password"
              value={fields.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Document Title
            <input
              type="text"
              name="title"
              placeholder="e.g. Final Research Paper"
              value={fields.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description <span className="optional">(optional)</span>
            <input
              type="text"
              name="description"
              placeholder="e.g. Submitted to SLIIT 2024"
              value={fields.description}
              onChange={handleChange}
            />
          </label>
          <label>
            File
            <input
              type="file"
              ref={fileRef}
              onChange={(e) => setFile(e.target.files[0] || null)}
              required
            />
          </label>
          <button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>

        {feedback.text && (
          <p className={feedback.error ? 'upload-page-error' : 'upload-page-success'}>
            {feedback.text}
          </p>
        )}

        {documents.length > 0 && (
          <div className="uploaded-list">
            <h2>Uploaded Documents</h2>
            <p className="upload-subtitle">Enter your password above, then click Delete to remove a document.</p>
            {documents.map((doc) => (
              <article key={doc._id} className="upload-doc-row">
                <div className="upload-doc-info">
                  <p className="upload-doc-title">{doc.title}</p>
                  {doc.description && <p className="upload-doc-desc">{doc.description}</p>}
                  <p className="upload-doc-meta">
                    {doc.originalName} &middot; {formatSize(doc.size)} &middot;{' '}
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(doc)}
                  disabled={deletingId === doc._id}
                >
                  {deletingId === doc._id ? 'Deleting...' : 'Delete'}
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
