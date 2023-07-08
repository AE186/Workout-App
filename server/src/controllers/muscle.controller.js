const Muscles = require("../data/muscle");
const validation = require("../validation/muscle");

exports.createMuscle = async (req, res) => {
  const { name } = req.body;

  try {
    const { error } = await validation.muscle.validate(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        error: error.details.map(({ message }) => message),
      });

    if (await Muscles.getWithName(name))
      return res
        .status(400)
        .send({ success: false, error: "Muscle group already exists" });

    const muscle = await Muscles.create(name);

    res.send({ success: true, muscle });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

exports.getMuscle = async (req, res) => {
  try {
    const muscles = await Muscles.getAll();

    res.send({ success: true, muscles });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

exports.updateMuscle = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const { error } = await validation.muscle.validate(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        error: error.details.map(({ message }) => message),
      });

    if (!(await Muscles.getWithId(id)))
      return res
        .status(400)
        .send({ success: false, error: "Muscles group Not Found" });

    if (await Muscles.getWithName(name))
      return res
        .status(400)
        .send({ success: false, error: "Muscle group already exists" });

    const muscle = await Muscles.update(id, name);

    res.send({ success: true, muscle });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

exports.deleteMuscle = async (req, res) => {
  const { id } = req.params;

  try {
    if (!(await Muscles.getWithId(id)))
      return res
        .status(400)
        .send({ success: false, error: "Muscles group Not Found" });

    await Muscles.delete(id);

    res.send({ success: true, message: "Muscle group Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};
