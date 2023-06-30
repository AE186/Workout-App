const Joi = require("joi");

const exerciseService = require("../services/exerciseService");

const exerciseCreateSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

exports.createExercise = async (req, res) => {
  const { name } = req.body;

  try {
    const { error } = await exerciseCreateSchema.validateAsync(req.body);
    if (error) throw error;

    const exercise = await exerciseService.createExercise(name);

    res.json(exercise);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.getExercise = async (req, res) => {
  try {
    const exercises = await exerciseService.getAllExercises();

    res.json(exercises);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const exerciseUpdateSchema = Joi.object({
  id: Joi.string().min(10).required(),
  name: Joi.string().min(3).required(),
});

exports.updateExercise = async (req, res) => {
  const { id, name } = req.body;

  try {
    const { error } = await exerciseUpdateSchema.validateAsync(req.body);
    if (error) throw error;

    const exercise = await exerciseService.updateExercise(id, name);

    res.json(exercise);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.deleteExercise = async (req, res) => {
  const { id } = req.params;

  try {
    await exerciseService.deleteExercise(id);

    res.send("Exercise Deleted");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
