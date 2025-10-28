const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/CategoryController");

// List page
router.get("/", CategoryController.getCategoryIndex);

// API endpoints
router.get("/list", CategoryController.getCategorysData);
router.get("/:id", CategoryController.getCategoryById);
router.post("/addCategory", CategoryController.postCategory);
router.post("/update/:id", CategoryController.updateCategory);
router.delete("/delete/:id", CategoryController.deleteCategory);

module.exports = router;