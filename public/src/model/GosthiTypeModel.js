
// models/GosthiTypeModel.js
const pool = require("../config/db");

class GosthiType {
  // Create
  static async addGosthiType(gosthi_topic_type, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO gosthi_topic_type_master (gosthi_topic_type, created_id) VALUES (?, ?)`,
      [gosthi_topic_type, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT gosthi_topic_type_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM gosthi_topic_type_master 
      JOIN sevak_master ON sevak_master.sevak_id = gosthi_topic_type_master.created_id 
      WHERE gosthi_topic_type_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM gosthi_topic_type_master WHERE gosthi_topic_type_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateGosthiType(id, gosthi_topic_type, updated_id) {
    const [result] = await pool.execute(
      `UPDATE gosthi_topic_type_master SET gosthi_topic_type = ?, updated_id = ?, updated_at = NOW() WHERE gosthi_topic_type_id = ?`,
      [gosthi_topic_type, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteGosthiType(gosthi_topic_type_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE gosthi_topic_type_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE gosthi_topic_type_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, gosthi_topic_type_id]
  );
  return result;
}


}

module.exports = GosthiType;
