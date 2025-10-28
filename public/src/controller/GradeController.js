// controller/gradeController.js
const path = require("path");
const Grade = require("../model/GradeModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show caste list page
exports.getGradeIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Grade", "list.html"));
};

// API - fetch caste list
exports.getGradesData = async (req, res) => {
  try {
    const rows = await Grade.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching caste list:", err);
    res.status(500).json({ message: "Error fetching caste list" });
  }
};

// Add caste (modal submit)
exports.postGrade = async (req, res) => {
  try {
    const { grade_name, created_id } = req.body;
    const id = await Grade.addGrade(grade_name, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Grade added successfully", id });
  } catch (err) {
    console.error("Error adding caste:", err);
    res.status(500).json({ success: false, message: "Error adding caste" });
  }
};

// Get caste by ID (for update modal)
exports.getGradeById = async (req, res) => {
  try {
    const { id } = req.params;
    const caste = await Grade.getById(id);
    if (!caste) return res.status(404).json({ message: "Grade not found" });
    res.json(caste);
  } catch (err) {
    console.error("Error fetching caste:", err);
    res.status(500).json({ message: "Error fetching caste" });
  }
};

// Update caste
exports.updateGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { grade_name } = req.body;
    await Grade.updateGrade(id, grade_name, updated_id);
    res.json({ success: true, message: "Grade updated successfully" });
  } catch (err) {
    console.error("Error updating caste:", err);
    res.status(500).json({ success: false, message: "Error updating caste" });
  }
};

// Delete caste
exports.deleteGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1; 
    await Grade.deleteGrade(id, deleted_id);
    res.json({ success: true, message: "Grade deleted successfully" });
  } catch (err) {
    console.error("Error deleting caste:", err);
    res.status(500).json({ success: false, message: "Error deleting caste" });
  }
};
