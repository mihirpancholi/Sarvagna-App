// controller/KshetraController.js
const path = require("path");
const Model = require("../model/KshetraModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show Kshetra list page
exports.getKshetraIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Kshetra", "list.html"));
};

// API - fetch kshetra list
exports.getKshetrasData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching kshetra list:", err);
    res.status(500).json({ message: "Error fetching kshetra list" });
  }
};

// Add Kshetra (modal submit)
exports.postKshetra = async (req, res) => {
  try {
    const { Kshetra_code,Kshetra_name,zone_id,mandir_id,sant_nirdeshak_id,nirdeshak_id,created_id } = req.body;
    const id = await Model.addKshetra(Kshetra_code, Kshetra_name, zone_id, mandir_id, sant_nirdeshak_id, nirdeshak_id, created_id || 1); // whoever is logged in
    res.json({ success: true, message: "Kshetra added successfully", id });
  } catch (err) {
    console.error("Error adding Kshetra:", err);
    res.status(500).json({ success: false, message: "Error adding Kshetra" });
  }
};

// Get Kshetra by ID (for update modal)
exports.getKshetraById = async (req, res) => {
  try {
    const { id } = req.params;
    const Kshetra = await Model.getById(id);
    if (!Kshetra) return res.status(404).json({ message: "Kshetra not found" });
    res.json(Kshetra);
  } catch (err) {
    console.error("Error fetching Kshetra:", err);
    res.status(500).json({ message: "Error fetching Kshetra" });
  }
};

// Update Kshetra
exports.updateKshetra = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // whoever is logged in
    const { Kshetra_code,Kshetra_name,zone_id,mandir_id,sant_nirdeshak_id,nirdeshak_id } = req.body;

    await Model.updateKshetra(id, Kshetra_code, Kshetra_name, zone_id, mandir_id, sant_nirdeshak_id, nirdeshak_id, updated_id);

    res.json({ success: true, message: "Kshetra updated successfully" });
  } catch (err) {
    console.error("Error updating Kshetra:", err);
    res.status(500).json({ success: false, message: "Error updating Kshetra" });
  }
};


// Delete Kshetra
exports.deleteKshetra = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Model.deleteKshetra(id, deleted_id);
    res.json({ success: true, message: "Kshetra deleted successfully" });
  } catch (err) {
    console.error("Error deleting Kshetra:", err);
    res.status(500).json({ success: false, message: "Error deleting Kshetra" });
  }
};


