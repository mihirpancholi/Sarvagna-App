// models/casteModel.js
const pool = require("../config/db");

class MaritalStatus {
  // Create
  static async addMaritalStatus(marital_status_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO marital_status_master (marital_status_name, created_id) VALUES (?, ?)`,
      [marital_status_name, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT marital_status_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM marital_status_master 
LEFT JOIN sevak_master ON sevak_master.sevak_id = marital_status_master.created_id 
      WHERE marital_status_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM marital_status_master WHERE marital_status_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateMaritalStatus(id, marital_status_name, updated_id) {
    const [result] = await pool.execute(
      `UPDATE marital_status_master SET marital_status_name = ?, updated_id = ?, updated_at = NOW() WHERE marital_status_id = ?`,
      [marital_status_name, updated_id, id]
    );
    return result;
  }

  // Soft delete
  static async deleteMaritalStatus(marital_status_id, deleted_id) {
    const [result] = await pool.execute(
      `UPDATE marital_status_master 
       SET is_deleted = 'Y', 
           deleted_at = NOW(), 
           deleted_id = ? 
     WHERE marital_status_id = ? 
       AND is_deleted = 'N'`,
      [deleted_id, marital_status_id]
    );
    return result;
  }


}

module.exports = MaritalStatus;
