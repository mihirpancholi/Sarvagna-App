// models/stateModel.js
const pool = require("../config/db");

class City {
  // Create
  static async addCity(state_id, country_id,  district_id, taluka_id, city_name,created_id) {
    const [result] = await pool.execute(
      `INSERT INTO city_master (state_id, country_id,  district_id, taluka_id, city_name, created_id) VALUES (?, ?, ?, ?,?, ?)`,
      [state_id, country_id,  district_id, taluka_id, city_name, created_id ]
    );
    return result.insertId;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM city_master WHERE city_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }
// Read all
static async getAll() {
  const [rows] = await pool.execute(`
    SELECT city_master.*,
           country_master.country_name,
            state_master.state_name,
           district_master.district_name,
           taluka_master.taluka_name,
           CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name
    FROM city_master
    LEFT JOIN country_master ON country_master.country_id = city_master.country_id
    LEFT JOIN state_master ON state_master.state_id = city_master.state_id
    LEFT JOIN district_master ON district_master.district_id = city_master.district_id
    LEFT JOIN taluka_master ON taluka_master.taluka_id = city_master.taluka_id
    LEFT JOIN sevak_master ON sevak_master.sevak_id = city_master.created_id
    WHERE city_master.is_deleted = 'N'
  `);
  return rows;
}

// Update
static async updateCity(id, country_id, state_id, district_id, taluka_id, city_name, updated_id) {
  const [result] = await pool.execute(
    `UPDATE city_master 
     SET country_id = ?, state_id = ?, district_id = ?, taluka_id = ?, city_name = ?, 
         updated_id = ?, updated_at = NOW() 
     WHERE city_id = ?`,
    [country_id, state_id, district_id, taluka_id, city_name, updated_id, id]
  );
  return result;
}



  // Soft delete
static async deleteCity(id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE city_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE city_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, id]
  );
  return result;
}


}

module.exports = City;
