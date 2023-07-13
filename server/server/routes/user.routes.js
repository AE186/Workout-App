const express = require("express");
const controller = require("../controllers/user.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/signup", controller.signup);

router.post("/login", controller.login);

router.get("/auth/:token", controller.getUser);

router.get("/user/workouts", auth.verifyToken, controller.getWorkouts);

router.patch(
  "/favorite/add/:id",
  [auth.verifyToken],
  controller.addFavoriteWorkout
);

router.patch(
  "/favorite/remove/:id",
  [auth.verifyToken],
  controller.removeFavoriteWorkout
);

router.get("/favorite", [auth.verifyToken], controller.getFavoriteWorkouts);

module.exports = router;
