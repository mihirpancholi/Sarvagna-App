const express = require("express");
const router = express.Router();
const GosthiScheduleController = require("../controller/GosthiScheduleController.js");

// List page
router.get("/", GosthiScheduleController.getGosthiScheduleIndex);

// API endpoints
router.get("/list", GosthiScheduleController.getGosthiSchedulesData);
router.get("/add", GosthiScheduleController.addGosthiSchedule);
router.post("/getYearwiseMonth", GosthiScheduleController.getYearwiseMonth);
router.post("/getGosthiNo", GosthiScheduleController.getGosthiNo);
router.post("/addGosthiSchedule", GosthiScheduleController.postGosthiSchedule);
router.get("/:id", GosthiScheduleController.getGosthiScheduleById);
router.get("/update/:id", GosthiScheduleController.updateview);
router.post("/Postupdate/:id", GosthiScheduleController.PostupdateGosthiSchedule);
router.delete("/delete/:id", GosthiScheduleController.deleteGosthiSchedule);

module.exports = router;
