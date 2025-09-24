// controller/mandirController.js
const path = require("path");
const Mandir = require("../model/MandirModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show mandir list page
exports.getMandirIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Mandir", "list.html"));
};

// API - fetch mandir list
exports.getMandirsData = async (req, res) => {
  try {
    const rows = await Mandir.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching mandir list:", err);
    res.status(500).json({ message: "Error fetching mandir list" });
  }
};

// Add mandir (modal submit)
exports.postMandir = async (req, res) => {
  try {
    const { zone_id, country_id, mandir_type, mandir_name, created_id } = req.body;
    const id = await Mandir.addMandir(zone_id, country_id, mandir_type, mandir_name, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Mandir added successfully", id });
  } catch (err) {
    console.error("Error adding mandir:", err);
    res.status(500).json({ success: false, message: "Error adding mandir" });
  }
};

// Get mandir by ID (for update modal)
exports.getMandirById = async (req, res) => {
  try {
    const { id } = req.params;
    const mandir = await Mandir.getById(id);
    if (!mandir) return res.status(404).json({ message: "Mandir not found" });
    res.json(mandir);
  } catch (err) {
    console.error("Error fetching mandir:", err);
    res.status(500).json({ message: "Error fetching mandir" });
  }
};

// Update mandir
exports.updateMandir = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { zone_id, country_id, mandir_type, mandir_name } = req.body;
    await Mandir.updateMandir(id, zone_id, country_id, mandir_type, mandir_name, updated_id);
    res.json({ success: true, message: "Mandir updated successfully" });
  } catch (err) {
    console.error("Error updating mandir:", err);
    res.status(500).json({ success: false, message: "Error updating mandir" });
  }
};

// Delete mandir
exports.deleteMandir = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1; 
    await Mandir.deleteMandir(id, deleted_id);
    res.json({ success: true, message: "Mandir deleted successfully" });
  } catch (err) {
    console.error("Error deleting mandir:", err);
    res.status(500).json({ success: false, message: "Error deleting mandir" });
  }
};
