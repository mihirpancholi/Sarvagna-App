const express = require("express");
const router = express.Router();
const CityAreaController = require("../controller/CityAreaController");

// List page
router.get("/", CityAreaController.getCityAreaIndex);

// API endpoints
router.get("/list", CityAreaController.getCityAreasData);
router.get("/:id", CityAreaController.getCityAreaById);
router.post("/addCityArea", CityAreaController.postCityArea);
router.post("/update/:id", CityAreaController.updateCityArea);
router.delete("/delete/:id", CityAreaController.deleteCityArea);



module.exports = router;
