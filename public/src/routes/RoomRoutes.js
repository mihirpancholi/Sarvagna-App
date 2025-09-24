const express = require("express");
const router = express.Router();
const RoomController = require("../controller/RoomController");

// List page
router.get("/", RoomController.getRoomIndex);

// API endpoints
router.get("/list", RoomController.getRoomsData);
router.get("/:id", RoomController.getRoomById);
router.post("/addRoom", RoomController.postRoom);
router.post("/update/:id", RoomController.updateRoom);
router.delete("/delete/:id", RoomController.deleteRoom);

module.exports = router;
