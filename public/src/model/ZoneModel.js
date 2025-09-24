// models/regionModel.js
const pool = require("../config/db");

class Zone {
  // Create
  static async addZone(zone_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO zone_master (zone_name, created_id) VALUES (?, ?)`,
      [zone_name, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT zone_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM zone_master 
      JOIN sevak_master ON sevak_master.sevak_id = zone_master.created_id 
      WHERE zone_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM zone_master WHERE zone_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateZone(id, zone_name, updated_id) {
    const [result] = await pool.execute(
      `UPDATE zone_master SET zone_name = ?, updated_id = ?, updated_at = NOW() WHERE zone_id = ?`,
      [zone_name, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteZone(zone_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE zone_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE zone_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, zone_id]
  );
  return result;
}


}

module.exports = Zone;
