const mongoose = require('../config/db');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  isActive: { type: Boolean, default: true },
  postedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', noticeSchema);
