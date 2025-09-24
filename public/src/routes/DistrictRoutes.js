const express = require("express");
const router = express.Router();
const DistrictController = require("../controller/DistrictController");

// List page
router.get("/", DistrictController.getDistrictIndex);

// API endpoints
router.get("/list", DistrictController.getDistrictsData);

router.get("/:id", DistrictController.getDistrictById);
router.post("/addDistrict", DistrictController.postDistrict);
router.post("/update/:id", DistrictController.updateDistrict);
router.delete("/delete/:id", DistrictController.deleteDistrict);

module.exports = router;
