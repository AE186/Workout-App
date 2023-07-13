const db = require("./db");

exports.getWithId = async (id) => {
  const reply = await db.reply.findFirst({ where: { id: id } });
  return reply;
};

exports.create = async (userId, commentId, reply) => {
  const replyCreated = await db.reply.create({
    data: {
      reply,
      userId,
      commentId,
    },
    select: {
      id: true,
      reply: true,
      userId: true,
    },
  });
  return replyCreated;
};

exports.remove = async (id) => {
  await db.reply.update({
    where: { id: id },
    data: {
      reply: "",
      removed: true,
    },
  });
};
