// controller/GosthiGroupController.js
const path = require("path");
const Model = require("../model/GosthiNirikshakModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show Nirikshak list page
exports.getGosthiIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Gosthi", "Nirikshak", "list.html"));
};

// API - fetch Nirikshak list
exports.getNirikshakData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching Nirikshak list:", err);
    res.status(500).json({ message: "Error fetching Nirikshak list" });
  }
};


exports.addNirikshak = async (req, res) => {
  try {
    const { zone_id, talim_batch_id, sevak_id, group_id, created_id } = req.body;

    const id = await Model.addNirikshak(
      zone_id,
      talim_batch_id,
      sevak_id,
      group_id,
      created_id || 1
    );

    res.json({ success: true, message: "Nirikshak added successfully", id });
  } catch (err) {
    console.error("Error adding Nirikshak:", err);
    res.status(500).json({ success: false, message: "Error adding Nirikshak" });
  }
};



// controller/NirikshakController.js
exports.updateNirikshak = async (req, res) => {
  try {
    const { id } = req.params;
        const updated_id = 1; // TODO: Replace with actual user id
    const { zone_id, talim_batch_id, sevak_id, group_id } = req.body;

    await Model.NirikshakUpdate(id, zone_id, talim_batch_id, sevak_id, group_id, updated_id);

    res.json({ success: true, message: "Nirikshak updated successfully" });
  } catch (err) {
    console.error("Error updating Nirikshak:", err);
    res.status(500).json({ success: false, message: "Error updating Nirikshak" });
  }
};

exports.deleteNirikshak = async (req, res) => {
  const { id } = req.params;
  const deleted_id =  1; // fallback if auth not implemented

  try {
    const deleted = await Model.Delete(id, deleted_id);

    if (deleted) {
      res.json({ success: true, message: "Nirikshak deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Nirikshak not found or already deleted" });
    }
  } catch (err) {
    console.error("Error deleting Nirikshak:", err);
    res.status(500).json({ success: false, message: "Server error during Nirikshak deletion" });
  }
};

