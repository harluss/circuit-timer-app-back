const { OK, CREATED, NO_CONTENT, getStatusText } = require('http-status-codes');
const signToken = require('../helpers/sign-token');

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