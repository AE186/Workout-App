const express = require("express");
const controller = require("../controllers/workout.controller");
const verify = require("../middleware/verify");

const router = express.Router();

router.post("/workouts/", verify, controller.createWorkout);

router.get("/workouts/", controller.getWorkout);

router.put("/workouts/:workoutId", verify, controller.updateWorkout);

router.delete("/workouts/:workoutId", verify, controller.deleteWorkout);

router.post("/comment/:workoutId", verify, controller.addComment);

router.delete(
  "/comment/:workoutId&:commentId",
  verify,
  controller.removeComment
);

router.post("/reply/:commentId", verify, controller.addReply);

router.delete("/reply/:commentId&:replyId", verify, controller.removeReply);

module.exports = router;
