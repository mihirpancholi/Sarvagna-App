const express = require("express");
const router = express.Router();
const SpecializationController = require("../controller/SpecializationController");

// List page
router.get("/", SpecializationController.getSpecializationIndex);

// API endpoints
router.get("/list", SpecializationController.getSpecializationsData);
router.get("/:id", SpecializationController.getSpecializationById);
router.post("/addSpecialization", SpecializationController.postSpecialization);
router.post("/update/:id", SpecializationController.updateSpecialization);
router.delete("/delete/:id", SpecializationController.deleteSpecialization);



module.exports = router;
