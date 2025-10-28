const express = require("express");
const router = express.Router();
const GosthiController = require("../controller/GosthiController.js");

// List page
router.get("/", GosthiController.getGosthiIndex);
router.get("/createGosthi", GosthiController.createGosthi);

router.get("/groups", GosthiController.getGroups);
router.get("/tablereport", GosthiController.getGosthiReports);
router.post("/add", GosthiController.PostcreateGosthi);


module.exports = router;
