const User = require('../models/user-model');
const { OK, CREATED, NO_CONTENT, NOT_FOUND, getStatusText } = require('http-status-codes');
const brcypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
    const { email, name, password } = req.body;
    const SALT_ROUNDS = 10;

    try {
        const hashedPassword = await brcypt.hash(password, SALT_ROUNDS);
        const user = new User({
            email: email,
            name: name,
            password: hashedPassword
        });
        const savedUser = await user.save();

        res.status(CREATED)
            .json({
                result: getStatusText(CREATED),
                data: savedUser
            });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    // User login
    res.send('User login');
};