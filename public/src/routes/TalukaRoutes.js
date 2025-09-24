const express = require("express");
const router = express.Router();
const TalukaController = require("../controller/TalukaController");

// List page
router.get("/", TalukaController.getTalukaIndex);

// API endpoints
router.get("/list", TalukaController.getTalukasData);

router.get("/:id", TalukaController.getTalukaById);
router.post("/addTaluka", TalukaController.postTaluka);
router.post("/update/:id", TalukaController.updateTaluka);
router.delete("/delete/:id", TalukaController.deleteTaluka);

module.exports = router;
