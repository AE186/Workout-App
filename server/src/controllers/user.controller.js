const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../data/user");
const userService = require("../services/userService");

const signupSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().min(3).required(),
  password: Joi.string().min(3).required(),
  dob: Joi.date().required(),
});

exports.signup = async (req, res) => {
  const { name, email, password, dob } = req.body;

  try {
    const { error } = await signupSchema.validate(req.body);
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

const loginSchema = Joi.object({
  email: Joi.string().email().min(3).required(),
  password: Joi.string().min(3).required(),
});

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = await loginSchema.validate(req.body);
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

const favoriteSchema = Joi.object({
  workoutId: Joi.string().required(),
});

exports.addFavoriteWorkout = async (req, res) => {
  const { workoutId } = req.body;

  try {
    const { error } = await favoriteSchema.validateAsync(req.body);
    if (error) throw error;

    await userService.addFavoriteWorkout(req.user.id, workoutId);

    res.send("Favorite Workout added");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.removeFavoriteWorkout = async (req, res) => {
  const { workoutId } = req.body;

  try {
    const { error } = await favoriteSchema.validateAsync(req.body);
    if (error) throw error;

    await userService.removeFavoriteWorkout(req.user.id, workoutId);

    res.send("Favorite Workout removed");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.getFavoriteWorkouts = async (req, res) => {
  try {
    const favorites = await userService.getFavoriteWorkouts(req.user.id);

    res.json(favorites);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
