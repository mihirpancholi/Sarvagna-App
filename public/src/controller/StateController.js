// controller/stateController.js
const path = require("path");
const Model = require("../model/StateModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show state list page
exports.getStateIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "State", "list.html"));
};

// API - fetch state list
exports.getStatesData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching state list:", err);
    res.status(500).json({ message: "Error fetching state list" });
  }
};

// Add state (modal submit)
exports.postState = async (req, res) => {
  try {
    const { country_id, state_name, created_id } = req.body;
    const id = await Model.addState(state_name, created_id || 1, country_id); // default to 1 if missing
    res.json({ success: true, message: "State added successfully", id });
  } catch (err) {
    console.error("Error adding state:", err);
    res.status(500).json({ success: false, message: "Error adding state" });
  }
};

// Get state by ID (for update modal)
exports.getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await Model.getById(id);
    if (!state) return res.status(404).json({ message: "State not found" });
    res.json(state);
  } catch (err) {
    console.error("Error fetching state:", err);
    res.status(500).json({ message: "Error fetching state" });
  }
};

// Update state
exports.updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // whoever is logged in
    const { state_name, country_id } = req.body;

    await Model.updateState(id, state_name, country_id, updated_id);

    res.json({ success: true, message: "State updated successfully" });
  } catch (err) {
    console.error("Error updating state:", err);
    res.status(500).json({ success: false, message: "Error updating state" });
  }
};


// Delete state
exports.deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Model.deleteState(id, deleted_id);
    res.json({ success: true, message: "State deleted successfully" });
  } catch (err) {
    console.error("Error deleting state:", err);
    res.status(500).json({ success: false, message: "Error deleting state" });
  }
};


