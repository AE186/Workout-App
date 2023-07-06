const Joi = require("joi");
const Equipment = require("../data/equipment");

const equipmentService = require("../services/equipmentService");

const equipmentCreateSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

exports.createEquipment = async (req, res) => {
  const { name } = req.body;

  try {
    const { error } = equipmentCreateSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, error: "Invalid inputs provided" });

    if (Equipment.getWithName(name))
      return res
        .status(400)
        .send({ success: false, error: "Equipment already Exists" });

    const equipment = await Equipment.create(name);

    return res.send({ success: true, equipment });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error });
  }
};

exports.getEquipment = async (req, res) => {
  try {
    const equipments = await Equipment.getAll();

    return res.send({ success: true, equipments });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error });
  }
};

const equipmentUpdateSchema = Joi.object({
  id: Joi.string().min(10).required(),
  name: Joi.string().min(3).required(),
});

exports.updateEquipment = async (req, res) => {
  const { id, name } = req.body;

  try {
    const { error } = await equipmentUpdateSchema.validateAsync(req.body);
    if (error) throw error;

    const equipment = await equipmentService.updateEquipment(id, name);

    res.json(equipment);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.deleteEquipment = async (req, res) => {
  const { id } = req.params;

  try {
    await equipmentService.deleteEquipment(id);

    res.send("Equipment Deleted");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
