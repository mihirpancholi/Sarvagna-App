const express = require("express");
const router = express.Router();
const NirdeshakController = require("../controller/NirdeshakController");

// List page
router.get("/", NirdeshakController.getNirdeshakIndex);

// API endpoints
router.get("/list", NirdeshakController.getNirdeshaksData);
router.get("/:id", NirdeshakController.getNirdeshakById);
router.post("/addNirdeshak", NirdeshakController.postNirdeshak);
router.post("/update/:id", NirdeshakController.updateNirdeshak);
router.delete("/delete/:id", NirdeshakController.deleteNirdeshak);

module.exports = router;

