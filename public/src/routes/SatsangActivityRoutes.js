const express = require("express");
const router = express.Router();
const SatsangActivityController = require("../controller/SatsangActivityController");

// List page
router.get("/", SatsangActivityController.getSatsangActivityIndex);

// API endpoints
router.get("/list", SatsangActivityController.getSatsangActivitysData);
router.get("/:id", SatsangActivityController.getSatsangActivityById);
router.post("/addSatsangActivity", SatsangActivityController.postSatsangActivity);
router.post("/update/:id", SatsangActivityController.updateSatsangActivity);
router.delete("/delete/:id", SatsangActivityController.deleteSatsangActivity);

module.exports = router;
