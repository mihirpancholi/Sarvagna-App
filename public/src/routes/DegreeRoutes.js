const express = require("express");
const router = express.Router();
const DegreeController = require("../controller/DegreeController");

// List page
router.get("/", DegreeController.getDegreeIndex);

// API endpoints
router.get("/list", DegreeController.getDegreesData);
router.get("/:id", DegreeController.getDegreeById);
router.post("/addDegree", DegreeController.postDegree);
router.post("/update/:id", DegreeController.updateDegree);
router.delete("/delete/:id", DegreeController.deleteDegree);

module.exports = router;
