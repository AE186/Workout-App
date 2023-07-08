const Joi = require('Joi')

exports.signup = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().min(3).required(),
  password: Joi.string().min(3).required(),
  dob: Joi.date().required(),
});

exports.login = Joi.object({
  email: Joi.string().email().min(3).required(),
  password: Joi.string().min(3).required(),
});