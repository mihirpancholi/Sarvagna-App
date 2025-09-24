// controller/gradeController.js
const path = require("path");
const Room = require("../model/RoomModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show room list page
exports.getRoomIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Master", "Room", "list.html"));
};

// API - fetch room list
exports.getRoomsData = async (req, res) => {
  try {
    const rows = await Room.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching room list:", err);
    res.status(500).json({ message: "Error fetching room list" });
  }
};

// Add room (modal submit)
exports.postRoom = async (req, res) => {
  try {
    const { room_no, no_of_occupancy, created_id } = req.body;
    const id = await Room.addRoom(room_no, no_of_occupancy, created_id || 1); // default to 1 if missing
    res.json({ success: true, message: "Room added successfully", id });
  } catch (err) {
    console.error("Error adding room:", err);
    res.status(500).json({ success: false, message: "Error adding room" });
  }
};

// Get room by ID (for update modal)
exports.getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.getById(id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    console.error("Error fetching room:", err);
    res.status(500).json({ message: "Error fetching room" });
  }
};

// Update room
exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // This should be the ID of the user making the update
    const { room_no, no_of_occupancy } = req.body;
    await Room.updateRoom(id, room_no, no_of_occupancy, updated_id);
    res.json({ success: true, message: "Room updated successfully" });
  } catch (err) {
    console.error("Error updating room:", err);
    res.status(500).json({ success: false, message: "Error updating room" });
  }
};

// Delete room
exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1; 
    await Room.deleteRoom(id, deleted_id);
    res.json({ success: true, message: "Room deleted successfully" });
  } catch (err) {
    console.error("Error deleting room:", err);
    res.status(500).json({ success: false, message: "Error deleting room" });
  }
};
