const express = require("express");
const controller = require("../controllers/user.controller");
const verify = require("../middleware/verify");
const uploadFile = require("../middleware/uploadFile");

const router = express.Router();

router.post("/signup", controller.signup);

router.post("/login", controller.login);

router.get("/auth/:token", controller.getUser);

router.get("/user/workouts/:email", controller.getWorkouts);

router.patch("/user/favorites/add/:id", verify, controller.addFavoriteWorkout);

router.patch(
  "/user/favorites/remove/:id",
  verify,
  controller.removeFavoriteWorkout
);

router.get("/user/favorites", verify, controller.getFavoriteWorkouts);

router.get("/user/profile-pic/:email", controller.getProfilePic);

router.post(
  "/user/profile-pic",
  [verify, uploadFile],
  controller.uploadProfilePic
);

router.delete("/user/profile-pic", verify, controller.removeProfilePic);

module.exports = router;
