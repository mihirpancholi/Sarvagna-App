// controller/stateController.js
const path = require("path");
const Model = require("../model/SpecializationModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show state list page
exports.getSpecializationIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Specialization", "list.html"));
};

// API - fetch state list
exports.getSpecializationsData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching state list:", err);
    res.status(500).json({ message: "Error fetching state list" });
  }
};

// Add state (modal submit)
exports.postSpecialization = async (req, res) => {
  try {
    const { degree_id, specialization, created_id } = req.body;
    const id = await Model.addSpecialization(specialization, created_id || 1, degree_id); // default to 1 if missing
    res.json({ success: true, message: "Specialization added successfully", id });
  } catch (err) {
    console.error("Error adding state:", err);
    res.status(500).json({ success: false, message: "Error adding state" });
  }
};

// Get state by ID (for update modal)
exports.getSpecializationById = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await Model.getById(id);
    if (!state) return res.status(404).json({ message: "Specialization not found" });
    res.json(state);
  } catch (err) {
    console.error("Error fetching state:", err);
    res.status(500).json({ message: "Error fetching state" });
  }
};

// Update state
exports.updateSpecialization = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // whoever is logged in
    const { specialization, degree_id } = req.body;

    await Model.updateSpecialization(id, specialization, degree_id, updated_id);

    res.json({ success: true, message: "Specialization updated successfully" });
  } catch (err) {
    console.error("Error updating state:", err);
    res.status(500).json({ success: false, message: "Error updating state" });
  }
};


// Delete state
exports.deleteSpecialization = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Model.deleteSpecialization(id, deleted_id);
    res.json({ success: true, message: "Specialization deleted successfully" });
  } catch (err) {
    console.error("Error deleting state:", err);
    res.status(500).json({ success: false, message: "Error deleting state" });
  }
};


