const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  database: {
    url: process.env.DB_CONNECTION_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: '3h',
  },
  resetToken: {
    // milliseconds
    expiry: 60 * 60 * 1000,
  },
  bcrypt: {
    saltRounds: 10,
  },
  app: {
    name: process.env.APP_NAME,
    email: process.env.APP_EMAIL,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
  },
};
