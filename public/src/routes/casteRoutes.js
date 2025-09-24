const express = require("express");
const router = express.Router();
const casteController = require("../controller/CasteController");

// List page
router.get("/", casteController.getCasteIndex);

// API endpoints
router.get("/list", casteController.getCastesData);
router.get("/:id", casteController.getCasteById);
router.post("/addCaste", casteController.postCaste);
router.post("/update/:id", casteController.updateCaste);
router.delete("/delete/:id", casteController.deleteCaste);

module.exports = router;
