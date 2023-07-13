const express = require("express");
const controller = require("../controllers/workout.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/workouts/", auth.verifyToken, controller.createWorkout);

router.get("/workouts/", controller.getWorkout);

router.put("/workouts/:workoutId", auth.verifyToken, controller.updateWorkout);

router.delete(
  "/workouts/:workoutId",
  auth.verifyToken,
  controller.deleteWorkout
);

router.post("/comment/:workoutId", auth.verifyToken, controller.addComment);

router.delete(
  "/comment/:workoutId&:commentId",
  auth.verifyToken,
  controller.removeComment
);

router.post("/reply/:commentId", auth.verifyToken, controller.addReply);

router.delete(
  "/reply/:commentId&:replyId",
  auth.verifyToken,
  controller.removeReply
);

module.exports = router;
