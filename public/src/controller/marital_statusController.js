// controller/maritalStatusController.js
const path = require("path");
const Marital_Status = require("../model/Marital_statusModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show marital status list page
exports.getMaritalStatusIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "marital_status", "list.html"));
};

// API - fetch marital status list
exports.getMaritalStatusesData = async (req, res) => {
  try {
    const rows = await Marital_Status.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching marital status list:", err);
    res.status(500).json({ message: "Error fetching marital status list" });
  }
};

// Add marital status (modal submit)
exports.postMaritalStatus = async (req, res) => {
  try {
    const { marital_status_name, created_id } = req.body;
    const id = await Marital_Status.addMaritalStatus(marital_status_name, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Marital status added successfully", id });
  } catch (err) {
    console.error("Error adding marital status:", err);
    res.status(500).json({ success: false, message: "Error adding marital status" });
  }
};

// Get marital status by ID (for update modal)
exports.getMaritalStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const maritalStatus = await Marital_Status.getById(id);
    if (!maritalStatus) return res.status(404).json({ message: "Marital status not found" });
    res.json(maritalStatus);
  } catch (err) {
    console.error("Error fetching marital status:", err);
    res.status(500).json({ message: "Error fetching marital status" });
  }
};

// Update marital status
exports.updateMaritalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { marital_status_name } = req.body;
    await Marital_Status.updateMaritalStatus(id, marital_status_name, updated_id);
    res.json({ success: true, message: "Marital status updated successfully" });
  } catch (err) {
    console.error("Error updating marital status:", err);
    res.status(500).json({ success: false, message: "Error updating marital status" });
  }
};

// Delete marital status
exports.deleteMaritalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Marital_Status.deleteMaritalStatus(id, deleted_id);
    res.json({ success: true, message: "Marital status deleted successfully" });
  } catch (err) {
    console.error("Error deleting marital status:", err);
    res.status(500).json({ success: false, message: "Error deleting marital status" });
  }
};
