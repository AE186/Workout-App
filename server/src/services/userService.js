const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = require("../data/user");

exports.createUser = async (name, email, password, dob) => {
  if (await user.checkUserExists(email)) throw new Error("User already Exists");

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  await user.createUser(name, email, hashedPassword, dob);
};

exports.loginUser = async (email, password) => {
  const user = await user.getUserWithEmail(email);

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

  return await user.getUserWithId(userToken.id);
};

exports.addFavoriteWorkout = async (id, workoutId) => {
  await user.addFavoriteWorkout(id, workoutId);
};

exports.removeFavoriteWorkout = async (id, workoutId) => {
  await user.removeFavoriteWorkout(id, workoutId);
};

exports.getFavoriteWorkouts = async (id) => {
  return await user.getFavoriteWorkouts(id);
};
