const express = require("express");
const equipmentController = require("../controllers/equipmentController");

const router = express.Router();

router.post("/", equipmentController.createEquipment);

router.get("/", equipmentController.getEquipment);

router.put("/", equipmentController.updateEquipment);

router.delete("/:id", equipmentController.deleteEquipment);

module.exports = router;
