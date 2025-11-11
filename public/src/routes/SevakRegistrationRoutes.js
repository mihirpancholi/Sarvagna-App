const express = require("express");
const router = express.Router();
const SevakController = require("../controller/SevakRegistrationController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { route } = require("./GroupMemberMappingRoutes");

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
router.post("/updatesevak", SevakController.updateSevak);

// API endpoints for viewSevak page
router.get("/allSevakData", SevakController.allSevakData);
router.post("/sevakFilterData", SevakController.FilterData);
router.post("/CurrentSevakDetails/:id", SevakController.CurrentSevakDetail);
router.post("/delete", SevakController.deleteSevak);



// Add NoneSevak
router.get("/NoneSevak", SevakController.AddNoneSevakRegistration);
router.post("/addNoneSevak", SevakController.addNoneSevak);
router.get("/ViewNoneSevak", SevakController.ViewNoneSevak);
router.get("/listNoneSevak", SevakController.listNoneSevak);


router.get("/editNoneSevak/:id", SevakController.getEditNoneSevakPage);
router.get("/getNoneSevakForEdit/:id", SevakController.getNoneSevakForEdit);
router.post('/updateNoneSevak/:sevak_id', SevakController.updateNoneSevak);
router.post('/deleteNonSevakData/:sevak_id', SevakController.deleteNonSevakData);



module.exports = router;
