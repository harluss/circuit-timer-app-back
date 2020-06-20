const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = (userId) => {
  return jwt.sign(
    {
      iss: config.app.name,
      sub: userId,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiry }
  );
};
