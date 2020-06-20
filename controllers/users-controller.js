const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  getStatusText,
} = require('http-status-codes');
const strings = require('../config/strings');
const signToken = require('../helpers/sign-jwt-token');
const sendEmail = require('../helpers/send-email');
const {
  deleteUser,
  getResetToken,
  changePassword,
} = require('../services/users-service');

exports.signup = (req, res, next) => {
  const { user } = req;

  res.status(CREATED).json({
    result: getStatusText(CREATED),
    data: user,
  });
};

exports.login = (req, res, next) => {
  const { id } = req.user;
  const token = signToken(id);

  res.status(OK).json({
    result: getStatusText(OK),
    data: { token },
  });
};

exports.deleteUser = async (req, res, next) => {
  const { user } = req;

  try {
    await deleteUser(user);

    res.status(NO_CONTENT).json({
      result: getStatusText(NO_CONTENT),
    });
  } catch (err) {
    next(err);
  }
};

exports.sendResetToken = async (req, res, next) => {
  const { email } = req.params;

  try {
    const user = await getResetToken(email);

    if (!user) {
      return res.status(OK).json({
        result: getStatusText(OK),
        message: strings.resetTokenSent,
      });
    }

    sendEmail(email, user.resetToken);

    res.status(OK).json({
      result: getStatusText(OK),
      message: strings.resetTokenSent,
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await changePassword(token, newPassword);

    if (!user) {
      return res.status(BAD_REQUEST).json({
        result: getStatusText(BAD_REQUEST),
      });
    }

    res.status(OK).json({
      result: getStatusText(OK),
      message: strings.passwordUpdated,
    });
  } catch (err) {
    next(err);
  }
};
