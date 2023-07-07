const Joi = require("joi");
const Equipments = require("../data/equipment");

const equipmentService = require("../services/equipmentService");

const equipmentSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

exports.createEquipment = async (req, res) => {
  const { name } = req.body;

  try {
    const { error } = equipmentSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, error: "Invalid inputs provided" });
    
    console.log(await Equipments.getWithName(name), " Equipment Create")
    if (await Equipments.getWithName(name))
      return res
        .status(400)
        .send({ success: false, error: "Equipment already Exists" });

    const equipment = await Equipments.create(name);

    return res.send({ success: true, equipment });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error });
  }
};

exports.getEquipment = async (req, res) => {
  try {
    const equipments = await Equipments.getAll();

    return res.send({ success: true, equipments });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error });
  }
};

exports.updateEquipment = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const { error } = equipmentSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, error: "Invalid inputs provided" });

    if (!(await Equipments.getWithId(id)))
      return res
        .status(400)
        .send({ success: false, error: "Equipment Not Found!" });

    const equipment = await Equipments.update(id, name);

    res.send({ success: true, equipment });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error });
  }
};

exports.deleteEquipment = async (req, res) => {
  const { id } = req.params;

  try {
    if (!(await Equipments.getWithId(id)))
      return res
        .status(400)
        .send({ success: false, error: "Equipment Not Found!" });

    await Equipments.delete(id);

    res.send({ success: true, message:"Equipment deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error });
  }
};
