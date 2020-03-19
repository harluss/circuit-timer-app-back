const router = require('express').Router();
const { signup, login, deleteUser } = require('../controllers/users-controller');
const authenticate = require('../helpers/authenticate');
const { validateInput, schemas } = require('../config/validation');

// Requests to /api/user/signup
router.post('/signup', validateInput(schemas.signup), authenticate('signup'), signup);

// Requests to /api/user/login
router.post('/login', validateInput(schemas.login), authenticate('login'), login);

// Requests to /api/user/
router.delete('/', authenticate('jwt'), deleteUser);

// To be used with passport
// router.get('/google');
// router.get('/google/callback');
// router.get('/facebook');
// router.get('/facebook/callback');
// router.get('/github');
// router.get('/github/callback');

module.exports = router;