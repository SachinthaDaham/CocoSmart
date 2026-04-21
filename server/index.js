const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Contact = require('./models/Contact')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5050
const MONGO_URI = process.env.MONGO_URI

app.use(cors())
app.use(express.json())

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('MongoDB connected')
    })
    .catch((error) => {
      console.error('MongoDB connection failed:', error.message)
    })
} else {
  console.warn('MONGO_URI not provided. Contact messages will not be stored.')
}

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', service: 'cocosmart-api' })
})

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body

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
  } catch (error) {
    return res.status(500).json({ message: 'Failed to submit message.' })
  }
})

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
