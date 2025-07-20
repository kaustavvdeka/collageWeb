const mongoose = require('../config/db');
const admissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }
});
module.exports = mongoose.model('Admission', admissionSchema);
