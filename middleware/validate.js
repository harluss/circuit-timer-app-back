const { BAD_REQUEST, getStatusText } = require('http-status-codes');

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(BAD_REQUEST).json({
        result: getStatusText(BAD_REQUEST),
        data: error.details.map((detail) => detail.message),
      });
    }

    next();
  };
};
