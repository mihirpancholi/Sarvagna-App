// models/stateModel.js
const pool = require("../config/db");

class State {
  // Create
  static async addState(state_name, created_id, country_id) {
    const [result] = await pool.execute(
      `INSERT INTO state_master (country_id, state_name, created_id) VALUES (?, ?, ?)`,
      [country_id, state_name, created_id]
    );
    return result.insertId;
  }

  // Read all
// Read all
static async getAll() {
  const [rows] = await pool.execute(`
    SELECT state_master.state_id,
           state_master.state_name,
           state_master.country_id,
           country_master.country_name,
           CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name
    FROM state_master
    JOIN country_master ON country_master.country_id = state_master.country_id
    JOIN sevak_master ON sevak_master.sevak_id = state_master.created_id
    WHERE state_master.is_deleted = 'N'
  `);
  return rows;
}

// Update
static async updateState(id, state_name, country_id, updated_id) {
  const [result] = await pool.execute(
    `UPDATE state_master 
     SET state_name = ?, country_id = ?, updated_id = ?, updated_at = NOW() 
     WHERE state_id = ?`,
    [state_name, country_id, updated_id, id]
  );
  return result;
}


// Soft delete
static async deleteState(state_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE state_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE state_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, state_id]
  );
  return result;
}



}

module.exports = State;
