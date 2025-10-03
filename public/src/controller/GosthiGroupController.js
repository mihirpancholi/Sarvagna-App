// controller/GosthiGroupController.js
const path = require("path");
const Model = require("../model/gosthiGroupModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show gosthi group list page
exports.getGosthiIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "GosthiGroup", "list.html"));
};

// API - fetch gosthi group list
exports.getGosthiData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching gosthi group list:", err);
    res.status(500).json({ message: "Error fetching gosthi group list" });
  }
};
