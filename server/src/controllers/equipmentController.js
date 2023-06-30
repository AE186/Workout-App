const Joi = require("joi");

const equipmentService = require("../services/equipmentService");

const equipmentCreateSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

exports.createEquipment = async (req, res) => {
  const { name } = req.body;

  try {
    const { error } = await equipmentCreateSchema.validateAsync(req.body);
    if (error) throw error;

    const equipment = await equipmentService.createEquipment(name);

    res.json(equipment);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.getEquipment = async (req, res) => {
  try {
    const equipments = await equipmentService.getAllEquipments();

    res.json(equipments);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
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
