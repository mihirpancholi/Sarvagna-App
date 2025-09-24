// models/casteModel.js
const pool = require("../config/db");

class SatsangDesignation {
  // Create
  static async addSatsangDesignation(satsang_designation_name, satsang_activity_id , created_id) {
    const [result] = await pool.execute(
      `INSERT INTO satsang_designation_master (satsang_designation_name, satsang_activity_id , created_id) VALUES (?, ?, ?)`,
      [satsang_designation_name, satsang_activity_id , created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT satsang_designation_master.*, 
             satsang_activity_master.satsang_activity_name,
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM satsang_designation_master 
      JOIN sevak_master ON sevak_master.sevak_id = satsang_designation_master.created_id 
      LEFT JOIN satsang_activity_master ON satsang_activity_master.satsang_activity_id = satsang_designation_master.satsang_activity_id
      WHERE satsang_designation_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM satsang_designation_master WHERE satsang_designation_id  = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateSatsang_Designation(id, satsang_designation_name, satsang_activity_id , updated_id) {
    const [result] = await pool.execute(
      `UPDATE satsang_designation_master SET satsang_designation_name = ?, satsang_activity_id   = ?, updated_id = ?, updated_at = NOW() WHERE satsang_designation_id  = ?`,
      [satsang_designation_name, satsang_activity_id , updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteSatsangDesignation(satsang_designation_id , deleted_id) {
  const [result] = await pool.execute(
    `UPDATE satsang_designation_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE satsang_designation_id  = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, satsang_designation_id ]
  );
  return result;
}


}

module.exports = SatsangDesignation;
