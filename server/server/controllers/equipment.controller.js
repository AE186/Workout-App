const Equipments = require("../data/equipment");
const validation = require("../validation/equipment");

exports.createEquipment = async (req, res) => {
  const { name } = req.body;

  try {
    const { error } = validation.equipment.validate(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        error: "Please provide valid inputs"
      });

    if (await Equipments.getWithName(name))
      return res
        .status(400)
        .send({ success: false, error: "Equipment already Exists" });

    const equipment = await Equipments.create(name);

    return res.send({ success: true, equipment });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error:"Server Side Error" });
  }
};

exports.getEquipment = async (req, res) => {
  try {
    const equipments = await Equipments.getAll();

    return res.send({ success: true, equipments });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "Server Side Error" });
  }
};

exports.updateEquipment = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const { error } = validation.equipment.validate(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        error: "Please provide valid inputs",
      });

    if (!(await Equipments.getWithId(id)))
      return res
        .status(400)
        .send({ success: false, error: "Equipment Not Found!" });

    if (await Equipments.getWithName(name))
      return res
        .status(400)
        .send({ success: false, error: "Equipment already Exists" });

    const equipment = await Equipments.update(id, name);

    res.send({ success: true, equipment });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "Server Side Error" });
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

    res.send({ success: true, message: "Equipment deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "Server Side Error" });
  }
};
