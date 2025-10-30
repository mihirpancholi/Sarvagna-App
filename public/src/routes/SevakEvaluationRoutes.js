const express = require('express');
const router = express.Router();
const controller = require('../controller/SevakEvaluationController');

router.get('/', controller.getSevakEvaluationPage);

// GET route to display the add form
router.get('/add', controller.getAddSevakEvaluation);

// POST route to handle form submission
router.post('/add', controller.postSevakEvaluation);

// API route to get filter dropdown options
router.get('/filter-options', controller.getFilterOptions);

// API route to get filtered evaluation data
router.post('/filter', controller.filterEvaluations);

// API route to get specific remarks
router.get('/remarks/:type/:id', controller.getRemarks);

// GET route to display the edit form
router.get('/edit/:id', controller.getEditSevakEvaluation);

// GET route to fetch data for a specific evaluation
router.get('/api/evaluation/:id', controller.getEvaluationForEdit);

// POST route to handle update form submission
router.post('/edit/:id', controller.updateSevakEvaluation);

// POST route for soft deleting an evaluation
router.post('/delete/:id', controller.deleteSevakEvaluation);

// API to get sevaks for a talim batch
router.post('/api/sevaks-by-batch', controller.getTalimBatchWiseSevak);

// GET route to display the print page
router.get('/print/:id', controller.getPrintPage);

// API route to get data for the print page
router.get('/api/print-data/:id', controller.getPrintData);

module.exports = router;