const equipment = require("../database/equipment");

exports.createEquipment = async (name) => {
  return await equipment.create(name);
};

exports.getAllEquipments = async () => {
  return await equipment.getAll();
};

exports.updateEquipment = async (id, name) => {
  return await equipment.update(id, name);
};

exports.deleteEquipment = async (id) => {
  return await equipment.delete(id);
};
