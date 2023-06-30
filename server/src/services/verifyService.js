const jwt = require("jsonwebtoken");
const user = require("../database/user");

exports.verifyToken = async (token) => {
  const userToken = jwt.verify(token, process.env.SECRET_TOKEN);
  return await user.getUserWithId(userToken.id);
};
