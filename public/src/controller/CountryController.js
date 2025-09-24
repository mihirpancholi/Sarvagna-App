// controller/countryController.js
const path = require("path");
const Country = require("../model/countryModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show country list page
exports.getCountryIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Country", "list.html"));
};

// API - fetch country list
exports.getCountriesData = async (req, res) => {
  try {
    const rows = await Country.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching country list:", err);
    res.status(500).json({ message: "Error fetching Country list" });
  }
};

// Add country (modal submit)
exports.postCountry = async (req, res) => {
  try {
    const { country_name, dialing_code, created_id } = req.body;
    const id = await Country.add(country_name, dialing_code, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Country added successfully", id });
  } catch (err) {
    console.error("Error adding country:", err);
    res.status(500).json({ success: false, message: "Error adding country" });
  }
};

// Get country by ID (for update modal)
exports.getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.getById(id);
    if (!country) return res.status(404).json({ message: "Country not found" });
    res.json(country);
  } catch (err) {
    console.error("Error fetching country:", err);
    res.status(500).json({ message: "Error fetching country" });
  }
};

// Update country
exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; 
    const { country_name, dialing_code } = req.body;
    await Country.updateCountry(id, country_name, dialing_code, updated_id);
    res.json({ success: true, message: "Country updated successfully" });
  } catch (err) {
    console.error("Error updating country:", err);
    res.status(500).json({ success: false, message: "Error updating country" });
  }
};

// Delete country
exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1; 
    await Country.deleteCountry(id, deleted_id);
    res.json({ success: true, message: "Country deleted successfully" });
  } catch (err) {
    console.error("Error deleting country:", err);
    res.status(500).json({ success: false, message: "Error deleting country" });
  }
};
