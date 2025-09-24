// models/talentModel.js
const pool = require("../config/db");

class Talent {
  // Create
  static async addTalent(talent_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO talent_master (talent_name, created_id) VALUES (?, ?)`,
      [talent_name, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT talent_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM talent_master 
      JOIN sevak_master ON sevak_master.sevak_id = talent_master.created_id 
      WHERE talent_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM talent_master WHERE talent_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateTalent(id, talent_name, updated_id) {
    const [result] = await pool.execute(
      `UPDATE talent_master SET talent_name = ?, updated_id = ?, updated_at = NOW() WHERE talent_id = ?`,
      [talent_name, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteTalent(talent_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE talent_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE talent_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, talent_id]
  );
  return result;
}


}

module.exports = Talent;
