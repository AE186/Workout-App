const db = require("./db");

exports.create = async (name) => {
  const equipment = await db.equipment.create({
    data: {
      name: name,
    },
  });

  return equipment;
};

exports.getWithName = async (name) => {
  const equipment = await db.equipment.findFirst({
    where: {
      name: name,
    },
  });
  return equipment;
};

exports.getAll = async () => {
  const equipments = await db.equipment.findMany();
  return equipments;
};

exports.getWithId = async (id) => {
  const equipment = await db.equipment.findFirst({ where: { id: id } });
  return equipment;
};

exports.update = async (id, name) => {
  const equipmentUpdated = await db.equipment.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });

  return equipmentUpdated;
};

exports.delete = async (id) => {
  await db.equipment.delete({
    where: {
      id: id,
    },
  });
};
