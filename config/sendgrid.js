const config = require('./config');
const sendgridMail = require('@sendgrid/mail');

sendgridMail.setApiKey(config.sendgrid.apiKey);

module.exports = (email, token) => {
  // TODO: Exact message to be updated based on front-end requirements
  const message = {
    to: email,
    from: config.app.email,
    subject: 'Password reset token',
    text: `Password reset token: ${token} (expires in ${config.jwt.expiry}).`,
  };

  sendgridMail.send(message);
};
