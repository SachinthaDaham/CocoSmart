const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    originalName: { type: String, required: true },
    storedName: { type: String, required: true },
    mimeType: { type: String },
    size: { type: Number },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Document', documentSchema)
