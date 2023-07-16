const express = require("express");
const controller = require("../controllers/equipment.controller");
const verify = require("../middleware/verify");

const router = express.Router();

router.post("/equipments", verify, controller.createEquipment);

router.get("/equipments", controller.getEquipment);

router.put("/equipments/:id", verify, controller.updateEquipment);

router.delete("/equipments/:id", verify, controller.deleteEquipment);

module.exports = router;
