const express = require("express");
const controller = require("../controllers/workout.controller");
const auth = require("../middleware/auth")

const router = express.Router();

router.post("/workouts/", auth.verifyToken, controller.createWorkout);

router.get("/workouts/", controller.getWorkout);

router.put("/workouts/:id", auth.verifyToken, controller.updateWorkout);

router.delete("/workouts/:id", auth.verifyToken, controller.deleteWorkout);

module.exports = router;
