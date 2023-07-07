const express = require("express");
const controller = require("../controllers/exercise.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/exercises/", auth.verifyToken, controller.createExercise);

router.get("/exercises/", controller.getExercise);

router.put("/exercises/:id", auth.verifyToken, controller.updateExercise);

router.delete("/exercises/:id", auth.verifyToken, controller.deleteExercise);

module.exports = router;
