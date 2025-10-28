// controller/DistrictController.js
const path = require("path");
const Model = require("../model/DistrictModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show district list page
exports.getDistrictIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "District", "list.html"));
};

// API - fetch taluka list
exports.getDistrictsData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching taluka list:", err);
    res.status(500).json({ message: "Error fetching taluka list" });
  }
};

// Add district (modal submit)
exports.postDistrict = async (req, res) => {
  try {
    const { country_id, district_name, created_id, state_id } = req.body;
    const id = await Model.addDistrict(district_name, created_id || 1, country_id, state_id); // default to 1 if missing
    res.json({ success: true, message: "District added successfully", id });
  } catch (err) {
    console.error("Error adding district:", err);
    res.status(500).json({ success: false, message: "Error adding district" });
  }
};

// Get district by ID (for update modal)
exports.getDistrictById = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await Model.getById(id);
    if (!district) return res.status(404).json({ message: "District not found" });
    res.json(district);
  } catch (err) {
    console.error("Error fetching district:", err);
    res.status(500).json({ message: "Error fetching district" });
  }
};

// Update district
exports.updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // whoever is logged in
    const { state_id, district_name, country_id } = req.body;

    await Model.updateDistrict(id, state_id, district_name, country_id, updated_id);

    res.json({ success: true, message: "District updated successfully" });
  } catch (err) {
    console.error("Error updating district:", err);
    res.status(500).json({ success: false, message: "Error updating district" });
  }
};


// Delete district
exports.deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Model.deleteDistrict(id, deleted_id);
    res.json({ success: true, message: "District deleted successfully" });
  } catch (err) {
    console.error("Error deleting district:", err);
    res.status(500).json({ success: false, message: "Error deleting district" });
  }
};


