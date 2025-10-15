// models/casteModel.js
const pool = require("../config/db");

class Caste {
  // Create
  static async addCaste(caste_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO caste_master (caste_name, created_id) VALUES (?, ?)`,
      [caste_name, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT caste_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM caste_master 
      JOIN sevak_master ON sevak_master.sevak_id = caste_master.created_id 
      WHERE caste_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM caste_master WHERE caste_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateCaste(id, caste_name, updated_id) {
    const [result] = await pool.execute(
      `UPDATE caste_master SET caste_name = ?, updated_id = ?, updated_at = NOW() WHERE caste_id = ?`,
      [caste_name, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteCaste(caste_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE caste_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE caste_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, caste_id]
  );
  return result;
}


}

module.exports = Caste;
