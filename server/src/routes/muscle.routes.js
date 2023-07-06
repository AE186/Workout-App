const express = require("express");
const controller = require("../controllers/muscle.controller");
const auth = require("../middleware/auth")

const router = express.Router();

router.post("/", auth.verifyToken, controller.createMuscle);

router.get("/", controller.getMuscle);

router.put("/:id", auth.verifyToken, controller.updateMuscle);

router.delete("/:id", auth.verifyToken, controller.deleteMuscle);

module.exports = router;
