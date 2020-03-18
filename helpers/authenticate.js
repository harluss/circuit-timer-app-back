const passport = require('passport');
const passportConfig = require('../config/authentication');

module.exports = strategy => {
    return passport.authenticate(strategy, { session: false });
}