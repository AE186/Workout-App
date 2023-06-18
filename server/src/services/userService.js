const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userData = require("../database/user");

exports.createUser = async (name, email, password, dob) => {
  if (await userData.checkUserExists(email))
    throw new Error("User already Exists");

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  await userData.createUser(name, email, hashedPassword, dob);
};

exports.loginUser = async (email, password) => {
  const user = await userData.getUserWithEmail(email);

  if (!(await bcrypt.compare(password, user.password)))
    throw new Error("Passwords don't match");

  const token = jwt.sign(
    { id: user.id, date: new Date() },
    process.env.SECRET_TOKEN
  );

  return token;
};

exports.getUser = async (token) => {
  const userToken = jwt.verify(token, process.env.SECRET_TOKEN);

  const user = userData.getUserWithId(userToken.id);

  return user;
};
