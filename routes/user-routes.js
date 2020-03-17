const router = require('express').Router();
const { signup, login } = require('../controllers/user-controller');
const authPassport = require('../helpers/auth-passport');

// Requests to /api/user/signup
router.post('/signup', authPassport('signup'), signup);

// Requests to /api/user/login
router.post('/login', authPassport('login'), login);

// To be used with passport
// router.get('/google');
// router.get('/google/callback');
// router.get('/facebook');
// router.get('/facebook/callback');
// router.get('/github');
// router.get('/github/callback');

module.exports = router;