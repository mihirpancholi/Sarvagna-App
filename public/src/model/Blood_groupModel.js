// models/bloodGroupModel.js
const pool = require("../config/db");

class BloodGroup {
  // Create
  static async addBloodGroup(blood_group_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO blood_group_master (blood_group_name, created_id) VALUES (?, ?)`,
      [blood_group_name, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT blood_group_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM blood_group_master 
      JOIN sevak_master ON sevak_master.sevak_id = blood_group_master.created_id 
      WHERE blood_group_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getBloodGroupById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM blood_group_master WHERE blood_group_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateBlood_Group(id, blood_group_name, updated_id) {
    const [result] = await pool.execute(
      `UPDATE blood_group_master SET blood_group_name = ?, updated_id = ?, updated_at = NOW() WHERE blood_group_id = ?`,
      [blood_group_name, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteBloodGroup(blood_group_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE blood_group_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE blood_group_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, blood_group_id]
  );
  return result;
}


}

module.exports = BloodGroup;
