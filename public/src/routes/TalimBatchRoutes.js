const express = require("express");
const router = express.Router();
const talimBatchController = require("../controller/TalimBatchController");

// List page
router.get("/", talimBatchController.getTalimBatchIndex);

// API endpoints
router.get("/list", talimBatchController.getTalimBatchesData);
router.get("/:id", talimBatchController.getTalimBatchById);
router.post("/addTalim", talimBatchController.postTalimBatch);
router.post("/update/:id", talimBatchController.updateTalimBatch);
router.delete("/delete/:id", talimBatchController.deleteTalimBatch);

module.exports = router;
