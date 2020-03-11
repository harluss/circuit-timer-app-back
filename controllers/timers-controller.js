const Timer = require('../models/timer-model');
const { OK, CREATED, NO_CONTENT, NOT_FOUND, getStatusText } = require('http-status-codes');

exports.getTimers = async (req, res, next) => {
    try {
        const timers = await Timer.find();

        res.status(OK)
            .json({
                result: getStatusText(OK),
                count: timers.length,
                data: timers
            });
    } catch (err) {
        next(err);
    }
};

exports.getTimer = async (req, res, next) => {
    const timerId = req.params.timerId;

    try {
        const timer = await Timer.findById(timerId);

        if (!timer) {
            const error = new Error(getStatusText(NOT_FOUND));
            error.statusCode = NOT_FOUND;
            throw error;
        };

        res.status(OK)
            .json({
                result: getStatusText(OK),
                data: timer
            });
    } catch (err) {
        next(err);
    }
};

exports.createTimer = async (req, res, next) => {
    const { name, rounds_number, rounds_timer, rests_timer } = req.body;
    const timer = new Timer({
        name: name,
        rounds_number: rounds_number,
        rounds_timer: rounds_timer,
        rests_timer: rests_timer
    });

    try {
        const savedTimer = await timer.save();

        res.status(CREATED)
            .json({
                result: getStatusText(CREATED),
                data: savedTimer
            });
    } catch (err) {
        next(err);
    }
};

exports.updateTimer = async (req, res, next) => {
    const timerId = req.params.timerId;
    const { name, rounds_number, rounds_timer, rests_timer } = req.body;

    try {
        const updatedTimer = await Timer.findOneAndUpdate({ _id: timerId }, {
            name: name,
            rounds_number: rounds_number,
            rounds_timer: rounds_timer,
            rests_timer: rests_timer
        }, { new: true });

        if (!updatedTimer) {
            const error = new Error(getStatusText(NOT_FOUND));
            error.statusCode = NOT_FOUND;
            throw error;
        };

        res.status(OK)
            .json({
                result: getStatusText(OK),
                data: updatedTimer
            });
    } catch (err) {
        next(err);
    }
};

exports.deleteTimer = async (req, res, next) => {
    const timerId = req.params.timerId;

    try {
        const removedTimer = await Timer.findByIdAndRemove(timerId);

        if (!removedTimer) {
            const error = new Error(getStatusText(NOT_FOUND));
            error.statusCode = NOT_FOUND;
            throw error;
        };

        res.status(NO_CONTENT)
            .json({
                result: getStatusText(NO_CONTENT),
                data: removedTimer
            });
    } catch (err) {
        next(err);
    }
};