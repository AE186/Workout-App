const db = require("./db");

exports.create = async (name, email, password, dob) => {
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
  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  return users ? true : false;
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

const select = {
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
  comments: {
    select: {
      id: true,
      comment: true,
      removed: true,
      userId: true,
      createdAt: true,
      replies: {
        select: {
          id: true,
          reply: true,
          removed: true,
          userId: true,
          createdAt: true,
        },
      },
    },
  },
};

exports.getFavoriteWorkouts = async (id) => {
  const favorites = await db.user.findFirst({
    where: { id: id },
    select: {
      favorites: {
        select,
      },
    },
  });

  return favorites;
};

exports.getWorkouts = async (id) => {
  const favorites = await db.user.findFirst({
    where: { id: id },
    select: {
      workouts: {
        select,
      },
    },
  });

  return favorites;
};

exports.addImgURL = async (id, url) => {
  const user = await db.user.update({
    where: { id: id },
    data: {
      img: url,
    },
  });

  return user;
};

exports.removeImgURL = async (id) => {
  const user = await db.user.update({
    where: { id: id },
    data: {
      img: "",
    },
  });

  return user;
};

exports.getImgURL = async (id) => {
  const user = await db.user.findFirst({
    where: { id: id },
    select: {
      img: true,
    },
  });

  return user;
};
