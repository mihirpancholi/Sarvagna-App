// models/CountryModel.js
const pool = require("../config/db");

class Country {
  // Create
  static async add(country_name, dialing_code, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO country_master (
       country_name, dialing_code, created_id) VALUES (?, ?, ?)`,
      [country_name, dialing_code, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT country_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM country_master 
      JOIN sevak_master ON sevak_master.sevak_id = country_master.created_id 
      WHERE country_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM country_master WHERE country_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateCountry(id, country_name, dialing_code, updated_id) {
    const [result] = await pool.execute(
      `UPDATE country_master SET country_name = ?, dialing_code = ?,  updated_id = ?  WHERE country_id = ?`,
      [country_name, dialing_code, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteCountry(country_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE country_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE country_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, country_id]
  );
  return result;
}


}

module.exports = Country;
