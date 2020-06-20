const User = require('../models/user-model');
const { comparePasswords } = require('../helpers/passwords');
const config = require('../config/config');
const generateResetToken = require('../helpers/generate-reset-token');

exports.signup = async (email, name, password) => {
  const user = await User.findOne({ email });

  if (user) {
    return null;
  }

  const newUser = new User({ email, name, password });

  return await newUser.save();
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const isCorrect = await comparePasswords(password, user.password);

  if (!isCorrect) {
    return null;
  }

  return user;
};

exports.findUserbyId = async (userId) => await User.findById(userId);

exports.deleteUser = async (user) => await user.remove();

exports.getResetToken = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  user.resetToken = generateResetToken();
  user.resetTokenExpiration = Date.now() + config.resetToken.expiry;

  return await user.save();
};

exports.changePassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  });

  if (!user) {
    return null;
  }

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;

  return await user.save();
};
