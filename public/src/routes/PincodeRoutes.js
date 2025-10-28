const express = require("express");
const router = express.Router();
const PincodeController = require("../controller/PincodeController");

// List page
router.get("/", PincodeController.getPincodeIndex);

// API endpoints
router.get("/list", PincodeController.getPincodesData);
router.get("/:id", PincodeController.getPincodeById);
router.post("/addPincode", PincodeController.postPincode);
router.post("/update/:id", PincodeController.updatePincode);
router.delete("/delete/:id", PincodeController.deletePincode);



module.exports = router;
