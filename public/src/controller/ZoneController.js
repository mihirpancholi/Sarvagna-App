// controller/zoneController.js
const path = require("path");
const Zone = require("../model/ZoneModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show zone list page
exports.getZoneIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Zone", "list.html"));
};

// API - fetch zone list
exports.getZonesData = async (req, res) => {
  try {
    const rows = await Zone.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching zone list:", err);
    res.status(500).json({ message: "Error fetching zone list" });
  }
};

// Add zone (modal submit)
exports.postZone = async (req, res) => {
  try {
    const { zone_name, created_id } = req.body;
    const id = await Zone.addZone(zone_name, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Zone added successfully", id });
  } catch (err) {
    console.error("Error adding zone:", err);
    res.status(500).json({ success: false, message: "Error adding zone" });
  }
};

// Get zone by ID (for update modal)
exports.getZoneById = async (req, res) => {
  try {
    const { id } = req.params;
    const zone = await Zone.getById(id);
    if (!zone) return res.status(404).json({ message: "Zone not found" });
    res.json(zone);
  } catch (err) {
    console.error("Error fetching zone:", err);
    res.status(500).json({ message: "Error fetching zone" });
  }
};

// Update zone
exports.updateZone = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { zone_name } = req.body;
    await Zone.updateZone(id, zone_name, updated_id);
    res.json({ success: true, message: "Zone updated successfully" });
  } catch (err) {
    console.error("Error updating zone:", err);
    res.status(500).json({ success: false, message: "Error updating zone" });
  }
};

// Delete zone
exports.deleteZone = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1; 
    await Zone.deleteZone(id, deleted_id);
    res.json({ success: true, message: "Zone deleted successfully" });
  } catch (err) {
    console.error("Error deleting zone:", err);
    res.status(500).json({ success: false, message: "Error deleting zone" });
  }
};
