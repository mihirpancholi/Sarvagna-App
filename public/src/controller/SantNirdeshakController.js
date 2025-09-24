// controller/SantNirdeshakqController.js
const path = require("path");
const SantNirdeshak = require("../model/SantNirdeshakModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show Sant Nirdeshak list page
exports.getSantNirdeshakIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "SantNirdeshak", "list.html"));
};

// API - fetch Sant Nirdeshak list
exports.getSantNirdeshaksData = async (req, res) => {
  try {
    const rows = await SantNirdeshak.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching Sant Nirdeshak list:", err);
    res.status(500).json({ message: "Error fetching Sant Nirdeshak list" });
  }
};

// Add Sant Nirdeshak (modal submit)
exports.postSantNirdeshak = async (req, res) => {
  try {
    const { sant_nirdeshak_name, mobile_no, whatapp_no, email_id, created_id } = req.body;
    const id = await SantNirdeshak.addSantNirdeshak(sant_nirdeshak_name, mobile_no, whatapp_no, email_id, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Sant Nirdeshak added successfully", id });
  } catch (err) {
    console.error("Error adding Sant Nirdeshak:", err);
    res.status(500).json({ success: false, message: "Error adding Sant Nirdeshak" });
  }
};

// Get Sant Nirdeshak by ID (for update modal)
exports.getSantNirdeshakById = async (req, res) => {
  try {
    const { id } = req.params;
    const santNirdeshak = await SantNirdeshak.getSantNirdeshakById(id); // ✅ fixed
    if (!santNirdeshak) return res.status(404).json({ message: "Sant Nirdeshak not found" });
    res.json(santNirdeshak);
  } catch (err) {
    console.error("Error fetching Sant Nirdeshak:", err);
    res.status(500).json({ message: "Error fetching Sant Nirdeshak" });
  }
};


// Update Sant Nirdeshak
exports.updateSantNirdeshak = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { sant_nirdeshak_name, mobile_no, whatapp_no, email_id } = req.body;
    await SantNirdeshak.updatesantnirdeshak(id, sant_nirdeshak_name, mobile_no, whatapp_no, email_id, updated_id);
    res.json({ success: true, message: "Sant Nirdeshak updated successfully" });
  } catch (err) {
    console.error("Error updating Sant Nirdeshak:", err);
    res.status(500).json({ success: false, message: "Error updating Sant Nirdeshak" });
  }
};
// Delete Sant Nirdeshak
exports.deleteSantNirdeshak = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await SantNirdeshak.deleteSantNirdeshak(id, deleted_id);
    res.json({ success: true, message: "Sant Nirdeshak deleted successfully" });
  } catch (err) {
    console.error("Error deleting Sant Nirdeshak:", err);
    res.status(500).json({ success: false, message: "Error deleting Sant Nirdeshak" });
  }
};
