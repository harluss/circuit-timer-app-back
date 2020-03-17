const { OK, CREATED, getStatusText } = require('http-status-codes');
const signToken = require('../helpers/sign-token');

exports.signup = (req, res, next) => {
    const savedUser = req.user;

    res.status(CREATED)
        .json({
            result: getStatusText(CREATED),
            data: savedUser
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