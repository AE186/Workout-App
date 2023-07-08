const express = require("express");
const controller = require("../controllers/muscle.controller");
const auth = require("../middleware/auth")

const router = express.Router();

router.post("/muscles/", auth.verifyToken, controller.createMuscle);

router.get("/muscles/", controller.getMuscle);

router.put("/muscles/:id", auth.verifyToken, controller.updateMuscle);

router.delete("/muscles/:id", auth.verifyToken, controller.deleteMuscle);

module.exports = router;
