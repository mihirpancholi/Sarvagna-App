const express = require("express");
const router = express.Router();
const TalentController = require("../controller/TalentController");

// List page
router.get("/", TalentController.getTalentIndex);

// API endpoints
router.get("/list", TalentController.getTalentsData);
router.get("/:id", TalentController.getTalentById);
router.post("/addTalent", TalentController.postTalent);
router.post("/update/:id", TalentController.updateTalent);
router.delete("/delete/:id", TalentController.deleteTalent);

module.exports = router;
