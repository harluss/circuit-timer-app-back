const passport = require('passport');
require('../config/authentication');

module.exports = (strategy) => {
  return passport.authenticate(strategy, {
    session: false,
  });
};
