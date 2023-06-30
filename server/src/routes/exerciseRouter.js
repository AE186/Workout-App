const express = require("express");
const exerciseController = require("../controllers/exerciseController");

const router = express.Router();

router.post("/", exerciseController.createExercise);

router.get("/", exerciseController.getExercise);

router.put("/", exerciseController.updateExercise);

router.delete("/:id", exerciseController.deleteExercise);

module.exports = router;
