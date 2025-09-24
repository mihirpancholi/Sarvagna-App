const express = require("express");
const router = express.Router();
const maritalStatusController = require("../controller/Marital_statusController");

// List page
router.get("/", maritalStatusController.getMaritalStatusIndex);

// API endpoints
router.get("/list", maritalStatusController.getMaritalStatusesData);
router.get("/:id", maritalStatusController.getMaritalStatusById);
router.post("/addMaritalStatus", maritalStatusController.postMaritalStatus);
router.post("/update/:id", maritalStatusController.updateMaritalStatus);
router.delete("/delete/:id", maritalStatusController.deleteMaritalStatus);

module.exports = router;
