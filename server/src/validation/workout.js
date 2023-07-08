const Joi = require("Joi");

exports.workout = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  muscles: Joi.array()
    .items(Joi.object({ id: Joi.string().required() }))
    .required(),
  equipments: Joi.array()
    .items(Joi.object({ id: Joi.string().required() }))
    .required(),
  tips: Joi.array()
    .items(Joi.object({ tip: Joi.string().required() }))
    .required(),
  plans: Joi.array()
    .items(
      Joi.object({
        exerciseId: Joi.string().required(),
        sets: Joi.number().required(),
        reps: Joi.number().required(),
      })
    )
    .required(),
});
