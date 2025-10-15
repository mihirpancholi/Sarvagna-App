// controller/employmentController.js
const path = require("path");
const Employment = require("../model/EmploymentModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show employment list page
exports.getEmploymentIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Employment", "list.html"));
};

// API - fetch employment list
exports.getEmploymentsData = async (req, res) => {
  try {
    const rows = await Employment.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching employment list:", err);
    res.status(500).json({ message: "Error fetching employment list" });
  }
};

// Add employment (modal submit)
exports.postEmployment = async (req, res) => {
  try {
    const { employment_name, created_id } = req.body;
    const id = await Employment.addEmployment(employment_name, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Employment added successfully", id });
  } catch (err) {
    console.error("Error adding employment:", err);
    res.status(500).json({ success: false, message: "Error adding employment" });
  }
};

// Get employment by ID (for update modal)
exports.getEmploymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const employment = await Employment.getById(id);
    if (!employment) return res.status(404).json({ message: "Employment not found" });
    res.json(employment);
  } catch (err) {
    console.error("Error fetching employment:", err);
    res.status(500).json({ message: "Error fetching employment" });
  }
};

// Update employment
exports.updateEmployment = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { employment_name } = req.body;
    await Employment.updateEmployment(id, employment_name, updated_id);
    res.json({ success: true, message: "Employment updated successfully" });
  } catch (err) {
    console.error("Error updating employment:", err);
    res.status(500).json({ success: false, message: "Error updating employment" });
  }
};

// Delete employment
exports.deleteEmployment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1; 
    await Employment.deleteEmployment(id, deleted_id);
    res.json({ success: true, message: "Employment deleted successfully" });
  } catch (err) {
    console.error("Error deleting employment:", err);
    res.status(500).json({ success: false, message: "Error deleting employment" });
  }
};
