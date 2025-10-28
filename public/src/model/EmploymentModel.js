// models/employmentModel.js
const pool = require("../config/db");

class Employment {
  // Create
  static async addEmployment(employment_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO employment_master (employment_name, created_id) VALUES (?, ?)`,
      [employment_name, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT employment_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM employment_master 
LEFT JOIN sevak_master ON sevak_master.sevak_id = employment_master.created_id 
      WHERE employment_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM employment_master WHERE employment_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateEmployment(id, employment_name, updated_id) {
    const [result] = await pool.execute(
      `UPDATE employment_master SET employment_name = ?, updated_id = ?, updated_at = NOW() WHERE employment_id = ?`,
      [employment_name, updated_id, id]
    );
    return result;
  }

  // Soft delete
  static async deleteEmployment(employment_id, deleted_id) {
    const [result] = await pool.execute(
      `UPDATE employment_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE employment_id = ? 
       AND is_deleted = 'N'`,
      [deleted_id, employment_id]
    );
    return result;
  }


}

module.exports = Employment;
