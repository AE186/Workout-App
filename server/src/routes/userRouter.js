const express = require("express");
const userController = require("../controllers/userController");
const verifyController = require("../controllers/verifyController");

const router = express.Router();

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get("/auth/:token", userController.getUser);

router.post(
  "/favorite/add",
  [verifyController.verifyToken],
  userController.addFavoriteWorkout
);

router.post(
  "/favorite/remove",
  [verifyController.verifyToken],
  userController.removeFavoriteWorkout
);

router.get(
  "/favorite",
  [verifyController.verifyToken],
  userController.getFavoriteWorkouts
);

module.exports = router;
