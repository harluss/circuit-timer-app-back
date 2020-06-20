const sendgridMail = require('@sendgrid/mail');
const config = require('../config/config');
const strings = require('../config/strings');

sendgridMail.setApiKey(config.sendgrid.apiKey);

module.exports = (email, token) => {
  const message = {
    to: email,
    from: config.app.email,
    subject: strings.sendGrid.emailTopic,
    text: strings.sendGrid.emailContent(
      token,
      config.resetToken.expiry / (1000 * 60),
    ),
  };

  sendgridMail.send(message);
};
