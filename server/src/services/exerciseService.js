const exercise = require("../data/exercise");

exports.createExercise = async (name) => {
  return await exercise.create(name);
};

exports.getAllExercises = async () => {
  return await exercise.getAll();
};

exports.updateExercise = async (id, name) => {
  return await exercise.update(id, name);
};

exports.deleteExercise = async (id) => {
  return await exercise.delete(id);
};
