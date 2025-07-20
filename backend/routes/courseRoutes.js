const router = require('express').Router();
const cc = require('../controllers/courseController');
const auth = require('../middleware/auth');

router.get('/', cc.getCourses);
router.get('/:id', cc.getCourseDetails);
router.post('/:id/enroll', auth, cc.enroll);
router.get('/my-admissions', auth, cc.getAdmissions);
router.get('/notices', cc.getNotices);

module.exports = router;
