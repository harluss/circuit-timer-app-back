const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (userId) => {
  return jwt.sign(
    {
      iss: config.app.name,
      sub: userId,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiry },
  );
};
