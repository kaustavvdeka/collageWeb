const mongoose = require('../config/db');

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  semester: { type: String, required: true },
  subjects: [{
    name: String,
    marks: Number,
    maxMarks: Number,
    grade: String
  }],
  totalMarks: Number,
  maxTotalMarks: Number,
  percentage: Number,
  grade: String,
  status: { type: String, enum: ['Pass', 'Fail'], required: true },
  publishedAt: { type: Date, default: Date.now },
  publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

module.exports = mongoose.model('Result', resultSchema);