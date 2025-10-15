const express = require("express");
const router = express.Router();
const CityController = require("../controller/CityController");

// List page
router.get("/", CityController.getCityIndex);

// API endpoints
router.get("/list", CityController.getCitiesData);
router.get("/:id", CityController.getCityById);
router.post("/addCity", CityController.postCity);
router.post("/update/:id", CityController.updateCity);
router.delete("/delete/:id", CityController.deleteCity);

module.exports = router;
