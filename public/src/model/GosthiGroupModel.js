// models/gosthiGroupModel.js
const pool = require("../config/db");

class GosthiGroup {

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT group_master.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM group_master 
      JOIN sevak_master ON sevak_master.sevak_id = group_master.created_id 
      WHERE group_master.is_deleted = 'N'
    `);
    return rows;
  }

  


}

module.exports = GosthiGroup;
