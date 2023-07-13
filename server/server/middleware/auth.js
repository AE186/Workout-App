const jwt = require("jsonwebtoken")
const Users = require("../data/user");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];

    const userToken = jwt.verify(token, process.env.SECRET_TOKEN);
    
    if (!userToken.id)
      return res.status(400).send({ success: false, error: "Invalid Token" });

    const user = await Users.getUserWithId(userToken.id);

    if (!user)
      return res.status(400).send({ success: false, error: "User Not Found" });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "Access Denied" });
  }
};
