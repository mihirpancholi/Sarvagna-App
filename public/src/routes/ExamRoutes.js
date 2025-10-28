const express = require("express");
const router = express.Router();
const ExamController = require("../controller/ExamController.js");


router.get("/", ExamController.getExamIndex);
router.get("/list", ExamController.getExamsData);
router.get("/:id", ExamController.getExamById);
router.post("/addExam", ExamController.postExam);
router.post("/update/:id", ExamController.updateExam);
router.delete("/delete/:id", ExamController.deleteExam);

module.exports = router;