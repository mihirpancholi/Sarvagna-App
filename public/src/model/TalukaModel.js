// models/stateModel.js
const pool = require("../config/db");

class Taluka {
  // Create
  static async addTaluka(country_id, state_id, district_id, taluka_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO taluka_master (country_id, state_id, district_id, taluka_name, created_id) VALUES (?, ?, ?, ?, ?)`,
      [country_id, state_id, district_id, taluka_name, created_id ]
    );
    return result.insertId;
  }

  // Read all
// Read all
static async getAll() {
  const [rows] = await pool.execute(`
    SELECT taluka_master.*,
           country_master.country_name,
            state_master.state_name,
           district_master.district_name,
           CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name
    FROM taluka_master
    JOIN country_master ON country_master.country_id = taluka_master.country_id
    JOIN state_master ON state_master.state_id = taluka_master.state_id
    JOIN district_master ON district_master.district_id = taluka_master.district_id
    JOIN sevak_master ON sevak_master.sevak_id = taluka_master.created_id
    WHERE taluka_master.is_deleted = 'N'
  `);
  return rows;
}

// Update
static async updateTaluka(id,country_id, state_id, district_id, taluka_name, updated_id) {
  const [result] = await pool.execute(
    `UPDATE taluka_master 
     SET country_id = ?, state_id = ?, district_id = ?, taluka_name = ?, updated_id = ?, updated_at = NOW() 
     WHERE taluka_id = ?`,
    [country_id, state_id, district_id, taluka_name, updated_id, id]
  );
  return result;
}


  // Soft delete
static async deleteTaluka(taluka_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE taluka_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE taluka_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, taluka_id]
  );
  return result;
}




}

module.exports = Taluka;
