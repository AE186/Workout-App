const express = require("express");
const muscleController = require("../controllers/muscleController");

const router = express.Router();

router.post("/", muscleController.createMuscle);

router.get("/", muscleController.getMuscle);

router.put("/", muscleController.updateMuscle);

router.delete("/:id", muscleController.deleteMuscle);

module.exports = router;
