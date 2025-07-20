const mongoose = require('../config/db');
const facultySchema = new mongoose.Schema({
  name: String,
  department: String,
  email: String
});

module.exports = mongoose.model('Faculty', facultySchema);
