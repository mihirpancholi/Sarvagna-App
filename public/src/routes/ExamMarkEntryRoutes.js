const express = require("express");
const router = express.Router();
const ExamMarkEntryController = require("../controller/ExamMarkEntryController.js");


router.get("/", ExamMarkEntryController.getExamMarkEntryIndex);
router.get("/list", ExamMarkEntryController.getExamMarkEntryList);
router.get("/data", ExamMarkEntryController.getExamMarkEntryData);
router.get("/Add", ExamMarkEntryController.getAddMarksPage);
router.post('/GetExamMarks', ExamMarkEntryController.getExamMarks);
router.post('/getStudentData', ExamMarkEntryController.getStudentData);
router.post('/add', ExamMarkEntryController.add);
router.get("/edit", ExamMarkEntryController.getEditExamMarkEntry);
router.post("/update", ExamMarkEntryController.updateExamMarkEntry);


module.exports = router;