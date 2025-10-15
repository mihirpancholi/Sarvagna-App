const express = require("express");
const router = express.Router();
const santnirdeshakController = require("../controller/SantNirdeshakController");

// List page
router.get("/", santnirdeshakController.getSantNirdeshakIndex);

// API endpoints
router.get("/list", santnirdeshakController.getSantNirdeshaksData);
router.get("/:id", santnirdeshakController.getSantNirdeshakById);
router.post("/addSantNirdeshak", santnirdeshakController.postSantNirdeshak);
router.post("/update/:id", santnirdeshakController.updateSantNirdeshak);
router.delete("/delete/:id", santnirdeshakController.deleteSantNirdeshak);

module.exports = router;

