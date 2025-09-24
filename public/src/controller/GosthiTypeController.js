// controller/gosthiTypeController.js
const path = require("path");
const Model = require("../model/GosthiTypeModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show Gosthi Type list page
exports.getGosthiTypeIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "GosthiType", "list.html"));
};

// API - fetch Gosthi Type list
exports.getGosthiTypesData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching Gosthi Type list:", err);
    res.status(500).json({ message: "Error fetching Gosthi Type list" });
  }
};

// Add Gosthi Type (modal submit)
exports.postGosthiType = async (req, res) => {
  try {
    const { gosthi_topic_type, created_id } = req.body;
    const id = await Model.addGosthiType(gosthi_topic_type, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "GosthiType added successfully", id });
  } catch (err) {
    console.error("Error adding Gosthi Type:", err);
    res.status(500).json({ success: false, message: "Error adding Gosthi Type" });
  }
};

// Get Gosthi Type by ID (for update modal)
exports.getGosthiTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const GosthiType = await Model.getById(id);
    if (!GosthiType) return res.status(404).json({ message: "GosthiType not found" });
    res.json(GosthiType);
  } catch (err) {
    console.error("Error fetching Gosthi Type:", err);
    res.status(500).json({ message: "Error fetching Gosthi Type" });
  }
};

// Update Gosthi Type
exports.updateGosthiType = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { gosthi_topic_type } = req.body;
    await Model.updateGosthiType(id, gosthi_topic_type, updated_id);
    res.json({ success: true, message: "GosthiType updated successfully" });
  } catch (err) {
    console.error("Error updating Gosthi Type:", err);
    res.status(500).json({ success: false, message: "Error updating Gosthi Type" });
  }
};

// Delete Gosthi Type
exports.deleteGosthiType = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1; 
    await Model.deleteGosthiType(id, deleted_id);
    res.json({ success: true, message: "GosthiType deleted successfully" });
  } catch (err) {
    console.error("Error deleting Gosthi Type:", err);
    res.status(500).json({ success: false, message: "Error deleting Gosthi Type" });
  }
};
