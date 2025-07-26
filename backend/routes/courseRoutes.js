const router = require('express').Router();
const courseController = require('../controllers/courseController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

// Student routes
router.post('/:id/enroll', auth, courseController.enroll);

// Admin routes
router.post('/', auth, adminAuth, courseController.createCourse);
router.put('/:id', auth, adminAuth, courseController.updateCourse);
router.delete('/:id', auth, adminAuth, courseController.deleteCourse);

module.exports = router;
