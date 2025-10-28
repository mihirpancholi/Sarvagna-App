// controller/stateController.js
const path = require("path");
const Model = require("../model/PincodeModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show state list page
exports.getPincodeIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Pincode", "list.html"));
};

// API - fetch state list
exports.getPincodesData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching state list:", err);
    res.status(500).json({ message: "Error fetching state list" });
  }
};

// Add state (modal submit)
exports.postPincode = async (req, res) => {
  try {
    const { city_id, pincode, created_id } = req.body;
    const id = await Model.addPincode(city_id, pincode, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Pincode added successfully", id });
  } catch (err) {
    console.error("Error adding state:", err);
    res.status(500).json({ success: false, message: "Error adding state" });
  }
};

// Get state by ID (for update modal)
// In controller
exports.getPincodeById = async (req, res) => {
  try {
    const { id } = req.params;
    const pincode = await Model.getById(id);
    if (!pincode) return res.status(404).json({ message: "Pincode not found" });
    res.json(pincode);
  } catch (err) {
    console.error("Error fetching pincode:", err);
    res.status(500).json({ message: "Error fetching pincode" });
  }
};


// Update state
exports.updatePincode = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // whoever is logged in
    const { city_id, pincode } = req.body;

    await Model.updatePincode(id, city_id, pincode, updated_id);

    res.json({ success: true, message: "Pincode updated successfully" });
  } catch (err) {
    console.error("Error updating state:", err);
    res.status(500).json({ success: false, message: "Error updating state" });
  }
};


// Delete state
exports.deletePincode = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Model.deletePincode(id, deleted_id);
    res.json({ success: true, message: "Pincode deleted successfully" });
  } catch (err) {
    console.error("Error deleting state:", err);
    res.status(500).json({ success: false, message: "Error deleting state" });
  }
};


