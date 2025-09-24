// controller/relationshipController.js
const path = require("path");
const Model = require("../model/RelationshipModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show relationship list page
exports.getRelationshipIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Relationship", "list.html"));
};

// API - fetch relationship list
exports.getRelationshipsData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching relationship list:", err);
    res.status(500).json({ message: "Error fetching relationship list" });
  }
};

// Add relationship (modal submit)
exports.postRelationship = async (req, res) => {
  try {
    const { relationship_name, created_id } = req.body;
    const id = await Model.addRelationship(relationship_name, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Relationship added successfully", id });
  } catch (err) {
    console.error("Error adding relationship:", err);
    res.status(500).json({ success: false, message: "Error adding relationship" });
  }
};

// Get relationship by ID (for update modal)
exports.getRelationshipById = async (req, res) => {
  try {
    const { id } = req.params;
    const relationship = await Model.getById(id);
    if (!relationship) return res.status(404).json({ message: "Relationship not found" });
    res.json(relationship);
  } catch (err) {
    console.error("Error fetching relationship:", err);
    res.status(500).json({ message: "Error fetching relationship" });
  }
};

// Update relationship
exports.updateRelationship = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { relationship_name } = req.body;
    await Model.update_Relationship(id, relationship_name, updated_id);
    res.json({ success: true, message: "Relationship updated successfully" });
  } catch (err) {
    console.error("Error updating relationship:", err);
    res.status(500).json({ success: false, message: "Error updating relationship" });
  }
};

// Delete caste
exports.deleteRelationship = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1; 
    await Model.deleteRelationship(id, deleted_id);
    res.json({ success: true, message: "Relationship deleted successfully" });
  } catch (err) {
    console.error("Error deleting relationship:", err);
    res.status(500).json({ success: false, message: "Error deleting relationship" });
  }
};
