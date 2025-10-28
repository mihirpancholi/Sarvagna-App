// models/stateModel.js
const pool = require("../config/db");

class Kshetra {
  // Create
  static async addKshetra(Kshetra_code,Kshetra_name,zone_id,mandir_id,sant_nirdeshak_id,nirdeshak_id, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO kshetra_master (Kshetra_code,Kshetra_name,zone_id,mandir_id,sant_nirdeshak_id,nirdeshak_id, created_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [Kshetra_code,Kshetra_name,zone_id,mandir_id,sant_nirdeshak_id,nirdeshak_id, created_id]
    );
    return result.insertId;
  }

// Read all
static async getAll() {
  const [rows] = await pool.execute(`
    SELECT kshetra_master.*,
           zone_master.zone_name,
           mandir_master.mandir_name,
           sant_nirdeshak_master.sant_nirdeshak_name,
           nirdeshak_master.nirdeshak_name,
           CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name
    FROM kshetra_master
    JOIN sevak_master ON sevak_master.sevak_id = kshetra_master.created_id
    LEFT JOIN zone_master ON zone_master.zone_id = kshetra_master.zone_id
    LEFT JOIN mandir_master ON mandir_master.mandir_id = kshetra_master.mandir_id
    LEFT JOIN sant_nirdeshak_master ON sant_nirdeshak_master.sant_nirdeshak_id = kshetra_master.sant_nirdeshak_id
    LEFT JOIN nirdeshak_master ON nirdeshak_master.nirdeshak_id = kshetra_master.nirdeshak_id
    WHERE kshetra_master.is_deleted = 'N'
  `);
  return rows;
}

  // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM kshetra_master 
    JOIN country_master ON country_master.country_id = kshetra_master.country_id
    JOIN state_master ON state_master.state_id = kshetra_master.state_id
      WHERE kshetra_master.kshetra_master = ? AND kshetra_master.is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

// Update
static async updateKshetra(id, Kshetra_code,Kshetra_name,zone_id,mandir_id,sant_nirdeshak_id,nirdeshak_id, updated_id) {
  const [result] = await pool.execute(
    `UPDATE kshetra_master 
     SET Kshetra_code = ?, Kshetra_name = ?, zone_id = ?, mandir_id = ?, sant_nirdeshak_id = ?, nirdeshak_id = ?, updated_id = ?, updated_at = NOW() 
     WHERE kshetra_id = ?`,
    [Kshetra_code, Kshetra_name, zone_id, mandir_id, sant_nirdeshak_id, nirdeshak_id, updated_id, id]
  );
  return result;
}

  // Soft delete
static async deleteKshetra(kshetra_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE kshetra_master
     SET is_deleted = 'Y',
         deleted_at = NOW(),
         deleted_id = ?
     WHERE kshetra_id = ?
       AND is_deleted = 'N'`,
    [deleted_id, kshetra_id]
  );
  return result;
}


}

module.exports = Kshetra;
