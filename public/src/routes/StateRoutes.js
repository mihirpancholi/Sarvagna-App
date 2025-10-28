const express = require("express");
const router = express.Router();
const StateController = require("../controller/StateController");

// List page
router.get("/", StateController.getStateIndex);

// API endpoints
router.get("/list", StateController.getStatesData);
router.get("/:id", StateController.getStateById);
router.post("/addState", StateController.postState);
router.post("/update/:id", StateController.updateState);
router.delete("/delete/:id", StateController.deleteState);



module.exports = router;
