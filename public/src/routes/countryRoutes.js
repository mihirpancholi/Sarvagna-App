const express = require("express");
const router = express.Router();
const countryController = require("../controller/countryController");

// List page
router.get("/", countryController.getCountryIndex);

// API endpoints
router.get("/list", countryController.getCountriesData);
router.get("/:id", countryController.getCountryById);
router.post("/addCountry", countryController.postCountry);
router.post("/update/:id", countryController.updateCountry);
router.delete("/delete/:id", countryController.deleteCountry);

module.exports = router;
