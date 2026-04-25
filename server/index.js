const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const Contact = require('./models/Contact')
const Document = require('./models/Document')
const { normalizeContactPayload } = require('./utils/textProcessing')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5050
const MONGO_URI = process.env.MONGO_URI
const UPLOAD_PASSWORD = process.env.UPLOAD_PASSWORD

app.use(cors())
app.use(express.json())

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection failed:', error.message))
  mongoose.connection.on('error', (error) => console.error('MongoDB error:', error.message))
} else {
  console.warn('MONGO_URI not provided.')
}

// Uploads directory
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

app.use('/uploads', express.static(uploadsDir))

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${unique}-${file.originalname}`)
  },
})
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } })

const requireDb = (res) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ message: 'Database not connected. Check your MongoDB Atlas IP whitelist.' })
    return false
  }
  return true
}

// ── Health ────────────────────────────────────────────────────────────────────

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', service: 'cocosmart-api' })
})

// ── Contact ───────────────────────────────────────────────────────────────────

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = normalizeContactPayload(req.body)

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' })
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Invalid email address.' })
    }

    if (mongoose.connection.readyState === 1) {
      await Contact.create({ name, email, message })
    }

    return res.status(201).json({ message: 'Thanks! Your message was received.' })
  } catch {
    return res.status(500).json({ message: 'Failed to submit message.' })
  }
})

// ── Documents ─────────────────────────────────────────────────────────────────

app.post('/api/documents/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, description, password } = req.body

    if (password !== UPLOAD_PASSWORD) {
      if (req.file) fs.unlinkSync(req.file.path)
      return res.status(401).json({ message: 'Invalid password.' })
    }

    if (!title || !req.file) {
      if (req.file) fs.unlinkSync(req.file.path)
      return res.status(400).json({ message: 'Title and file are required.' })
    }

    if (!requireDb(res)) {
      if (req.file) fs.unlinkSync(req.file.path)
      return
    }

    const doc = await Document.create({
      title,
      description: description || '',
      originalName: req.file.originalname,
      storedName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
    })

    return res.status(201).json({ message: 'Document uploaded successfully.', document: doc })
  } catch {
    return res.status(500).json({ message: 'Failed to upload document.' })
  }
})

app.get('/api/documents', async (req, res) => {
  try {
    if (!requireDb(res)) return
    const docs = await Document.find().sort({ createdAt: -1 })
    return res.json(docs)
  } catch {
    return res.status(500).json({ message: 'Failed to fetch documents.' })
  }
})

app.get('/api/documents/:id/download', async (req, res) => {
  try {
    if (!requireDb(res)) return

    const doc = await Document.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Document not found.' })

    const filePath = path.join(uploadsDir, doc.storedName)
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on server.' })
    }

    res.download(filePath, doc.originalName)
  } catch {
    return res.status(500).json({ message: 'Failed to download document.' })
  }
})

app.delete('/api/documents/:id', async (req, res) => {
  try {
    const { password } = req.body

    if (password !== UPLOAD_PASSWORD) {
      return res.status(401).json({ message: 'Invalid password.' })
    }

    if (!requireDb(res)) return

    const doc = await Document.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Document not found.' })

    const filePath = path.join(uploadsDir, doc.storedName)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

    await Document.findByIdAndDelete(req.params.id)
    return res.json({ message: 'Document deleted.' })
  } catch {
    return res.status(500).json({ message: 'Failed to delete document.' })
  }
})

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
