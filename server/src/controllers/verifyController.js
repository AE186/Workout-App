const verifyService = require("../services/verifyService");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];

    const user = await verifyService.verifyToken(token);
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
