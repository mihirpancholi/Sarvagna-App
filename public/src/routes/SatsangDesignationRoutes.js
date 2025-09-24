const express = require("express");
const router = express.Router();
const SatsangDesignationController = require("../controller/SatsangDesignationController.js");

// List page
router.get("/", SatsangDesignationController.getSatsangDesignationIndex);

// API endpoints
router.get("/list", SatsangDesignationController.getSatsangDesignationsData);
router.get("/:id", SatsangDesignationController.getSatsangDesignationById);
router.post("/addSatsangDesignation", SatsangDesignationController.postSatsangDesignation);
router.post("/update/:id", SatsangDesignationController.updateSatsangDesignation);
router.delete("/delete/:id", SatsangDesignationController.deleteSatsangDesignation);

module.exports = router;
