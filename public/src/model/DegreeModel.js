// models/casteModel.js
const pool = require("../config/db");

class Degree {
  // Create
  static async addDegree(degree, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO degree_master (degree, created_id) VALUES (?, ?)`,
      [degree, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT degree_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM degree_master 
      JOIN sevak_master ON sevak_master.sevak_id = degree_master.created_id 
      WHERE degree_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM degree_master WHERE degree_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateDegree(id, degree, updated_id) {
    const [result] = await pool.execute(
      `UPDATE degree_master SET degree = ?, updated_id = ?, updated_at = NOW() WHERE degree_id = ?`,
      [degree, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteDegree(degree_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE degree_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE degree_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, degree_id]
  );
  return result;
}


}

module.exports = Degree;
