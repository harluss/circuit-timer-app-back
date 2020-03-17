const router = require('express').Router();
const { getTimers, getTimer, createTimer, updateTimer, deleteTimer } = require('../controllers/timers-controller');
const authPassport = require('../helpers/auth-passport');

// Requests to /api/timers
router.route('/')
    .get(authPassport('jwt'), getTimers)
    .post(authPassport('jwt'), createTimer);

// Requests to /api/timers/:id
router.route('/:timerId')
    .get(authPassport('jwt'), getTimer)
    .put(authPassport('jwt'), updateTimer)
    .delete(authPassport('jwt'), deleteTimer);

module.exports = router;