const express = require('express');
const router = express.Router();
const SevakEvaluationController = require("../controller/SevakEvaluationController.js");

// List page
router.get("/", SevakEvaluationController.getSevakEvaluationPage);

// API endpoints
// router.get("/list", SevakEvaluationController.getTableData);
router.get("/add", SevakEvaluationController.addSevakEvaluationPage);

module.exports = router;