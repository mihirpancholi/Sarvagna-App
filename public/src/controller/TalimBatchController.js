// controller/talimBatchController.js
const path = require("path");
const Model = require("../model/TalimBatchModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show talim batch list page
exports.getTalimBatchIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "TalimBatch", "list.html"));
};

// API - fetch talim batch list
exports.getTalimBatchesData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching talim batch list:", err);
    res.status(500).json({ message: "Error fetching talim batch list" });
  }
};

// Add talim batch (modal submit)
exports.postTalimBatch = async (req, res) => {
  try {
  const { talim_year,talim_batch, start_date, end_date, is_active, created_id } = req.body;
  const id = await Model.addTalimBatch(talim_year,talim_batch, start_date, end_date, is_active, created_id || 1);
  res.json({ success:true, message:"Added successfully", id });
   } catch (err) {
    console.error("Error adding talim:", err);
    res.status(500).json({ success: false, message: "Error adding talim" });
  }
};

// GET /talimBatch/:id
exports.getTalimBatchById = async (req,res) => {
  const batch = await Model.getById(req.params.id);
  res.json(batch);
};


exports.updateTalimBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // whoever is logged in
    const { talim_year,talim_batch, start_date, end_date, is_active } = req.body;

    await Model.updateTalimBatch(id, talim_year,talim_batch, start_date, end_date, is_active, updated_id);

    res.json({ success: true, message: "Talim Batch updated successfully" });
  } catch (err) {
    console.error("Error updating Talim Batch:", err);
    res.status(500).json({ success: false, message: "Error updating Talim Batch" });
  }
};



// Delete talim batch
exports.deleteTalimBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Model.deleteTalimBatch(id, deleted_id);
    res.json({ success: true, message: "Talim Batch deleted successfully" });
  } catch (err) {
    console.error("Error deleting talim batch:", err);
    res.status(500).json({ success: false, message: "Error deleting talim batch" });
  }
};
