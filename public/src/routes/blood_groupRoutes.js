const express = require("express");
const router = express.Router();
const blood_groupController = require("../controller/blood_groupController");

// List page
router.get("/", blood_groupController.getBloodGroupIndex);

// API endpoints
router.get("/list", blood_groupController.getBloodGroupsData);
router.get("/:id", blood_groupController.getBloodGroupById);
router.post("/addBloodGroup", blood_groupController.postBloodGroup);
router.post("/update/:id", blood_groupController.updateBloodGroup);
router.delete("/delete/:id", blood_groupController.deleteBloodGroup);

module.exports = router;

