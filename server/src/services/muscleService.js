const muscle = require("../data/muscle");

exports.createMuscle = async (name) => {
  return await muscle.create(name);
};

exports.getAllMuscles = async () => {
  return await muscle.getAll();
};

exports.updateMuscle = async (id, name) => {
  return await muscle.update(id, name);
};

exports.deleteMuscle = async (id) => {
  return await muscle.delete(id);
};
