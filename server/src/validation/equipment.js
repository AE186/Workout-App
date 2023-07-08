const Joi = require('Joi')

exports.equipment = Joi.object({
  name: Joi.string().min(3).required(),
});