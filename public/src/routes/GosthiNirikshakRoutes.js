const express = require("express");
const router = express.Router();
const GosthiNirikshakController = require("../controller/GosthiNirikshakController");

// List page
router.get("/", GosthiNirikshakController.getGosthiIndex);

// API endpoints
router.get("/list", GosthiNirikshakController.getNirikshakData);
router.post("/add", GosthiNirikshakController.addNirikshak);
router.post("/update/:id", GosthiNirikshakController.updateNirikshak);
router.delete("/delete/:id", GosthiNirikshakController.deleteNirikshak);





module.exports = router;
