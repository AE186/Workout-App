const Exercises = require("../data/exercise");
const validation = require("../validation/exercise");

exports.createExercise = async (req, res) => {
  const { name } = req.body;

  try {
    const { error } = await validation.exercise.validate(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        error: error.details.map(({ message }) => message),
      });

    if (await Exercises.getWithName(name))
      return res
        .status(400)
        .send({ success: false, error: "Exercise Already Exists" });

    const exercise = await Exercises.create(name);

    res.send({ success: true, exercise });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

exports.getExercise = async (req, res) => {
  try {
    const exercises = await Exercises.getAll();

    res.send({ success: true, exercises });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

exports.updateExercise = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const { error } = await validation.exercise.validate(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        error: error.details.map(({ message }) => message),
      });

    if (!(await Exercises.getWithId(id)))
      return res
        .status(400)
        .send({ success: false, error: "Exercise Not Found!" });

    if (await Exercises.getWithName(name))
      return res
        .status(400)
        .send({ success: false, error: "Exercise Already Exists" });

    const exercise = await Exercises.update(id, name);

    res.send({ success: true, exercise });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

exports.deleteExercise = async (req, res) => {
  const { id } = req.params;

  try {
    if (!(await Exercises.getWithId(id)))
      return res
        .status(400)
        .send({ success: false, error: "Exercise Not Found!" });

    await Exercises.delete(id);

    res.send({ success: true, message: "Exercise Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};
