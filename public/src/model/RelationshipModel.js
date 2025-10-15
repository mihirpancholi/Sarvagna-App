// models/relationshipModel.js
const pool = require("../config/db");

class Relationship {
  // Create
  static async addRelationship(relationship_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO relationship_master (relationship_name, created_id) VALUES (?, ?)`,
      [relationship_name, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT relationship_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM relationship_master 
      JOIN sevak_master ON sevak_master.sevak_id = relationship_master.created_id 
      WHERE relationship_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM relationship_master WHERE relationship_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async update_Relationship(id, relationship_name, updated_id) {
    const [result] = await pool.execute(
      `UPDATE relationship_master SET relationship_name = ?, updated_id = ?, updated_at = NOW() WHERE relationship_id = ?`,
      [relationship_name, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteRelationship(relationship_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE relationship_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE relationship_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, relationship_id]
  );
  return result;
}


}

module.exports = Relationship;
