// models/SantNirdeshakModel.js
const pool = require("../config/db");

class SantNirdeshak {
  // Create
  static async addSantNirdeshak(sant_nirdeshak_name, mobile_no, whatapp_no, email_id, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO sant_nirdeshak_master (sant_nirdeshak_name, mobile_no, whatapp_no, email_id, created_id) VALUES (?, ?, ?, ?, ?)`,
      [sant_nirdeshak_name, mobile_no, whatapp_no, email_id, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT sant_nirdeshak_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM sant_nirdeshak_master 
LEFT JOIN sevak_master ON sevak_master.sevak_id = sant_nirdeshak_master.created_id 
      WHERE sant_nirdeshak_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getSantNirdeshakById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM sant_nirdeshak_master WHERE sant_nirdeshak_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updatesantnirdeshak(id, sant_nirdeshak_name, mobile_no, whatapp_no, email_id, updated_id) {
    const [result] = await pool.execute(
      `UPDATE sant_nirdeshak_master SET sant_nirdeshak_name = ?, mobile_no = ?, whatapp_no = ?, email_id = ?, updated_id = ?, updated_at = NOW() WHERE sant_nirdeshak_id = ?`,
      [sant_nirdeshak_name, mobile_no, whatapp_no, email_id, updated_id, id]
    );
    return result;
  }

  // Soft delete
  static async deleteSantNirdeshak(sant_nirdeshak_id, deleted_id) {
    const [result] = await pool.execute(
      `UPDATE sant_nirdeshak_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE sant_nirdeshak_id = ? 
       AND is_deleted = 'N'`,
      [deleted_id, sant_nirdeshak_id]
    );
    return result;
  }


}

module.exports = SantNirdeshak;
