// models/NirdeshakModel.js
const pool = require("../config/db");

class Nirdeshak {
  // Create
  static async addNirdeshak(nirdeshak_name, mobile_no, whatapp_no, email_id, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO nirdeshak_master (nirdeshak_name, mobile_no, whatapp_no, email_id, created_id) VALUES (?, ?, ?, ?, ?)`,
      [nirdeshak_name, mobile_no, whatapp_no, email_id, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT nirdeshak_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM nirdeshak_master 
      JOIN sevak_master ON sevak_master.sevak_id = nirdeshak_master.created_id 
      WHERE nirdeshak_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getNirdeshakById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM nirdeshak_master WHERE nirdeshak_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateNirdeshak(id, nirdeshak_name, mobile_no, whatapp_no, email_id, updated_id) {
    const [result] = await pool.execute(
      `UPDATE nirdeshak_master SET nirdeshak_name = ?, mobile_no = ?, whatapp_no = ?, email_id = ?, updated_id = ?, updated_at = NOW() WHERE nirdeshak_id = ?`,
      [nirdeshak_name, mobile_no, whatapp_no, email_id, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteNirdeshak(nirdeshak_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE nirdeshak_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE nirdeshak_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, nirdeshak_id]
  );
  return result;
}


}

module.exports = Nirdeshak;
