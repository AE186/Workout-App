const db = require("./db");

exports.createUser = async (name, email, password, dob) => {
  const user = await db.user.create({
    data: {
      name: name,
      email: email,
      password: password,
      dob: dob,
    },
  });

  return user;
};

exports.checkUserExists = async (email) => {
  const users = await db.user.findMany({
    where: {
      email: email,
    },
  });

  return users.length > 0;
};

exports.getUserWithEmail = async (email) => {
  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  return user;
};

exports.getUserWithId = async (id) => {
  const user = await db.user.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      dob: true,
    },
  });

  return user;
};

exports.addFavoriteWorkout = async (id, workoutId) => {
  await db.user.update({
    where: {
      id: id,
    },
    data: {
      favorites: {
        connect: { id: workoutId },
      },
    },
  });
};

exports.removeFavoriteWorkout = async (id, workoutId) => {
  await db.user.update({
    where: {
      id: id,
    },
    data: {
      favorites: {
        disconnect: { id: workoutId },
      },
    },
  });
};

exports.getFavoriteWorkouts = async (id) => {
  const favorites = await db.user.findMany({
    where: { id: id },
    select: {
      favorites: {
        select: {
          id: true,
          name: true,
          desc: true,
          userId: true,
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
      },
    },
  });

  return favorites;
};
