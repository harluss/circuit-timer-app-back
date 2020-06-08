const router = require('express').Router();
const { signup, login, deleteUser, getResetToken, resetPassword } = require('../controllers/users-controller');
const authenticate = require('../helpers/authenticate');
const { validateInput, schemas } = require('../config/validation');

// Requests to /api/users/signup
router.post('/signup', validateInput(schemas.signup), authenticate('signup'), signup);

// Requests to /api/users/login
router.post('/login', validateInput(schemas.login), authenticate('login'), login);

// Requests to /api/users/
router.delete('/', authenticate('jwt'), deleteUser);

// Requests to /api/users/reset/:email
router.get('/reset/:email', getResetToken);

// Requests to /api/users/reset/:token
router.post('/reset/:token', resetPassword);

module.exports = router;