// models/stateModel.js
const pool = require("../config/db");

class Specialization {
  // Create
  static async addSpecialization(specialization, created_id, degree_id) {
    const [result] = await pool.execute(
      `INSERT INTO specialization_master (degree_id, specialization, created_id) VALUES (?, ?, ?)`,
      [degree_id, specialization, created_id]
    );
    return result.insertId;
  }

  // Read all
// Read all
static async getAll() {
  const [rows] = await pool.execute(`
    SELECT specialization_master.*,
           degree_master.degree,
           CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name
    FROM specialization_master
    LEFT JOIN degree_master ON degree_master.degree_id = specialization_master.degree_id
    LEFT JOIN sevak_master ON sevak_master.sevak_id = specialization_master.created_id
    WHERE specialization_master.is_deleted = 'N'
  `);
  return rows;
}

// Update
static async updateSpecialization(id, specialization, degree_id, updated_id) {
  const [result] = await pool.execute(
    `UPDATE specialization_master 
     SET specialization = ?, degree_id = ?, updated_id = ?, updated_at = NOW() 
     WHERE specialization_id = ?`,
    [specialization, degree_id, updated_id, id]
  );
  return result;
}


// Soft delete
static async deleteSpecialization(specialization_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE specialization_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE specialization_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, specialization_id]
  );
  return result;
}



}

module.exports = Specialization;
