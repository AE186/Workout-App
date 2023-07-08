const Joi = require("Joi");

exports.muscle = Joi.object({
  name: Joi.string().min(3).required(),
});
