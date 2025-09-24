const express = require("express");
const router = express.Router();
const KshetraController = require("../controller/KshetraController");

// List page
router.get("/", KshetraController.getKshetraIndex);

// API endpoints
router.get("/list", KshetraController.getKshetrasData);

router.get("/:id", KshetraController.getKshetraById);
router.post("/addKshetra", KshetraController.postKshetra);
router.post("/update/:id", KshetraController.updateKshetra);
router.delete("/delete/:id", KshetraController.deleteKshetra);

module.exports = router;
