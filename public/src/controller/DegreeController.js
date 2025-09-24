// controller/casteController.js
const path = require("path");
const Degree = require("../model/DegreeModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show degree list page
exports.getDegreeIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Degree", "list.html"));
};

// API - fetch degree list
exports.getDegreesData = async (req, res) => {
  try {
    const rows = await Degree.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching degree list:", err);
    res.status(500).json({ message: "Error fetching degree list" });
  }
};

// Add degree (modal submit)
exports.postDegree = async (req, res) => {
  try {
    const { degree, created_id } = req.body;
    const id = await Degree.addDegree(degree, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Degree added successfully", id });
  } catch (err) {
    console.error("Error adding degree:", err);
    res.status(500).json({ success: false, message: "Error adding degree" });
  }
};

// Get degree by ID (for update modal)
exports.getDegreeById = async (req, res) => {
  try {
    const { id } = req.params;
    const degree = await Degree.getById(id);
    if (!degree) return res.status(404).json({ message: "Degree not found" });
    res.json(degree);
  } catch (err) {
    console.error("Error fetching degree:", err);
    res.status(500).json({ message: "Error fetching degree" });
  }
};

// Update degree
exports.updateDegree = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { degree } = req.body;
    await Degree.updateDegree(id, degree, updated_id);
    res.json({ success: true, message: "Degree updated successfully" });
  } catch (err) {
    console.error("Error updating degree:", err);
    res.status(500).json({ success: false, message: "Error updating degree" });
  }
};

// Delete degree
exports.deleteDegree = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Degree.deleteDegree(id, deleted_id);
    res.json({ success: true, message: "Degree deleted successfully" });
  } catch (err) {
    console.error("Error deleting degree:", err);
    res.status(500).json({ success: false, message: "Error deleting degree" });
  }
};
