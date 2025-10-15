// controller/NirdeshakqController.js
const path = require("path");
const Nirdeshak = require("../model/NirdeshakModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show  Nirdeshak list page
exports.getNirdeshakIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Nirdeshak", "list.html"));
};

// API - fetch  Nirdeshak list
exports.getNirdeshaksData = async (req, res) => {
  try {
    const rows = await Nirdeshak.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching  Nirdeshak list:", err);
    res.status(500).json({ message: "Error fetching  Nirdeshak list" });
  }
};

// Add  Nirdeshak (modal submit)
exports.postNirdeshak = async (req, res) => {
  try {
    const { nirdeshak_name, mobile_no, whatapp_no, email_id, created_id } = req.body;
    const id = await Nirdeshak.addNirdeshak(nirdeshak_name, mobile_no, whatapp_no, email_id, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: " Nirdeshak added successfully", id });
  } catch (err) {
    console.error("Error adding  Nirdeshak:", err);
    res.status(500).json({ success: false, message: "Error adding  Nirdeshak" });
  }
};

// Get  Nirdeshak by ID (for update modal)
exports.getNirdeshakById = async (req, res) => {
  try {
    const { id } = req.params;
    const Nirdeshak = await Nirdeshak.getNirdeshakById(id); // ✅ fixed
    if (!Nirdeshak) return res.status(404).json({ message: " Nirdeshak not found" });
    res.json(Nirdeshak);
  } catch (err) {
    console.error("Error fetching  Nirdeshak:", err);
    res.status(500).json({ message: "Error fetching  Nirdeshak" });
  }
};


// Update  Nirdeshak
exports.updateNirdeshak = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { nirdeshak_name, mobile_no, whatapp_no, email_id } = req.body;
    await Nirdeshak.updateNirdeshak(id, nirdeshak_name, mobile_no, whatapp_no, email_id, updated_id);
    res.json({ success: true, message: " Nirdeshak updated successfully" });
  } catch (err) {
    console.error("Error updating  Nirdeshak:", err);
    res.status(500).json({ success: false, message: "Error updating  Nirdeshak" });
  }
};
// Delete  Nirdeshak
exports.deleteNirdeshak = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Nirdeshak.deleteNirdeshak(id, deleted_id);
    res.json({ success: true, message: " Nirdeshak deleted successfully" });
  } catch (err) {
    console.error("Error deleting  Nirdeshak:", err);
    res.status(500).json({ success: false, message: "Error deleting  Nirdeshak" });
  }
};
