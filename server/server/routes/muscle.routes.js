const express = require("express");
const controller = require("../controllers/muscle.controller");
const verify = require("../middleware/verify")

const router = express.Router();

router.post("/muscles/", verify, controller.createMuscle);

router.get("/muscles/", controller.getMuscle);

router.put("/muscles/:id", verify, controller.updateMuscle);

router.delete("/muscles/:id", verify, controller.deleteMuscle);

module.exports = router;
