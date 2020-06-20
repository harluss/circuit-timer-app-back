const router = require('express').Router();
const {
  signup,
  login,
  deleteUser,
  sendResetToken,
  resetPassword,
} = require('../controllers/users-controller');
const authenticate = require('../middleware/authenticate');
const schemas = require('../config/validation');
const validateInput = require('../middleware/validate');

// Requests to /api/users/
router.post(
  '/signup',
  validateInput(schemas.signup),
  authenticate('signup'),
  signup
);

// Requests to /api/users/login
router.post(
  '/login',
  validateInput(schemas.login),
  authenticate('login'),
  login
);

// Requests to /api/users/
router.delete('/', authenticate('jwt'), deleteUser);

// Requests to /api/users/password/:email
router.get('/password/:email', sendResetToken);

// Requests to /api/users/password/:token
router.post('/password/:token', resetPassword);

module.exports = router;
