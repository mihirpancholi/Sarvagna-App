const express = require("express");
const router = express.Router();
const GosthiController = require("../controller/GosthiGroupController");

// List page
router.get("/", GosthiController.getGosthiIndex);

// API endpoints
router.get("/list", GosthiController.getGosthiData);



module.exports = router;
