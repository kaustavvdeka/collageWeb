const router = require('express').Router();
const noticeController = require('../controllers/noticeController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Public routes
router.get('/', noticeController.getAllNotices);
router.get('/:id', noticeController.getNoticeById);

// Admin routes
router.post('/', auth, adminAuth, noticeController.createNotice);
router.put('/:id', auth, adminAuth, noticeController.updateNotice);
router.delete('/:id', auth, adminAuth, noticeController.deleteNotice);

module.exports = router;