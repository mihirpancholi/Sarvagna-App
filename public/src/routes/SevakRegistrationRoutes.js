const express = require("express");
const router = express.Router();
const SevakController = require("../controller/SevakRegistrationController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Pages
router.get("/", SevakController.SevakIndex); // Changed to /view to avoid conflict
router.get("/getSpecializationByDegree", SevakController.getSpecializationByDegree);
router.post("/generateYtkID", SevakController.generateYtkID);
router.post('/getMandir', SevakController.getMandir);

// add sevak
router.get("/add", SevakController.AddSevakRegistration);
router.post("/addsevak", SevakController.addSevak);

// Edit Sevak
router.get("/edit/:id", SevakController.getEditSevakPage);
router.get("/getSevakForEdit/:id", SevakController.getSevakForEdit);
router.post("/update/:id", SevakController.updateSevak);

// API endpoints for viewSevak page
router.get("/allSevakData", SevakController.allSevakData);
router.post("/sevakFilterData", SevakController.FilterData);
router.post("/OverAllRemark", SevakController.OverAllRemark);
router.post("/checkSevakPassword", SevakController.checkSevakPassword);
router.post("/CurrentSevakDetail", SevakController.CurrentSevakDetail);
router.post("/delete", SevakController.deleteSevak);






module.exports = router;
