const db = require("./db");

exports.create = async (name) => {
  const muscle = await db.muscle.create({
    data: {
      name: name,
    },
  });

  return muscle;
};

exports.getAll = async () => {
  const muscles = await db.muscle.findMany();
  return muscles;
};

exports.getWithName = async (name) => {
  const muscle = await db.muscle.findFirst({ where: { name: name } });
  return muscle;
};

exports.getWithId = async (id) => {
  const muscle = await db.muscle.findFirst({ where: { id: id } });
  return muscle;
};

exports.update = async (id, name) => {
  const muscleUpdated = await db.muscle.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });

  return muscleUpdated;
};

exports.delete = async (id) => {
  await db.muscle.delete({
    where: {
      id: id,
    },
  });
};
