// controller/casteController.js
const path = require("path");
const Model = require("../model/SatsangActivityModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show SatsangActivity list page
exports.getSatsangActivityIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "SatsangActivity", "list.html"));
};

// API - fetch SatsangActivity list
exports.getSatsangActivitysData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching Satsang Activity list:", err);
    res.status(500).json({ message: "Error fetching Satsang Activity list" });
  }
};

// Add SatsangActivity (modal submit)
exports.postSatsangActivity = async (req, res) => {
  try {
    const { satsang_activity_name, created_id } = req.body;
    const id = await Model.addSatsangActivity(satsang_activity_name, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Satsang Activity added successfully", id });
  } catch (err) {
    console.error("Error adding SatsangActivity:", err);
    res.status(500).json({ success: false, message: "Error adding Satsang Activity" });
  }
};

// Get SatsangActivity by ID (for update modal)
exports.getSatsangActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const SatsangActivity = await Model.getById(id);
    if (!SatsangActivity) return res.status(404).json({ message: "Satsang Activity not found" });
    res.json(SatsangActivity);
  } catch (err) {
    console.error("Error fetching SatsangActivity:", err);
    res.status(500).json({ message: "Error fetching Satsang Activity" });
  }
};

// Update SatsangActivity
exports.updateSatsangActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { SatsangActivity } = req.body;
    await Model.updateSatsangActivity(id, SatsangActivity, updated_id);
    res.json({ success: true, message: "Satsang Activity updated successfully" });
  } catch (err) {
    console.error("Error updating SatsangActivity:", err);
    res.status(500).json({ success: false, message: "Error updating Satsang Activity" });
  }
};

// Delete SatsangActivity
exports.deleteSatsangActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Model.deleteSatsangActivity(id, deleted_id);
    res.json({ success: true, message: "Satsang Activity deleted successfully" });
  } catch (err) {
    console.error("Error deleting Satsang Activity:", err);
    res.status(500).json({ success: false, message: "Error deleting Satsang Activity" });
  }
};
