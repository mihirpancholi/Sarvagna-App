// controller/categoryController.js
const path = require("path");
const Model = require("../model/CategoryModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show category list page
exports.getCategoryIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Category", "list.html"));
};

// API - fetch category list
exports.getCategorysData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching category list:", err);
    res.status(500).json({ message: "Error fetching category list" });
  }
};

// Add category (modal submit)
exports.postCategory = async (req, res) => {
  try {
    const { category_name, created_id } = req.body;
    const id = await Model.addCategory(category_name, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Category added successfully", id });
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).json({ success: false, message: "Error adding category" });
  }
};

// Get category by ID (for update modal)
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Model.getById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ message: "Error fetching category" });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { category_name } = req.body;
    await Model.update_Category(id, category_name, updated_id);
    res.json({ success: true, message: "Category updated successfully" });
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ success: false, message: "Error updating category" });
  }
};

// Delete caste
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1; 
    await Model.deleteCategory(id, deleted_id);
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ success: false, message: "Error deleting category" });
  }
};
