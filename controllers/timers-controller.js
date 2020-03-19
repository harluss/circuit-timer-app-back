const Timer = require('../models/timer-model');
const User = require('../models/user-model');
const { OK, CREATED, NO_CONTENT, NOT_FOUND, getStatusText } = require('http-status-codes');

exports.getTimers = async (req, res, next) => {
    const { id } = req.user;

    try {
        const timers = await Timer.find({ creator: id });

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
    const { timerId } = req.params;
    const { id } = req.user;

    try {
        const timer = await Timer.findOne({ _id: timerId, creator: id });

        if (!timer) {
            return res.status(NOT_FOUND)
                .json({
                    result: getStatusText(NOT_FOUND)
                });
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
    const timerData = req.body;
    const { id } = req.user;

    const timer = new Timer({ ...timerData, creator: id });
    
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
    const timerData = req.body;
    const { timerId } = req.params;
    const { id } = req.user;

    try {
        const updatedTimer = await Timer.findOneAndUpdate(
            { _id: timerId, creator: id },
            { ...timerData },
            { new: true }
        );

        if (!updatedTimer) {
            return res.status(NOT_FOUND)
                .json({
                    result: getStatusText(NOT_FOUND)
                });
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
    const { timerId } = req.params;
    const { id } = req.user;

    try {
        const timer = await Timer.findOne({ _id: timerId, creator: id });

        if (!timer) {
            return res.status(NOT_FOUND)
                .json({
                    result: getStatusText(NOT_FOUND)
                });
        };

        await timer.remove();

        res.status(NO_CONTENT)
            .json({
                result: getStatusText(NO_CONTENT)
            });
    } catch (err) {
        next(err);
    }
};