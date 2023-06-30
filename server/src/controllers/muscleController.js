const Joi = require("joi");

const muscleService = require("../services/muscleService");

const muscleCreateSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

exports.createMuscle = async (req, res) => {
  const { name } = req.body;

  try {
    const { error } = await muscleCreateSchema.validateAsync(req.body);
    if (error) throw error;

    const muscle = await muscleService.createMuscle(name);

    res.json(muscle);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.getMuscle = async (req, res) => {
  try {
    const muscles = await muscleService.getAllMuscles();

    res.json(muscles);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const muscleUpdateSchema = Joi.object({
  id: Joi.string().min(10).required(),
  name: Joi.string().min(3).required(),
});

exports.updateMuscle = async (req, res) => {
  const { id, name } = req.body;

  try {
    const { error } = await muscleUpdateSchema.validateAsync(req.body);
    if (error) throw error;

    const muscle = await muscleService.updateMuscle(id, name);

    res.json(muscle);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.deleteMuscle = async (req, res) => {
  const { id } = req.params;

  try {
    await muscleService.deleteMuscle(id);

    res.send("Muscle Deleted");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
