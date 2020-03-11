const router = require('express').Router();
const { signup, login } = require('../controllers/auth-controller');

// Requests to /api/auth/signup
router.post('/signup', signup);

// Requests to /api/auth/login
router.post('/login', login);

// To be used with passport
// router.get('/google');
// router.get('/google/callback');
// router.get('/facebook');
// router.get('/facebook/callback');
// router.get('/github');
// router.get('/github/callback');

module.exports = router;