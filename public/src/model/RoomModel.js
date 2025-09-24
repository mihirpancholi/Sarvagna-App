// models/gradeModel.js
const pool = require("../config/db");

class Room {
  // Create
  static async addRoom(room_no, no_of_occupancy, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO room_master (room_no, no_of_occupancy, created_id) VALUES (?, ?, ?)`,
      [room_no, no_of_occupancy, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT room_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM room_master 
      JOIN sevak_master ON sevak_master.sevak_id = room_master.created_id 
      WHERE room_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM room_master WHERE room_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateRoom(id, room_no, no_of_occupancy, updated_id) {
    const [result] = await pool.execute(
      `UPDATE room_master SET room_no = ?, no_of_occupancy = ?, updated_id = ?, updated_at = NOW() WHERE room_id = ?`,
      [room_no, no_of_occupancy, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteRoom(room_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE room_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE room_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, room_id]
  );
  return result;
}


}

module.exports = Room;
