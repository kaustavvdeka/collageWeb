const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const admissionController = require('../controllers/admissionController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed'));
    }
  }
});

// Public routes
router.post('/submit', upload.fields([
  { name: 'marksheet', maxCount: 1 },
  { name: 'certificate', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
  { name: 'idProof', maxCount: 1 }
]), admissionController.submitApplication);

router.get('/application/:applicationNumber', admissionController.getApplicationByNumber);

// Admin routes
router.get('/', auth, adminAuth, admissionController.getAllApplications);
router.get('/:id', auth, adminAuth, admissionController.getApplicationById);
router.put('/:id/status', auth, adminAuth, admissionController.updateApplicationStatus);

module.exports = router;