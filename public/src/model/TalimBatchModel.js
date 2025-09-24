// models/casteModel.js
const pool = require("../config/db");

class TalimBatch {
  // Create
  static async addTalimBatch(talim_year,talim_batch, start_date, end_date, is_active, created_id ) {
    const [result] = await pool.execute(
      `INSERT INTO talim_batch_master (talim_year, talim_batch,  start_date, end_date, is_active, created_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [talim_year, talim_batch, start_date, end_date, is_active, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT talim_batch_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM talim_batch_master 
      JOIN sevak_master ON sevak_master.sevak_id = talim_batch_master.created_id 
      WHERE talim_batch_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM talim_batch_master WHERE talim_batch_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update 
  static async updateTalimBatch(id, talim_year,talim_batch, start_date, end_date, is_active, updated_id) {
    const [result] = await pool.execute(
      `UPDATE talim_batch_master SET talim_year = ?, talim_batch = ?, start_date = ?, end_date = ?, is_active = ?, updated_id = ?, updated_at = NOW() WHERE talim_batch_id = ?`,
      [talim_year,talim_batch, start_date, end_date, is_active, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteTalimBatch(talim_batch_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE talim_batch_master 
     SET is_deleted = 'Y',
         deleted_at = NOW(),
         deleted_id = ?
     WHERE talim_batch_id = ?
       AND is_deleted = 'N'`,
    [deleted_id, talim_batch_id]
  );
  return result;
}


}

module.exports = TalimBatch;
