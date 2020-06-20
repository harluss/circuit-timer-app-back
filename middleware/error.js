const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

module.exports = (error, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message, data } = error;

  res.status(statusCode).json({
    result: getStatusText(statusCode),
    message,
    data,
  });
};
