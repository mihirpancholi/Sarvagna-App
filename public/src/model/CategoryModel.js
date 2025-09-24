// models/relationshipModel.js
const pool = require("../config/db");

class Category {
  // Create
  static async addCategory(category_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO category_master (category_name, created_id) VALUES (?, ?)`,
      [category_name, created_id]
    );
    return result.insertId;
  }

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT category_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM category_master 
      JOIN sevak_master ON sevak_master.sevak_id = category_master.created_id 
      WHERE category_master.is_deleted = 'N'
    `);
    return rows;
  }

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM category_master WHERE category_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

  // Update
  static async update_Category(id, category_name, updated_id) {
    const [result] = await pool.execute(
      `UPDATE category_master SET category_name = ?, updated_id = ?, updated_at = NOW() WHERE category_id = ?`,
      [category_name, updated_id, id]
    );
    return result;
  }

  // Soft delete
static async deleteCategory(category_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE category_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE category_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, category_id]
  );
  return result;
}


}

module.exports = Category;
