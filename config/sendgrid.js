const sendgridMail = require('@sendgrid/mail');

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (email, token) => {
  // TODO: Exact message to be updated based on front-end requirements
  const message = {
    to: email,
    from: process.env.APP_EMAIL,
    subject: 'Password reset token',
    text: `Password reset token: ${token} (expires in 1 hour).` 
  }

  sendgridMail.send(message);
}