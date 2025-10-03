// models/stateModel.js
const pool = require("../config/db");

class SevakRegistration {
  // Create
  static async addSevakRegistration(SevakRegistration, created_id, degree_id) {
    const [result] = await pool.execute(
      `INSERT INTO SevakRegistration_master (degree_id, SevakRegistration, created_id) VALUES (?, ?, ?)`,
      [degree_id, SevakRegistration, created_id]
    );
    return result.insertId;
  }

// Read all
static async getAll() {
  const [rows] = await pool.execute(`
    SELECT SevakRegistration_master.*,
           degree_master.degree,
           CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name
    FROM SevakRegistration_master
    LEFT JOIN degree_master ON degree_master.degree_id = SevakRegistration_master.degree_id
    LEFT JOIN sevak_master ON sevak_master.sevak_id = SevakRegistration_master.created_id
    WHERE SevakRegistration_master.is_deleted = 'N'
  `);
  return rows;
  }
  

    // Read by ID
  static async getTalimBatchById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM talim_batch_master WHERE talim_batch_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0]; // single row
  }




  // adding sevak master
     static async checkDuplicateSevak(talim_batch_id, sevak_no) {
    const [rows] = await pool.execute(
      "SELECT * FROM sevak_master WHERE talim_batch_id = ? AND sevak_no = ? AND is_deleted = 'N'",
      [talim_batch_id, sevak_no]
    );
    return rows;
  }

  static async insert(table, data) {
    const [result] = await pool.execute(`INSERT INTO ${table} SET ?`, [data]);
    return result.insertId;
  }

  static async insertMultiple(table, records) {
    for (let record of records) {
      await pool.execute(`INSERT INTO ${table} SET ?`, [record]);
    }
  }


  




}

module.exports = SevakRegistration;
