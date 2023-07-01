const Joi = require("joi");

const workoutService = require("../services/workoutService");

const workoutSchema = Joi.object({
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

exports.createWorkout = async (req, res) => {
  const { name, desc, muscles, equipments, tips, plans } = req.body;

  try {
    const { error } = await workoutSchema.validateAsync(req.body);
    if (error) throw error;

    const workout = await workoutService.createWorkout(
      name,
      desc,
      req.user.id,
      muscles,
      equipments,
      tips,
      plans
    );

    res.json(workout);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.getWorkout = async (req, res) => {
  try {
    const workouts = await workoutService.getAllWorkouts();

    res.json(workouts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.updateWorkout = async (req, res) => {
  const { name, desc, muscles, equipments, tips, plans } = req.body;
  const { id } = req.params;

  try {
    const { error } = await workoutSchema.validateAsync(req.body);
    if (error) throw error;

    const workout = await workoutService.updateWorkout(
      id,
      name,
      desc,
      muscles,
      equipments,
      tips,
      plans
    );

    res.json(workout);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    await workoutService.deleteWorkout(id);

    res.send("Workout deleted");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
