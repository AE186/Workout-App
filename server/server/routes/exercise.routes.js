const express = require("express");
const controller = require("../controllers/exercise.controller");
const verify = require("../middleware/verify");

const router = express.Router();

router.post("/exercises/", verify, controller.createExercise);

router.get("/exercises/", controller.getExercise);

router.put("/exercises/:id", verify, controller.updateExercise);

router.delete("/exercises/:id", verify, controller.deleteExercise);

module.exports = router;
