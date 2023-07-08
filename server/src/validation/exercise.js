const Joi = require('Joi')

exports.exercise = Joi.object({
  name: Joi.string().min(3).required(),
});