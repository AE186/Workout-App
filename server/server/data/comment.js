const db = require("./db");

exports.getWithId = async (id) => {
  const comment = await db.comment.findFirst({ where: { id: id } });
  return comment;
};

exports.create = async (userId, workoutId, comment) => {
  const commentCreated = await db.comment.create({
    data: {
      comment,
      userId,
      workoutId,
    },
    select: {
      comment: true,
      id: true,
      userId: true,
    },
  });
  return commentCreated;
};

exports.remove = async (id) => {
  await db.comment.update({
    where: { id: id },
    data: {
      comment: "",
      removed: true,
    },
  });
};
