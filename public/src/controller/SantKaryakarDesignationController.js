// controller/SantKaryakarDesignationController.js
const path = require("path");
const Model = require("../model/SantKaryakarDesignationModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show Sant Karyakar Designation list page
exports.getSantKaryakarDesignationIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "SantKaryakarDesignation", "list.html"));
};

// API - fetch Sant Karyakar Designation list
exports.getSantKaryakarDesignationsData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching Sant Karyakar Designation list:", err);
    res.status(500).json({ message: "Error fetching Sant Karyakar Designation list" });
  }
};

// Add Sant Karyakar Designation (modal submit)
exports.postSantKaryakarDesignation = async (req, res) => {
  try {
    const { type, designation, created_id } = req.body;
    const id = await Model.addSantKaryakarDesignation(type, designation, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Sant Karyakar Designation added successfully", id });
  } catch (err) {
    console.error("Error adding Sant Karyakar Designation:", err);
    res.status(500).json({ success: false, message: "Error adding Sant Karyakar Designation" });
  }
};

// Get Sant Karyakar Designation by ID (for update modal)
exports.getSantKaryakarDesignationById = async (req, res) => {
  try {
    const { id } = req.params;
    const SantKaryakarDesignation = await Model.getSantKaryakarDesignationById(id); // ✅ fixed
    if (!SantKaryakarDesignation) return res.status(404).json({ message: "Sant Karyakar Designation not found" });
    res.json(SantKaryakarDesignation);
  } catch (err) {
    console.error("Error fetching Sant Karyakar Designation:", err);
    res.status(500).json({ message: "Error fetching Sant Karyakar Designation" });
  }
};


// Update Sant Karyakar Designation
exports.updateSantKaryakarDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { type, designation } = req.body;
    await Model.updateSantKaryakarDesignation(id, type, designation, updated_id);
    res.json({ success: true, message: "Sant Karyakar Designation updated successfully" });
  } catch (err) {
    console.error("Error updating Sant Karyakar Designation:", err);
    res.status(500).json({ success: false, message: "Error updating Sant Karyakar Designation" });
  }
};
// Delete Sant Karyakar Designation
exports.deleteSantKaryakarDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Model.deleteSantKaryakarDesignation(id, deleted_id);
    res.json({ success: true, message: "Sant Karyakar Designation deleted successfully" });
  } catch (err) {
    console.error("Error deleting Sant Karyakar Designation:", err);
    res.status(500).json({ success: false, message: "Error deleting Sant Karyakar Designation" });
  }
};
