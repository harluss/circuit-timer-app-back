const Timer = require('../models/timer-model');
const User = require('../models/user-model');
const { OK, CREATED, NO_CONTENT, NOT_FOUND, getStatusText } = require('http-status-codes');

exports.getTimers = async (req, res, next) => {
    const user = req.user.id;

    try {
        const timers = await Timer.find({ creator: user });

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
    const user = req.user.id;

    try {
        const timer = await Timer.findOne({ _id: timerId, creator: user });

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
    const creator = req.user.id;
    const timer = new Timer({ name, rounds_number, rounds_timer, rests_timer, creator });

    try {
        const savedTimer = await timer.save();
        const user = await User.findById(creator);
        await user.timers.push(savedTimer);
        await user.save();

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
    const { name, rounds_number, rounds_timer, rests_timer } = req.body;
    const timerId = req.params.timerId;
    const user = req.user.id;

    try {
        const updatedTimer = await Timer.findOneAndUpdate(
            { _id: timerId, creator: user },
            { name, rounds_number, rounds_timer, rests_timer },
            { new: true }
        );

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
    const userId = req.user.id;

    try {
        const removedTimer = await Timer.findOneAndRemove({ _id: timerId, creator: userId });

        if (!removedTimer) {
            const error = new Error(getStatusText(NOT_FOUND));
            error.statusCode = NOT_FOUND;
            throw error;
        };

        const user = await User.findById(userId);
        await user.timers.pull(timerId);
        await user.save();

        res.status(NO_CONTENT)
            .json({
                result: getStatusText(NO_CONTENT),
                data: removedTimer
            });
    } catch (err) {
        next(err);
    }
};