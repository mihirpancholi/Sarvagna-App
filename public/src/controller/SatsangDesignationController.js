// controller/casteController.js
const path = require("path");
const Model = require("../model/SatsangDesignationModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show SatsangDesignation list page
exports.getSatsangDesignationIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "SatsangDesignation", "list.html"));
};

// API - fetch SatsangDesignation list
exports.getSatsangDesignationsData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching Satsang Designation list:", err);
    res.status(500).json({ message: "Error fetching Satsang Designation list" });
  }
};

// Add SatsangDesignation (modal submit)
exports.postSatsangDesignation = async (req, res) => {
  try {
    const { satsang_designation_name, satsang_activity_id  , created_id } = req.body;
    const id = await Model.addSatsangDesignation(satsang_designation_name, satsang_activity_id  , created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Satsang Designation added successfully", id });
  } catch (err) {
    console.error("Error adding Satsang Designation:", err);
    res.status(500).json({ success: false, message: "Error adding Satsang Designation" });
  }
};

// Get SatsangDesignation by ID (for update modal)
exports.getSatsangDesignationById = async (req, res) => {
  try {
    const { id } = req.params;
    const SatsangDesignation = await Model.getById(id);
    if (!SatsangDesignation) return res.status(404).json({ message: "Satsang Designation not found" });
    res.json(SatsangDesignation);
  } catch (err) {
    console.error("Error fetching Satsang Designation:", err);
    res.status(500).json({ message: "Error fetching Satsang Designation" });
  }
};

// Update SatsangDesignation
exports.updateSatsangDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { satsang_designation_name, satsang_activity_id   } = req.body;
    await Model.updateSatsang_Designation(id, satsang_designation_name, satsang_activity_id  , updated_id);
    res.json({ success: true, message: "Satsang Designation updated successfully" });
  } catch (err) {
    console.error("Error updating Satsang Designation:", err);
    res.status(500).json({ success: false, message: "Error updating Satsang Designation" });
  }
};

// Delete SatsangDesignation
exports.deleteSatsangDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Model.deleteSatsangDesignation(id, deleted_id);
    res.json({ success: true, message: "Satsang Designation deleted successfully" });
  } catch (err) {
    console.error("Error deleting Satsang Designation:", err);
    res.status(500).json({ success: false, message: "Error deleting Satsang Designation" });
  }
};
