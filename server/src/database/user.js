const { Prisma } = require('.prisma/client')
const db = require('./db')

exports.createUser = async (name, email, password, dob) => {
    const user = await db.user.create({
        data: {
            name: name,
            email: email,
            password: password,
            dob: dob,
        }
    })

    return user
}

exports.checkUserExists = async (email) => {
    const users = await db.user.findMany({
        where: {
            email: email
        }
    })

    return users.length > 0
}

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
        name: true,
        email: true,
        dob: true
    }
  });

  return user;
} 