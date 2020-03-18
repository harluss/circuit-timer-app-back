const joi = require('@hapi/joi');
const { BAD_REQUEST, getStatusText } = require('http-status-codes');

exports.schemas = {
    signup: joi.object().keys({
        email: joi.string()
            .trim()
            .email()
            .required(),
        name: joi.string()
            .trim()
            .min(3)
            .max(30)
            .required(),
        password: joi.string()
            .trim()
            .alphanum()
            .min(6)
            .required()
    }),
    login: joi.object().keys({
        email: joi.string()
            .trim()
            .email()
            .required(),
        password: joi.string()
            .trim()
            .alphanum()
            .min(6)
            .required()
    }),
    timer: joi.object().keys({
        name: joi.string()
            .trim()
            .min(3)
            .max(30)
            .required(),
        rounds_number: joi.number()
            .required(),
        rounds_timer: joi.number()
            .required(),
        rests_timer: joi.number()
            .required()
    })
};

exports.validateInput = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(BAD_REQUEST)
                .json({
                    result: getStatusText(BAD_REQUEST),
                    data: error.details.map(detail => detail.message)
                });
        }

        next();
    }
}