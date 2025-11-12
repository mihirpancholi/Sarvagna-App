const express = require("express");
const router = express.Router();
const GosthiReportSubmission = require("../controller/GosthiReportSubmission.js");

// List page
router.get("/", GosthiReportSubmission.getGosthiScheduleIndex);






module.exports = router;
