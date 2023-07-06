const express = require("express");
const controller = require("../controllers/exercise.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth.verifyToken, controller.createExercise);

router.get("/", controller.getExercise);

router.put("/:id", auth.verifyToken, controller.updateExercise);

router.delete("/:id", auth.verifyToken, controller.deleteExercise);

module.exports = router;
