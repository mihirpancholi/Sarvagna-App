// models/gosthiGroupModel.js
const pool = require("../config/db");

class GosthiGroup {

  // Read all
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT group_master.*, 
      zone_master.zone_name,
      kshetra_master.kshetra_name,
      mandir_master.mandir_name,
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM group_master  
      left join kshetra_master on kshetra_master.kshetra_id = group_master.kshetra_id
      left join mandir_master on mandir_master.mandir_id = group_master.mandir_id
      left join zone_master on zone_master.zone_id = group_master.zone_id
      left JOIN sevak_master ON sevak_master.sevak_id = group_master.created_id 
      WHERE group_master.is_deleted = 'N'
    `);
    return rows;
  }


  static async getZoneNameById(zoneId) {
    const [rows] = await pool.execute(
      `SELECT zone_id, zone_name FROM zone_master WHERE is_deleted='N' AND zone_id = ?`,
      [zoneId]
    );
    return rows;
  }

    static async addGroup(zone_code,zone_no,zone_id,mandir_id,kshetra_id,group_code,group_name, created_id) {
    const [result] = await pool.execute(
      `INSERT INTO group_master (zone_code,zone_no,zone_id,mandir_id,kshetra_id,group_code,group_name,created_id) VALUES (?,?,?,?,?,?,?,?)`,
      [zone_code,zone_no,zone_id,mandir_id,kshetra_id,group_code,group_name, created_id]
    );
    return result.insertId;
  }

    // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM group_master WHERE group_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }

static async checkDuplicateGroup(groupId, group_name, gcode) {
  const [rows] = await pool.execute(
    `SELECT group_id, group_name 
     FROM group_master 
     WHERE is_deleted = 'N' 
       AND group_id != ? 
       AND (group_name = ? OR group_code = ?) 
     LIMIT 1`,
    [groupId, group_name, gcode]
  );
  return rows.length > 0 ? rows[0] : null;
}

  static async updateGroup(id, zone_code, zone_no, zone_id, mandir_id, kshetra_id, group_code, group_name, updated_id) {
  const [result] = await pool.execute(
    `UPDATE group_master 
     SET zone_code = ?, zone_no = ?, zone_id = ?, mandir_id = ?, kshetra_id = ?, 
         group_code = ?, group_name = ?, updated_id = ?, updated_at = NOW() 
     WHERE group_id = ?`,
    [zone_code, zone_no, zone_id, mandir_id, kshetra_id, group_code, group_name, updated_id, id]
  );
  return result;
}


  static async findByGroupCode(group_code) {
  const [rows] = await pool.execute(
    `SELECT group_id FROM group_master WHERE group_code = ? LIMIT 1`,
    [group_code]
  );
  return rows.length > 0 ? rows[0] : null;
}


    // Soft delete
static async deleteGroupmaster(group_id, deleted_id) {
  const [result] = await pool.execute(
    `UPDATE group_master 
     SET is_deleted = 'Y', 
         deleted_at = NOW(), 
         deleted_id = ? 
     WHERE group_id = ? 
       AND is_deleted = 'N'`, 
    [deleted_id, group_id]
  );
  return result;
}

  
}


  




module.exports = GosthiGroup;
