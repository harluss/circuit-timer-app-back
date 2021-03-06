const router = require('express').Router();
const {
  getTimers,
  getTimer,
  createTimer,
  updateTimer,
  deleteTimer,
} = require('../controllers/timers-controller');
const authenticate = require('../middleware/authenticate');
const schemas = require('../config/validation');
const validateInput = require('../middleware/validate');

// Requests to /api/timers
router
  .route('/')
  .get(authenticate('jwt'), getTimers)
  .post(validateInput(schemas.timer), authenticate('jwt'), createTimer);

// Requests to /api/timers/:id
router
  .route('/:timerId')
  .get(authenticate('jwt'), getTimer)
  .put(validateInput(schemas.timer), authenticate('jwt'), updateTimer)
  .delete(authenticate('jwt'), deleteTimer);

module.exports = router;
