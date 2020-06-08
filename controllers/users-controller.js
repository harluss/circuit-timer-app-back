const { OK, CREATED, NO_CONTENT, BAD_REQUEST, getStatusText } = require('http-status-codes');
const signToken = require('../helpers/sign-jwt-token');
const getResetToken = require('../helpers/get-reset-token');
const User = require('../models/user-model');
const sendMail = require('../config/sendgrid');

exports.signup = (req, res, next) => {
    const user = req.user;

    res.status(CREATED)
        .json({
            result: getStatusText(CREATED),
            data: user
        });
};

exports.login = (req, res, next) => {
    const { id } = req.user;
    const token = signToken(id);

    res.status(OK)
        .json({
            result: getStatusText(OK),
            data: { 'token': token }
        });
};

exports.deleteUser = async (req, res, next) => {
    const user = req.user;

    try {
        await user.remove();

        res.status(NO_CONTENT)
            .json({
                result: getStatusText(NO_CONTENT)
            });
    } catch (err) {
        next(err);
    }
};

exports.getResetToken = async (req, res, next) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(OK)
            .json({
                result: getStatusText(OK),
                message: 'Reset password instructions sent if email was found'
            });
        }

        user.resetToken = getResetToken();
        user.resetTokenExpiration = Date.now() + 3600000;
        await user.save();

        sendMail(email, user.resetToken);

        res.status(OK)
            .json({
                result: getStatusText(OK),
                message: 'Reset password instructions sent if email was found'
            });
    } catch (err) {
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({ resetToken: token, resetTokenExpiration: {$gt: Date.now()} });

        if (!user) {
            return res.status(BAD_REQUEST)
                .json({
                    result: getStatusText(BAD_REQUEST)
                });
        };

        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.status(OK)
            .json({
                result: getStatusText(OK),
                message: 'Password updated'
            });
    } catch (err) {
        next(err);
    }
};