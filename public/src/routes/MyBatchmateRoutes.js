const express = require("express");
const router = express.Router();
const MyBatchmateController = require("../controller/MyBatchmateController.js");

// List page
router.get("/", MyBatchmateController.getMyBatchmateIndex);
// API endpoints
router.get("/list", MyBatchmateController.getMyBatchmates);

module.exports = router;
