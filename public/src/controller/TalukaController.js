// controller/TalukaController.js
const path = require("path");
const Model = require("../model/TalukaModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show taluka list page
exports.getTalukaIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Taluka", "list.html"));
};

// API - fetch taluka list
exports.getTalukasData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching taluka list:", err);
    res.status(500).json({ message: "Error fetching taluka list" });
  }
};

// Add taluka (modal submit)
exports.postTaluka = async (req, res) => {
  try {
    const { country_id, state_id, district_id, taluka_name, created_id } = req.body;
    const id = await Model.addTaluka( country_id, state_id, district_id, taluka_name, created_id || 1); 
    res.json({ success: true, message: "Taluka added successfully", id });
  } catch (err) {
    console.error("Error adding taluka:", err);
    res.status(500).json({ success: false, message: "Error adding taluka" });
  }
};

// Get taluka by ID (for update modal)
exports.getTalukaById = async (req, res) => {
  try {
    const { id } = req.params;
    const taluka = await Model.getById(id);
    if (!taluka) return res.status(404).json({ message: "Taluka not found" });
    res.json(taluka);
  } catch (err) {
    console.error("Error fetching taluka:", err);
    res.status(500).json({ message: "Error fetching taluka" });
  }
};

// Update taluka
exports.updateTaluka = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // whoever is logged in
    const { country_id, state_id, district_id, taluka_name } = req.body;

    await Model.updateTaluka(id, country_id, state_id, district_id, taluka_name, updated_id);

    res.json({ success: true, message: "Taluka updated successfully" });
  } catch (err) {
    console.error("Error updating taluka:", err);
    res.status(500).json({ success: false, message: "Error updating taluka" });
  }
};


// Delete taluka
exports.deleteTaluka = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Model.deleteTaluka(id, deleted_id);
    res.json({ success: true, message: "Taluka deleted successfully" });
  } catch (err) {
    console.error("Error deleting taluka:", err);
    res.status(500).json({ success: false, message: "Error deleting taluka" });
  }
};

