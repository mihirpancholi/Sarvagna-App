// controller/casteController.js
const path = require("path");
const Caste = require("../model/casteModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show caste list page
exports.getCasteIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Caste", "list.html"));
};

// API - fetch caste list
exports.getCastesData = async (req, res) => {
  try {
    const rows = await Caste.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching caste list:", err);
    res.status(500).json({ message: "Error fetching caste list" });
  }
};

// Add caste (modal submit)
exports.postCaste = async (req, res) => {
  try {
    const { caste_name, created_id } = req.body;
    const id = await Caste.addCaste(caste_name, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Caste added successfully", id });
  } catch (err) {
    console.error("Error adding caste:", err);
    res.status(500).json({ success: false, message: "Error adding caste" });
  }
};

// Get caste by ID (for update modal)
exports.getCasteById = async (req, res) => {
  try {
    const { id } = req.params;
    const caste = await Caste.getById(id);
    if (!caste) return res.status(404).json({ message: "Caste not found" });
    res.json(caste);
  } catch (err) {
    console.error("Error fetching caste:", err);
    res.status(500).json({ message: "Error fetching caste" });
  }
};

// Update caste
exports.updateCaste = async (req, res) => {
  try {
    const { id } = req.params;
    const { caste_name } = req.body;
    await Caste.updateCaste(id, caste_name);
    res.json({ success: true, message: "Caste updated successfully" });
  } catch (err) {
    console.error("Error updating caste:", err);
    res.status(500).json({ success: false, message: "Error updating caste" });
  }
};

// Delete caste
exports.deleteCaste = async (req, res) => {
  try {
    const { id } = req.params;
    await Caste.deleteCaste(id);
    res.json({ success: true, message: "Caste deleted successfully" });
  } catch (err) {
    console.error("Error deleting caste:", err);
    res.status(500).json({ success: false, message: "Error deleting caste" });
  }
};
