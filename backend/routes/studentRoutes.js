const router = require('express').Router();
const sc = require('../controllers/studentController');
const auth = require('../middleware/auth');

router.post('/register', sc.register);
router.post('/login', sc.login);
router.get('/dashboard', auth, sc.dashboard);

module.exports = router;
