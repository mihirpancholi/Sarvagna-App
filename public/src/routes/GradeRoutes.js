const express = require("express");
const router = express.Router();
const GradeController = require("../controller/GradeController");

// List page
router.get("/", GradeController.getGradeIndex);

// API endpoints
router.get("/list", GradeController.getGradesData);
router.get("/:id", GradeController.getGradeById);
router.post("/addGrade", GradeController.postGrade);
router.post("/update/:id", GradeController.updateGrade);
router.delete("/delete/:id", GradeController.deleteGrade);

module.exports = router;
