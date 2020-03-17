const passport = require('passport');
const passportConfig = require('../config/passport');

module.exports = strategy => {
    return passport.authenticate(strategy, { session: false });
}