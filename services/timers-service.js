const Timer = require('../models/timer-model');

exports.getTimers = async (userId) => await Timer.find({ creator: userId });

exports.getTimer = async (timerId, userId) =>
  await Timer.findOne({ _id: timerId, creator: userId });

exports.addTimer = async (timerData, userId) => {
  const timer = new Timer({ ...timerData, creator: userId });

  return await timer.save();
};

exports.updateTimer = async (timerData, timerId, userId) =>
  await Timer.findOneAndUpdate(
    { _id: timerId, creator: userId },
    { ...timerData },
    { new: true },
  );

exports.deleteTimer = async (timerId, userId) => {
  const timer = await Timer.findOne({ _id: timerId, creator: userId });

  if (!timer) {
    return null;
  }

  return await timer.remove();
};
