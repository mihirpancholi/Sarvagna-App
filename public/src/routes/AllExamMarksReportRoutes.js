const express = require('express');
const router = express.Router();
const controller = require('../controller/AllExamMarksReportController.js');

// GET route to display the report generation page
router.get('/', controller.getReportPage);

// API route to get initial dropdown data
router.get('/initial-data', controller.getInitialData);

// API route to generate the report
router.post('/generate-report', controller.generateReport);

module.exports = router;