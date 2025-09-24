const express = require("express");
const router = express.Router();
const ZoneRoutes = require("../controller/ZoneController");

// List page
router.get("/", ZoneRoutes.getZoneIndex);

// API endpoints
router.get("/list", ZoneRoutes.getZonesData);
router.get("/:id", ZoneRoutes.getZoneById);
router.post("/addZone", ZoneRoutes.postZone);
router.post("/update/:id", ZoneRoutes.updateZone);
router.delete("/delete/:id", ZoneRoutes.deleteZone);

module.exports = router;
