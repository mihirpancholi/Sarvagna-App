// models/stateModel.js
const pool = require("../config/db");

class Pincode {
  // Create
  static async addPincode(city_id, pincode, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO pincode_master (city_id, pincode, created_id) VALUES (?, ?, ?)`,
      [city_id, pincode, created_id]
    );
    return result.insertId;
  }

  // Read all
// Read all
static async getAll() {
  const [rows] = await pool.execute(`
    SELECT pincode_master.pin_id,
            city_master.city_name,
           pincode_master.pincode,
           CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name
    FROM pincode_master
    LEFT JOIN city_master ON city_master.city_id = pincode_master.city_id
    LEFT JOIN sevak_master ON sevak_master.sevak_id = pincode_master.created_id
    WHERE pincode_master.is_deleted = 'N'
  `);
  return rows;
}
  // Read by ID
// Read by ID
static async getById(id) {
  const [rows] = await pool.execute(
    `SELECT pincode_master.pin_id,
            pincode_master.city_id,
            pincode_master.pincode,
            city_master.city_name
     FROM pincode_master
     LEFT JOIN city_master ON city_master.city_id = pincode_master.city_id
     WHERE pincode_master.pin_id = ? AND pincode_master.is_deleted = 'N'`,
    [id]
  );
  return rows[0];
}

// Update
static async updatePincode(id, city_id, pincode, updated_id) {
  const [result] = await pool.execute(
    `UPDATE pincode_master 
     SET city_id = ?, pincode = ?, updated_id = ?, updated_at = NOW()
     WHERE pin_id = ?`,
    [city_id, pincode, updated_id, id]
  );
  return result;
}

  // Soft delete
static async deletePincode(pin_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE pincode_master
     SET is_deleted = 'Y',
         deleted_at = NOW(),
         deleted_id = ?
     WHERE pin_id = ?
       AND is_deleted = 'N'`,
    [deleted_id, pin_id]
  );
  return result;
}


}

module.exports = Pincode;
