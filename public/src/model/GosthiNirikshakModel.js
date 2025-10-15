// models/GosthiNirikshakModel.js
const pool = require("../config/db");

class GosthiNirikshak {

  // Read all
 static async getAll() {
  const [rows] = await pool.execute(`
    SELECT nirikshak_master.*, 
      zone_master.zone_name,
      group_master.group_code,
      group_master.group_name,
      talim_batch_master.talim_year,
      talim_batch_master.talim_batch,
      nirikshak_group.group_id,
      nirikshak_person.ytk_id,
      CONCAT(nirikshak_person.first_name, ' ', nirikshak_person.last_name) AS nirikshak_name,
      CONCAT(created_by.first_name, ' ', created_by.last_name) AS created_by_name
    FROM nirikshak_master  
    LEFT JOIN nirikshak_group ON nirikshak_group.nirikshak_id = nirikshak_master.nirikshak_id
    LEFT JOIN group_master ON group_master.group_id = nirikshak_group.group_id
    LEFT JOIN zone_master ON zone_master.zone_id = nirikshak_master.zone_id
    LEFT JOIN talim_batch_master ON talim_batch_master.talim_batch_id = nirikshak_master.talim_batch_id
    LEFT JOIN sevak_master AS created_by ON created_by.sevak_id = nirikshak_master.created_id
    LEFT JOIN sevak_master AS nirikshak_person ON nirikshak_person.sevak_id = nirikshak_master.sevak_id
    WHERE nirikshak_master.is_deleted = 'N'
  `);
  return rows;
}



static async addNirikshak(zone_id, talim_batch_id, sevak_id, group_id, created_id) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.execute(
      `INSERT INTO nirikshak_master (zone_id, talim_batch_id, sevak_id, created_id)
       VALUES (?, ?, ?, ?)`,
      [zone_id, talim_batch_id, sevak_id, created_id]
    );

    const nirikshak_id = result.insertId;

    await conn.execute(
      `INSERT INTO nirikshak_group (nirikshak_id, zone_id, group_id,created_id)
       VALUES (?, ?, ?,?)`,
      [nirikshak_id, zone_id, group_id,created_id]
    );

    await conn.commit();
    return nirikshak_id;

  } catch (err) {
    await conn.rollback();
    console.error('Error in addNirikshak:', err);
    throw err;
  } finally {
    conn.release();
  }
}


    // Read by ID
  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM nirikshak_master WHERE nirikshak_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0];
  }


static async NirikshakUpdate(id, zone_id, talim_batch_id, sevak_id, group_id,updated_id) {
  await pool.execute(`
    UPDATE nirikshak_master 
    SET zone_id = ?, talim_batch_id = ?, sevak_id = ?, updated_id = ?, updated_at = NOW()  
    WHERE nirikshak_id = ?
  `, [zone_id, talim_batch_id, sevak_id,updated_id, id]);

  // Update group mapping
  await pool.execute(`
    UPDATE nirikshak_group 
    SET zone_id = ?, group_id = ?,updated_id = ?, updated_at = NOW() 
    WHERE nirikshak_id = ?
  `, [zone_id, group_id, updated_id, id]);
  }
  
    static async Delete(nirikshak_id, deleted_id) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // 1️⃣ Soft delete from nirikshak_group
      await conn.execute(
        `UPDATE nirikshak_group 
         SET is_deleted = 'Y', deleted_at = NOW(), deleted_id = ? 
         WHERE nirikshak_id = ? AND is_deleted = 'N'`,
        [deleted_id, nirikshak_id]
      );

      // 2️⃣ Soft delete from nirikshak_master
      const [result] = await conn.execute(
        `UPDATE nirikshak_master 
         SET is_deleted = 'Y', deleted_at = NOW(), deleted_id = ? 
         WHERE nirikshak_id = ? AND is_deleted = 'N'`,
        [deleted_id, nirikshak_id]
      );

      await conn.commit();
      return result.affectedRows > 0;
    } catch (err) {
      await conn.rollback();
      console.error("Error in softDelete (NirikshakModel):", err);
      throw err;
    } finally {
      conn.release();
    }
  }



  
}


  




module.exports = GosthiNirikshak;
