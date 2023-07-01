const db = require("./db");

exports.create = async (
  name,
  desc,
  userId,
  muscles,
  equipments,
  tips,
  plans
) => {
  const workout = await db.workout.create({
    data: {
      name: name,
      desc: desc,
      userId: userId,
      muscles: {
        connect: muscles,
      },
      equipments: {
        connect: equipments,
      },
      tips: {
        createMany: {
          data: tips,
        },
      },
      plans: {
        createMany: {
          data: plans,
        },
      },
    },
    include: {
      muscles: true,
      equipments: true,
      tips: true,
      plans: {
        select: {
          id: true,
          sets: true,
          reps: true,
          exercise: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return workout;
};

exports.getAll = async () => {
  const workouts = await db.workout.findMany({
    include: {
      muscles: true,
      equipments: true,
      tips: true,
      plans: {
        select: {
          id: true,
          sets: true,
          reps: true,
          exercise: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return workouts;
};

exports.emptyDetails = async (id) => {
  await db.workout.update({
    where: {
      id: id,
    },
    data: {
      name: "",
      desc: "",
      muscles: {
        set: [],
      },
      equipments: {
        set: [],
      },
      tips: {
        deleteMany: {},
      },
      plans: {
        deleteMany: {},
      },
    },
  });
};

exports.update = async (id, name, desc, muscles, equipments, tips, plans) => {
  const workout = await db.workout.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      desc: desc,
      muscles: {
        connect: muscles,
      },
      equipments: {
        connect: equipments,
      },
      tips: {
        createMany: {
          data: tips,
        },
      },
      plans: {
        createMany: {
          data: plans,
        },
      },
    },
    include: {
      muscles: true,
      equipments: true,
      tips: true,
      plans: {
        select: {
          id: true,
          sets: true,
          reps: true,
          exercise: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return workout;
};

exports.delete = async (id) => {
  await db.workout.delete({
    where: {
      id: id,
    },
  });
};
