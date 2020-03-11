const router = require('express').Router();
const { getTimers, getTimer, createTimer, updateTimer, deleteTimer } = require('../controllers/timers-controller');

// Requests to /api/timers
router.route('/')
    .get(getTimers)
    .post(createTimer);

// Requests to /api/timers/:id
router.route('/:timerId')
    .get(getTimer)
    .put(updateTimer)
    .delete(deleteTimer);

module.exports = router;