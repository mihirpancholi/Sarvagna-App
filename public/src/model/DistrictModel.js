// models/stateModel.js
const pool = require("../config/db");

class District {
  // Create
  static async addDistrict(district_name, created_id, country_id, state_id) {
    const [result] = await pool.execute(
      `INSERT INTO district_master (country_id, state_id, district_name, created_id) VALUES (?, ?, ?, ?)`,
      [country_id, state_id, district_name, created_id]
    );
    return result.insertId;
  }

// Read all
static async getAll() {
  const [rows] = await pool.execute(`
    SELECT district_master.*,
           country_master.country_name,
           state_master.state_name,
           CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name
    FROM district_master
    JOIN country_master ON country_master.country_id = district_master.country_id
    JOIN state_master ON state_master.state_id = district_master.state_id
    JOIN sevak_master ON sevak_master.sevak_id = district_master.created_id
    WHERE district_master.is_deleted = 'N'
  `);
  return rows;
}

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM district_master 
    JOIN country_master ON country_master.country_id = district_master.country_id
    JOIN state_master ON state_master.state_id = district_master.state_id
      WHERE district_master.district_master = ? AND district_master.is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

// Update
static async updateDistrict(id, state_id, district_name, country_id, updated_id) {
  const [result] = await pool.execute(
    `UPDATE district_master 
     SET state_id = ?, district_name = ?, country_id = ?, updated_id = ?, updated_at = NOW() 
     WHERE district_id = ?`,
    [state_id, district_name, country_id, updated_id, id]
  );
  return result;
}

  // Soft delete
static async deleteDistrict(district_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE district_master
     SET is_deleted = 'Y',
         deleted_at = NOW(),
         deleted_id = ?
     WHERE district_id = ?
       AND is_deleted = 'N'`,
    [deleted_id, district_id]
  );
  return result;
}




}

module.exports = District;
