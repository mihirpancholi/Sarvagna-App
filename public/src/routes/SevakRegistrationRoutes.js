const express = require("express");
const router = express.Router();
const SevakController = require("../controller/SevakRegistrationController");

// Pages
router.get("/", SevakController.AddSevakRegistration);
router.get("/viewSevak", SevakController.SevakIndex);

router.post("/generateYtkID", SevakController.generateYtkID);
router.post("/add", SevakController.addSevak);
router.post('/getMandir', SevakController.getMandir);


module.exports = router;
