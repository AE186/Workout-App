const db = require("./db");

exports.create = async (name) => {
  const exercise = await db.exercise.create({
    data: {
      name: name,
    },
  });

  return exercise;
};

exports.getAll = async () => {
  const exercises = await db.exercise.findMany();
  return exercises;
};

exports.getWithName = async (name) => {
  const exercise = await db.exercise.findFirst({ where: { name: name } });
  return exercise;
};

exports.getWithId = async (id) => {
  const exercise = await db.exercise.findFirst({ where: { id: id } });
  return exercise;
}

exports.update = async (id, name) => {
  const exerciseUpdated = await db.exercise.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });

  return exerciseUpdated;
};

exports.delete = async (id) => {
  await db.exercise.delete({
    where: {
      id: id,
    },
  });
};
