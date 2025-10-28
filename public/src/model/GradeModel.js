// models/gradeModel.js
const pool = require("../config/db");

class Grade {
  // Create
  static async addGrade(grade_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO grade_master (grade_name, created_id) VALUES (?, ?)`,
      [grade_name, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT grade_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM grade_master 
LEFT JOIN sevak_master ON sevak_master.sevak_id = grade_master.created_id 
      WHERE grade_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM grade_master WHERE grade_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateGrade(id, grade_name, updated_id) {
    const [result] = await pool.execute(
      `UPDATE grade_master SET grade_name = ?, updated_id = ?, updated_at = NOW() WHERE grade_id = ?`,
      [grade_name, updated_id, id]
    );
    return result;
  }

  // Soft delete
  static async deleteGrade(grade_id, deleted_id) {
    const [result] = await pool.execute(
      `UPDATE grade_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE grade_id = ? 
       AND is_deleted = 'N'`,
      [deleted_id, grade_id]
    );
    return result;
  }


}

module.exports = Grade;
