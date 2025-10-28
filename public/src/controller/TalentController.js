// controller/talentController.js
const path = require("path");
const Talent = require("../model/TalentModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show talent list page
exports.getTalentIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Talent", "list.html"));
};

// API - fetch talent list
exports.getTalentsData = async (req, res) => {
  try {
    const rows = await Talent.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching talent list:", err);
    res.status(500).json({ message: "Error fetching talent list" });
  }
};

// Add talent (modal submit)
exports.postTalent = async (req, res) => {
  try {
    const { talent_name, created_id } = req.body;
    const id = await Talent.addTalent(talent_name, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Talent added successfully", id });
  } catch (err) {
    console.error("Error adding talent:", err);
    res.status(500).json({ success: false, message: "Error adding talent" });
  }
};

// Get talent by ID (for update modal)
exports.getTalentById = async (req, res) => {
  try {
    const { id } = req.params;
    const talent = await Talent.getById(id);
    if (!talent) return res.status(404).json({ message: "Talent not found" });
    res.json(talent);
  } catch (err) {
    console.error("Error fetching talent:", err);
    res.status(500).json({ message: "Error fetching talent" });
  }
};

// Update talent
exports.updateTalent = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { talent_name } = req.body;
    await Talent.updateTalent(id, talent_name, updated_id);
    res.json({ success: true, message: "Talent updated successfully" });
  } catch (err) {
    console.error("Error updating talent:", err);
    res.status(500).json({ success: false, message: "Error updating talent" });
  }
};

// Delete talent
exports.deleteTalent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1; 
    await Talent.deleteTalent(id, deleted_id);
    res.json({ success: true, message: "Talent deleted successfully" });
  } catch (err) {
    console.error("Error deleting talent:", err);
    res.status(500).json({ success: false, message: "Error deleting talent" });
  }
};
