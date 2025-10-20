const express = require("express");
const router = express.Router();
const ExamDashboardController = require("../controller/ExamDashboardController.js");

// List page
router.get("/", ExamDashboardController.getExamDashboardIndex);


module.exports = router;
