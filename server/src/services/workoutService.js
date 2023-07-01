const workout = require("../database/workout");

exports.createWorkout = async (
  name,
  desc,
  userId,
  muscles,
  equipments,
  tips,
  plans
) => {
  return await workout.create(
    name,
    desc,
    userId,
    muscles,
    equipments,
    tips,
    plans
  );
};

exports.getAllWorkouts = async () => {
  return await workout.getAll();
};

exports.updateWorkout = async (
  id,
  name,
  desc,
  muscles,
  equipments,
  tips,
  plans
) => {
  await workout.emptyDetails(id);
  return await workout.update(id, name, desc, muscles, equipments, tips, plans);
};

exports.deleteWorkout = async (id) => {
  await workout.emptyDetails(id);
  await workout.delete(id);
};
