const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Routes
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/admissions', require('./routes/admissionRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/results', require('./routes/resultRoutes'));

// Error handling middleware
app.use((error, req, res, next) => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'File too large' });
  }
  res.status(500).json({ message: error.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
