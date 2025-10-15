// models/mandirModel.js
const pool = require("../config/db");

class Mandir {
  // Create
  static async addMandir(zone_id, country_id, mandir_type, mandir_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO mandir_master (zone_id, country_id, mandir_type, mandir_name, created_id) VALUES (?, ?, ?, ?, ?)`,
      [zone_id, country_id, mandir_type, mandir_name, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT mandir_master.*, 
      zone_master.zone_name, 
      country_master.country_name,
      CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM mandir_master 
      LEFT JOIN zone_master ON zone_master.zone_id = mandir_master.zone_id
      LEFT JOIN country_master ON country_master.country_id = mandir_master.country_id
      LEFT JOIN sevak_master ON sevak_master.sevak_id = mandir_master.created_id 
      WHERE mandir_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM mandir_master WHERE mandir_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateMandir(id, zone_id, country_id, mandir_type, mandir_name, updated_id) {
    const [result] = await pool.execute(
      `UPDATE mandir_master SET zone_id = ?, country_id = ?, mandir_type = ?, mandir_name = ?, updated_id = ?, updated_at = NOW() WHERE mandir_id = ?`,
      [zone_id, country_id, mandir_type, mandir_name, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteMandir(mandir_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE mandir_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE mandir_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, mandir_id]
  );
  return result;
}


}

module.exports = Mandir;
