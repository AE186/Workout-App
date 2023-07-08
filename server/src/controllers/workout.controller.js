const Workouts = require("../data/workout");
const Equipments = require("../data/equipment");
const Exercises = require("../data/exercise");
const Muscles = require("../data/muscle");
const validation = require("../validation/workout");

exports.createWorkout = async (req, res) => {
  const { name, desc, muscles, equipments, tips, plans } = req.body;

  try {
    const { error } = await validation.workout.validate(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        error: error.details.map(({ message }) => message),
      });

    let errorMessages = [];

    for (const ele of muscles)
      if (!(await Muscles.getWithId(ele.id)))
        errorMessages.push(`Muscle group with id ${ele.id} Not Found`);

    for (const ele of equipments)
      if (!(await Equipments.getWithId(ele.id)))
        errorMessages.push(`Equipment with id ${ele.id} Not Found`);

    for (const ele of plans)
      if (!(await Exercises.getWithId(ele.exerciseId)))
        errorMessages.push(`Exercise with id ${ele.exerciseId} Not Found`);

    if (errorMessages.length > 0)
      return res.status(400).send({
        success: false,
        error: errorMessages,
      });

    const workout = await Workouts.create(
      name,
      desc,
      req.user.id,
      muscles,
      equipments,
      tips,
      plans
    );

    res.send({ success: true, workout });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

exports.getWorkout = async (req, res) => {
  try {
    const workouts = await Workouts.getAll();

    res.send({ success: true, workouts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

exports.updateWorkout = async (req, res) => {
  const { name, desc, muscles, equipments, tips, plans } = req.body;
  const { id } = req.params;

  try {
    const { error } = await validation.workout.validate(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        error: error.details.map(({ message }) => message),
      });

    if (!(await Workouts.getWithId(id)))
      return res
        .status(400)
        .send({ success: false, error: "Workout not found" });

    let errorMessages = [];

    for (const ele of muscles)
      if (!(await Muscles.getWithId(ele.id)))
        errorMessages.push(`Muscle group with id ${ele.id} Not Found`);

    for (const ele of equipments)
      if (!(await Equipments.getWithId(ele.id)))
        errorMessages.push(`Equipment with id ${ele.id} Not Found`);

    for (const ele of plans)
      if (!(await Exercises.getWithId(ele.exerciseId)))
        errorMessages.push(`Exercise with id ${ele.exerciseId} Not Found`);

    if (errorMessages.length > 0)
      return res.status(400).send({
        success: false,
        error: errorMessages,
      });

    const workout = await Workouts.update(
      id,
      name,
      desc,
      req.user.id,
      muscles,
      equipments,
      tips,
      plans
    );

    res.send({ success: true, workout });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    if (!(await Workouts.getWithId(id)))
      return res
        .status(400)
        .send({ success: false, error: "Workout not found" });

    await Workouts.delete(id);

    res.send({ success: true, message: "Workout deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};
