// controller/CityController.js
const path = require("path");
const Model = require("../model/CityModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show city list page
exports.getCityIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "City", "list.html"));
};

// API - fetch city list
exports.getCitiesData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching city list:", err);
    res.status(500).json({ message: "Error fetching city list" });
  }
};

// Add city (modal submit)
exports.postCity = async (req, res) => {
  try {
    const {state_id, country_id, district_id,taluka_id,city_name,created_id } = req.body;
    const id = await Model.addCity(state_id, country_id, district_id, taluka_id, city_name, created_id || 1);
    res.json({ success: true, message: "City added successfully", id });
  } catch (err) {
    console.error("Error adding city:", err);
    res.status(500).json({ success: false, message: "Error adding city" });
  }
};

// Get city by ID (for update modal)
exports.getCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await Model.getById(id);
    if (!city) return res.status(404).json({ message: "City not found" });
    res.json(city);
  } catch (err) {
    console.error("Error fetching city:", err);
    res.status(500).json({ message: "Error fetching city" });
  }
};

// Update taluka
exports.updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // whoever is logged in
    const { state_id, country_id, district_id,taluka_id,city_name } = req.body;

    await Model.updateCity(id, state_id, country_id, district_id,taluka_id,city_name, updated_id);

    res.json({ success: true, message: "City updated successfully" });
  } catch (err) {
    console.error("Error updating city:", err);
    res.status(500).json({ success: false, message: "Error updating city" });
  }
};


// Delete city
exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Model.deleteCity(id, deleted_id);
    res.json({ success: true, message: "City deleted successfully" });
  } catch (err) {
    console.error("Error deleting city:", err);
    res.status(500).json({ success: false, message: "Error deleting city" });
  }
};


