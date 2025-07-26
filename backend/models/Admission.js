const mongoose = require('../config/db');

const admissionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  documents: {
    marksheet: String, // file path or URL
    certificate: String,
    photo: String,
    idProof: String
  },
  applicationNumber: { type: String, unique: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  appliedAt: { type: Date, default: Date.now },
  reviewedAt: Date,
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

// Generate application number before saving
admissionSchema.pre('save', function(next) {
  if (!this.applicationNumber) {
    this.applicationNumber = 'APP' + Date.now() + Math.floor(Math.random() * 1000);
  }
  next();
});

module.exports = mongoose.model('Admission', admissionSchema);
