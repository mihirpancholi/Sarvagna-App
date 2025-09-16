// models/casteModel.js
const pool = require("../config/db");

class Caste {
  // Create
  static async addCaste(caste_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO country_master (
       country_name, country_code, currency_code, dialing_code, created_id) VALUES (?, ?, ?, ?, ?)`,
      [country_name, country_code, currency_code, dialing_code, created_id]
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
      `SELECT * FROM country_master WHERE caste_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async updateCaste(id, caste_name) {
    const [result] = await pool.execute(
      `UPDATE country_master SET caste_name = ? WHERE caste_id = ?`,
      [caste_name, id]
    );
    return result;
  }

  // Soft delete
  static async deleteCaste(id) {
    const [result] = await pool.execute(
      `UPDATE country_master SET is_deleted = 'Y' WHERE caste_id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = Caste;
