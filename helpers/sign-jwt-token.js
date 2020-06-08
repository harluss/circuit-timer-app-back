const jwt = require('jsonwebtoken');

module.exports = userId => {
    return jwt.sign({
        iss: process.env.APP_NAME,
        sub: userId
    }, process.env.JWT_SECRET, { expiresIn: '3h' });
}