// controller/blood_groupController.js
const path = require("path");
const BloodGroup = require("../model/blood_groupModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show blood group list page
exports.getBloodGroupIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "blood_group", "list.html"));
};

// API - fetch blood group list
exports.getBloodGroupsData = async (req, res) => {
  try {
    const rows = await BloodGroup.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching blood group list:", err);
    res.status(500).json({ message: "Error fetching blood group list" });
  }
};

// Add blood group (modal submit)
exports.postBloodGroup = async (req, res) => {
  try {
    const { blood_group_name, created_id } = req.body;
    const id = await BloodGroup.addBloodGroup(blood_group_name, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Blood group added successfully", id });
  } catch (err) {
    console.error("Error adding blood group:", err);
    res.status(500).json({ success: false, message: "Error adding blood group" });
  }
};

// Get blood group by ID (for update modal)
exports.getBloodGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const bloodGroup = await BloodGroup.getBloodGroupById(id); // ✅ fixed
    if (!bloodGroup) return res.status(404).json({ message: "Blood group not found" });
    res.json(bloodGroup);
  } catch (err) {
    console.error("Error fetching blood group:", err);
    res.status(500).json({ message: "Error fetching blood group" });
  }
};


// Update blood group
exports.updateBloodGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { blood_group_name } = req.body;
    await BloodGroup.updateBlood_Group(id, blood_group_name, updated_id);
    res.json({ success: true, message: "Blood group updated successfully" });
  } catch (err) {
    console.error("Error updating blood group:", err);
    res.status(500).json({ success: false, message: "Error updating blood group" });
  }
};
// Delete blood group
exports.deleteBloodGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await BloodGroup.deleteBloodGroup(id, deleted_id);
    res.json({ success: true, message: "Blood group deleted successfully" });
  } catch (err) {
    console.error("Error deleting blood group:", err);
    res.status(500).json({ success: false, message: "Error deleting blood group" });
  }
};
