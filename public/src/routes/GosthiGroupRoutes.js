const express = require("express");
const router = express.Router();
const GosthiController = require("../controller/GosthiGroupController");

// List page
router.get("/", GosthiController.getGosthiIndex);

// API endpoints
router.get("/list", GosthiController.getGosthiData);
router.post("/add", GosthiController.addGosthiGroup);
router.get("/:id", GosthiController.getGroupById);
router.post("/update/:id", GosthiController.updateGroup);
router.delete("/delete/:id", GosthiController.deleteGroup);





module.exports = router;
