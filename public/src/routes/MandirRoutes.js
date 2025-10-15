const express = require("express");
const router = express.Router();
const mandirController = require("../controller/MandirController");

// List page
router.get("/", mandirController.getMandirIndex);

// API endpoints
router.get("/list", mandirController.getMandirsData);
router.get("/:id", mandirController.getMandirById);
router.post("/addMandir", mandirController.postMandir);
router.post("/update/:id", mandirController.updateMandir);
router.delete("/delete/:id", mandirController.deleteMandir);

module.exports = router;
