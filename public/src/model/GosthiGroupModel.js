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

  
}


  




module.exports = GosthiGroup;
