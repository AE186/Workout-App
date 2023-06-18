const Joi = require("joi");

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
    const { error } = await signupSchema.validateAsync(req.body);
    if (error) throw error;

    await userService.createUser(name, email, password, dob);

    res.send("User Created");
  } catch (error) {
    console.log(error.msg);
    res.sendStatus(500);
  }
};

const loginSchema = Joi.object({
  email: Joi.string().email().min(3).required(),
  password: Joi.string().min(3).required(),
});

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = await loginSchema.validateAsync(req.body);
    if (error) throw error;

    const token = await userService.loginUser(email, password);

    res.json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error.msg);
    res.sendStatus(500);
  }
};

exports.getUser = async (req, res) => {
  try {
    const token = req.params.token;

    const user = await userService.getUser(token);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
