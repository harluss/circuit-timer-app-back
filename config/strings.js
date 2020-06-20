module.exports = {
  resetTokenSent: 'Reset password token sent (if email was found)',
  passwordUpdated: 'Password updated successfully',
  sendGrid: {
    emailTopic: 'Password reset token',
    emailContent: (token, expiry) =>
      `Password reset token: ${token} (expires in ${expiry} minutes).`,
  },
};
