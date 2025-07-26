const router = require('express').Router();
const resultController = require('../controllers/resultController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Student routes
router.get('/student/:studentId', auth, resultController.getResultsByStudent);

// Admin routes
router.post('/', auth, adminAuth, resultController.createResult);
router.get('/', auth, adminAuth, resultController.getAllResults);
router.get('/:id', auth, resultController.getResultById);
router.put('/:id', auth, adminAuth, resultController.updateResult);
router.delete('/:id', auth, adminAuth, resultController.deleteResult);

module.exports = router;