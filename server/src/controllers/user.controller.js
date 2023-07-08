const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../data/user");
const Workouts = require("../data/workout");
const validation = require("../validation/user");

exports.signup = async (req, res) => {
  const { name, email, password, dob } = req.body;

  try {
    const { error } = await validation.signup.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, error: "Invalid Inputs provided" });

    const user = Users.getUserWithEmail(email);

    if (user)
      return res
        .status(400)
        .send({ success: false, error: "User already exists" });

    await Users.create(name, email, password, dob);

    return res.send({ success: true, message: "User successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = await validation.login.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, error: "Invalid Inputs provided" });

    const user = await Users.getUserWithEmail(email);

    if (!user)
      return res
        .status(400)
        .send({ success: false, error: "Invalid Email or Password provided" });

    if (!(await bcrypt.compare(password, user.password)))
      return res
        .status(400)
        .send({ success: false, error: "Invalid Email or Password provided" });

    const token = jwt.sign(
      { id: user.id, date: new Date() },
      process.env.SECRET_TOKEN
    );

    return res.send({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const token = req.params.token;

    const userToken = jwt.verify(token, process.env.SECRET_TOKEN);

    if (!userToken.id)
      return res.status(400).send({ success: false, error: "Invalid Token" });

    const user = await Users.getUserWithId(userToken.id);

    if (!user)
      return res.status(400).send({ success: false, error: "User Not Found" });

    res.send({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error });
  }
};

exports.addFavoriteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    if (!(await Workouts.getWithId(id)) || !id)
      return res
        .status(400)
        .send({ success: false, error: "Workout Not Found" });

    await Users.addFavoriteWorkout(req.user.id, id);

    res.send({ success: true, message: "Favorite Workout added" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error });
  }
};

exports.removeFavoriteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    if (!(await Workouts.getWithId(id)) || !id)
      return res
        .status(400)
        .send({ success: false, error: "Workout Not Found" });

    await Users.removeFavoriteWorkout(req.user.id, id);

    res.send({ success: true, message: "Favorite Workout removed" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error });
  }
};

exports.getFavoriteWorkouts = async (req, res) => {
  try {
    const workouts = await Users.getFavoriteWorkouts(req.user.id);

    res.send({ success: true, workouts: workouts.favorites });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error });
  }
};
