// models/casteModel.js
const pool = require("../config/db");

class SatsangActivity {
  // Create
  static async addSatsangActivity(satsang_activity_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO satsang_activity_master (satsang_activity_name, created_id) VALUES (?, ?)`,
      [satsang_activity_name, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT satsang_activity_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM satsang_activity_master 
      JOIN sevak_master ON sevak_master.sevak_id = satsang_activity_master.created_id 
      WHERE satsang_activity_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM satsang_activity_master WHERE satsang_activity_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateSatsangActivity(id, satsang_activity_name, updated_id) {
    const [result] = await pool.execute(
      `UPDATE satsang_activity_master SET satsang_activity_name = ?, updated_id = ?, updated_at = NOW() WHERE satsang_activity_id = ?`,
      [satsang_activity_name, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteSatsangActivity(satsang_activity_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE satsang_activity_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE satsang_activity_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, satsang_activity_id]
  );
  return result;
}


}

module.exports = SatsangActivity;
