const express = require("express");
const router = express.Router();
const GosthiTypeController = require("../controller/GosthiTypeController.js");

// List page
router.get("/", GosthiTypeController.getGosthiTypeIndex);

// API endpoints
router.get("/list", GosthiTypeController.getGosthiTypesData);
router.get("/:id", GosthiTypeController.getGosthiTypeById);
router.post("/addGosthiType", GosthiTypeController.postGosthiType);
router.post("/update/:id", GosthiTypeController.updateGosthiType);
router.delete("/delete/:id", GosthiTypeController.deleteGosthiType);

module.exports = router;
