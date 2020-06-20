const joi = require('@hapi/joi');

const schemas = {
  signup: joi.object().keys({
    email: joi.string().trim().email().required(),
    name: joi.string().trim().min(3).max(30).required(),
    password: joi.string().trim().alphanum().min(8).required(),
  }),
  login: joi.object().keys({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().alphanum().min(6).required(),
  }),
  timer: joi.object().keys({
    name: joi.string().trim().min(3).max(30).required(),
    rounds_number: joi.number().integer().min(1).max(100).required(),
    rounds_timer: joi.number().integer().min(1).max(3600).required(),
    rests_timer: joi.number().integer().min(0).max(3600).required(),
  }),
};

module.exports = schemas;
