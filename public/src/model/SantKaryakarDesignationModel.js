// models/SantKaryakarDesignationModel.js
const pool = require("../config/db");

class SantKaryakarDesignation {
  // Create
  static async addSantKaryakarDesignation(type, designation, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO sant_karyakar_designation_master (type, designation, created_id) VALUES (?, ?, ?)`,
      [type, designation, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT sant_karyakar_designation_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM sant_karyakar_designation_master 
      JOIN sevak_master ON sevak_master.sevak_id = sant_karyakar_designation_master.created_id 
      WHERE sant_karyakar_designation_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getSantKaryakarDesignationById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM sant_karyakar_designation_master WHERE sant_karyakar_designation_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateSantKaryakarDesignation(id, type, designation, updated_id) {
    const [result] = await pool.execute(
      `UPDATE sant_karyakar_designation_master SET type = ?, designation = ?, updated_id = ?, updated_at = NOW() WHERE sant_karyakar_designation_id = ?`,
      [type, designation, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteSantKaryakarDesignation(sant_karyakar_designation_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE sant_karyakar_designation_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE sant_karyakar_designation_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, sant_karyakar_designation_id]
  );
  return result;
}


}

module.exports = SantKaryakarDesignation;
