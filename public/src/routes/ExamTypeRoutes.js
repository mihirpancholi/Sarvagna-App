const express = require("express");
const router = express.Router();
const ExamTypeController = require("../controller/ExamTypeController.js");


router.get("/", ExamTypeController.getExamTypeIndex);
router.get("/list", ExamTypeController.getExamTypesData);
router.get("/:id", ExamTypeController.getExamTypeById);
router.post("/addExamType", ExamTypeController.postExamType);
router.post("/update/:id", ExamTypeController.updateExamType);
router.delete("/delete/:id", ExamTypeController.deleteExamType);

module.exports = router;