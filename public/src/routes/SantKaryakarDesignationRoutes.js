const express = require("express");
const router = express.Router();
const SantKaryakarDesignationController = require("../controller/SantKaryakarDesignationController");

// List page
router.get("/", SantKaryakarDesignationController.getSantKaryakarDesignationIndex);

// API endpoints
router.get("/list", SantKaryakarDesignationController.getSantKaryakarDesignationsData);
router.get("/:id", SantKaryakarDesignationController.getSantKaryakarDesignationById);
router.post("/addSantKaryakarDesignation", SantKaryakarDesignationController.postSantKaryakarDesignation);
router.post("/update/:id", SantKaryakarDesignationController.updateSantKaryakarDesignation);
router.delete("/delete/:id", SantKaryakarDesignationController.deleteSantKaryakarDesignation);

module.exports = router;

