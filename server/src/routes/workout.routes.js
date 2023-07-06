const express = require("express");
const controller = require("../controllers/workout.controller");
const auth = require("../middleware/auth")

const router = express.Router();

router.post("/", auth.verifyToken, controller.createWorkout);

router.get("/", controller.getWorkout);

router.put("/:id", auth.verifyToken, controller.updateWorkout);

router.delete("/:id", auth.verifyToken, controller.deleteWorkout);

module.exports = router;
