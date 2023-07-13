const express = require("express");
const controller = require("../controllers/equipment.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/equipments", auth.verifyToken, controller.createEquipment);

router.get("/equipments", controller.getEquipment);

router.put("/equipments/:id", auth.verifyToken, controller.updateEquipment);

router.delete("/equipments/:id", auth.verifyToken, controller.deleteEquipment);

module.exports = router;
