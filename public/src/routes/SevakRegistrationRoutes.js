const express = require("express");
const router = express.Router();
const SevakController = require("../controller/SevakRegistrationController");

// Pages
router.get("/add", SevakController.AddSevakRegistration);
router.get("/", SevakController.SevakIndex); // Changed to /view to avoid conflict

router.get("/getSpecializationByDegree", SevakController.getSpecializationByDegree);

// API endpoints for viewSevak page
router.get("/allSevakData", SevakController.allSevakData);
router.post("/sevakFilterData", SevakController.FilterData);
router.post("/OverAllRemark", SevakController.OverAllRemark);
router.post("/checkSevakPassword", SevakController.checkSevakPassword);
router.post("/CurrentSevakDetail", (req, res) => res.send(`Details for Sevak ID: ${req.body.sevak_id}`)); // Placeholder
router.post("/delete", (req, res) => res.json({ success: true })); // Placeholder

// Form submission
router.post("/generateYtkID", SevakController.generateYtkID);
router.post("/add", SevakController.addSevak);
router.post('/getMandir', SevakController.getMandir);

module.exports = router;
