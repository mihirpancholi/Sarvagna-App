// models/stateModel.js
const pool = require("../config/db");

class CityArea {
  // Create
  static async addCityArea( city_id, area_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO city_area (city_id, area_name, created_id) VALUES (?, ?, ?)`,
      [city_id, area_name, created_id]
    );
    return result.insertId;
  }

  // Read all
// Read all
static async getAll() {
  const [rows] = await pool.execute(`
    SELECT city_area.city_area_id,
            city_master.city_name,
           city_area.area_name,
           CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name
    FROM city_area
    LEFT JOIN city_master ON city_master.city_id = city_area.city_id
    LEFT JOIN sevak_master ON sevak_master.sevak_id = city_area.created_id
    WHERE city_area.is_deleted = 'N'
  `);
  return rows;
}
  // Read by ID
// Read by ID
static async getById(id) {
  const [rows] = await pool.execute(
    `SELECT city_area.city_area_id,
            city_area.area_name,
            city_area.city_id,
            city_master.city_name
     FROM city_area
     LEFT JOIN city_master ON city_master.city_id = city_area.city_id
     WHERE city_area.city_area_id = ? AND city_area.is_deleted = 'N'`,
    [id]
  );
  return rows[0];
}

// Update
static async updateCityArea(id, city_id, area_name, updated_id) {
  const [result] = await pool.execute(
    `UPDATE city_area 
     SET city_id = ?, area_name = ?, updated_id = ?, updated_at = NOW()
     WHERE city_area_id = ?`,
    [city_id, area_name, updated_id, id]
  );
  return result;
}


 

  // Soft delete
static async deleteCityArea(city_area_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE city_area
     SET is_deleted = 'Y',
         deleted_at = NOW(),
         deleted_id = ?
     WHERE city_area_id = ?
       AND is_deleted = 'N'`,
    [deleted_id, city_area_id]
  );
  return result;
}


}

module.exports = CityArea;
