// controller/stateController.js
const path = require("path");
const Model = require("../model/CityAreaModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show state list page
exports.getCityAreaIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "CityArea", "list.html"));
};

// API - fetch state list
exports.getCityAreasData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching state list:", err);
    res.status(500).json({ message: "Error fetching state list" });
  }
};

// Add state (modal submit)
exports.postCityArea = async (req, res) => {
  try {
    const { city_id, area_name, created_id } = req.body;
    const id = await Model.addCityArea(city_id, area_name, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "CityArea added successfully", id });
  } catch (err) {
    console.error("Error adding state:", err);
    res.status(500).json({ success: false, message: "Error adding state" });
  }
};

// Get state by ID (for update modal)
// In controller
exports.getCityAreaById = async (req, res) => {
  try {
    const { id } = req.params;
    const cityArea = await Model.getById(id);
    if (!cityArea) return res.status(404).json({ message: "CityArea not found" });
    res.json(cityArea);
  } catch (err) {
    console.error("Error fetching city area:", err);
    res.status(500).json({ message: "Error fetching city area" });
  }
};


// Update state
exports.updateCityArea = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // whoever is logged in
    const { city_id, area_name } = req.body;

    await Model.updateCityArea(id, city_id, area_name, updated_id);

    res.json({ success: true, message: "CityArea updated successfully" });
  } catch (err) {
    console.error("Error updating state:", err);
    res.status(500).json({ success: false, message: "Error updating state" });
  }
};


// Delete state
exports.deleteCityArea = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Model.deleteCityArea(id, deleted_id);
    res.json({ success: true, message: "CityArea deleted successfully" });
  } catch (err) {
    console.error("Error deleting state:", err);
    res.status(500).json({ success: false, message: "Error deleting state" });
  }
};


