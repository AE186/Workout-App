const db = require("./db");

const select = {
  id: true,
  name: true,
  desc: true,
  user: {
    select: { email: true }
  },
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
          name: true
        }
      }
    }
  },
  comments: {
    select: {
      id: true,
      comment: true,
      removed: true,
      user: {
        select: { email: true }
      },
      createdAt: true,
      replies: {
        select: {
          id: true,
          reply: true,
          removed: true,
          user: {
            select: { email: true }
          },
          createdAt: true
        }
      }
    }
  }
};

const dataCreation = (
  name,
  desc,
  userId,
  muscles,
  equipments,
  tips,
  plans
) => ({
  name: name,
  desc: desc,
  userId: userId,
  muscles: {
    set: muscles,
  },
  equipments: {
    set: equipments,
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
});

exports.create = async (
  name,
  desc,
  userId,
  muscles,
  equipments,
  tips,
  plans
) => {
  const data = dataCreation(
    name,
    desc,
    userId,
    muscles,
    equipments,
    tips,
    plans
  );

  const workout = await db.workout.create({
    data,
    select,
  });

  return workout;
};

exports.getAll = async () => {
  const workouts = await db.workout.findMany({
    select,
  });
  return workouts;
};

exports.getWithId = async (id) => {
  const workout = db.workout.findFirst({ where: { id: id } });
  return workout;
};

exports.update = async (
  id,
  name,
  desc,
  userId,
  muscles,
  equipments,
  tips,
  plans
) => {
  const data = dataCreation(
    name,
    desc,
    userId,
    muscles,
    equipments,
    tips,
    plans
  );

  const [deletedTip, deletedPlan, workout] = await db.$transaction([
    db.tip.deleteMany({ where: { workoutId: id } }),
    db.plan.deleteMany({ where: { workoutId: id } }),
    db.workout.update({
      where: { id: id },
      data,
      select,
    }),
  ]);

  return workout;
};

exports.delete = async (id) => {
  await db.workout.delete({
    where: {
      id: id,
    },
  });
};
