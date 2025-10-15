// models/GosthiScheduleModel.js
const pool = require("../config/db");

class GosthiSchedule {
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT gosthi_schedule.*, 
             CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
      FROM gosthi_schedule 
      JOIN sevak_master ON sevak_master.sevak_id = gosthi_schedule.created_id 
      WHERE gosthi_schedule.is_deleted = 'N'
    `);
    return rows;
  }

  // Equivalent of getYearwiseMonth()
  static async getYearwiseMonth(gosthiYear) {
    const [rows] = await pool.execute(
      `SELECT gosthi_month 
       FROM gosthi_schedule 
       WHERE is_deleted = 'N' AND gosthi_year = ?`,
      [gosthiYear]
    );
    return rows;
  }

  static async getGosthiNo(gosthiTopicTypeId, gosthiMonth) {
    const [rows] = await pool.execute(
      `
      SELECT MAX(gosthi_schedule_detail.gosthi_topic_type_no) AS gosthi_topic_type_no
      FROM gosthi_schedule_detail
      INNER JOIN gosthi_schedule 
        ON gosthi_schedule.gosthi_schedule_id = gosthi_schedule_detail.gosthi_schedule_id
      WHERE gosthi_schedule_detail.is_deleted = 'N' 
        AND gosthi_schedule_detail.gosthi_topic_type_id = ?
        AND gosthi_schedule.gosthi_month = ?
      `,
      [gosthiTopicTypeId, gosthiMonth]
    );
    return rows;
  }

  static async insertGosthiSchedule(gosthiScheduleData) {
    const [result] = await pool.execute(
      `INSERT INTO gosthi_schedule (gosthi_year, gosthi_month, report_submission_from_date, created_id) 
       VALUES (?, ?, ?, ?)`,
      [
        gosthiScheduleData.gosthi_year,
        gosthiScheduleData.gosthi_month,
        gosthiScheduleData.report_submission_from_date,
        gosthiScheduleData.created_id,
      ]
    );
    return result.insertId;
  }

  static async insertGosthiScheduleDetail(scheduleDetailData) {
    const [result] = await pool.execute(
      `INSERT INTO gosthi_schedule_detail (gosthi_schedule_id, gosthi_topic_type_id, gosthi_topic_type_no, topic_name, created_id)
       VALUES (?, ?, ?, ?, ?)`,
      [
        scheduleDetailData.gosthi_schedule_id,
        scheduleDetailData.gosthi_topic_type_id,
        scheduleDetailData.gosthi_topic_type_no,
        scheduleDetailData.topic_name,
        scheduleDetailData.created_id,
      ]
    );
    return result.insertId;
  }

  static async deleteGosthiSchedule(gosthi_schedule_id, deleted_id) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // 1️⃣ Soft delete from gosthi_schedule
      await conn.execute(
        `UPDATE gosthi_schedule 
         SET is_deleted = 'Y', deleted_at = NOW(), deleted_id = ? 
         WHERE gosthi_schedule_id = ? AND is_deleted = 'N'`,
        [deleted_id, gosthi_schedule_id]
      );

      // 2️⃣ Soft delete from gosthi_schedule_detail
      const [result] = await conn.execute(
        `UPDATE gosthi_schedule_detail 
         SET is_deleted = 'Y', deleted_at = NOW(), deleted_id = ? 
         WHERE gosthi_schedule_id = ? AND is_deleted = 'N'`,
        [deleted_id, gosthi_schedule_id]
      );

      await conn.commit();
      return result.affectedRows > 0;
    } catch (err) {
      await conn.rollback();
      console.error("Error Deleting", err);
      throw err;
    } finally {
      conn.release();
    }
  }

  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT gs.*, gsd.gosthi_schedule_detail_id, gsd.gosthi_topic_type_id,
      gsd.gosthi_topic_type_no, gsd.topic_name,
     gtm.gosthi_topic_type
      FROM gosthi_schedule gs
     LEFT JOIN gosthi_schedule_detail gsd ON gs.gosthi_schedule_id = gsd.gosthi_schedule_id
     LEFT JOIN gosthi_topic_type_master gtm on gtm.gosthi_topic_type_id = gsd.gosthi_topic_type_id
     WHERE gs.gosthi_schedule_id = ? AND gs.is_deleted = 'N' AND gsd.is_deleted = 'N'`,
      [id]
    );

    if (!rows.length) return null;

    // Structure response
    const schedule = {
      gosthi_schedule_id: rows[0].gosthi_schedule_id,
      gosthi_year: rows[0].gosthi_year,
      gosthi_month: rows[0].gosthi_month,
      report_submission_from_date: rows[0].report_submission_from_date,
      topics: rows.map(r => ({
        gosthi_schedule_detail_id: r.gosthi_schedule_detail_id,
        gosthi_topic_type_id: r.gosthi_topic_type_id,
        gosthi_topic_type_no: r.gosthi_topic_type_no,
        topic_name: r.topic_name,
        gosthi_topic_type: r.gosthi_topic_type
      }))

    };

    return schedule;
  }

  static async UpdateGosthiSchedule(gosthiScheduleData) {
    const [result] = await pool.execute(
      `UPDATE gosthi_schedule 
       SET gosthi_year = ?, 
           gosthi_month = ?, 
           report_submission_from_date = ?, 
           updated_id = ?, 
           updated_at = NOW()
       WHERE gosthi_schedule_id = ?`,
      [
        gosthiScheduleData.gosthi_year,
        gosthiScheduleData.gosthi_month,
        gosthiScheduleData.report_submission_from_date,
        gosthiScheduleData.updated_id,
        gosthiScheduleData.gosthi_schedule_id
      ]
    );
    return result.affectedRows;
  }

  // Mark all existing details as deleted
  static async DeleteGosthiScheduleDetails(gosthiScheduleData) {
    const [result] = await pool.execute(
      `UPDATE gosthi_schedule_detail
       SET is_deleted = 'Y', deleted_at = NOW(), deleted_id = ?
       WHERE gosthi_schedule_id = ?`,
      [
        gosthiScheduleData.updated_id,
        gosthiScheduleData.gosthi_schedule_id
      ]
    );
    return result.affectedRows;
  }

  // // Insert a new topic detail
  // static async InsertGosthiScheduleDetail(scheduleDetailData) {
  //   const [result] = await pool.execute(
  //     `INSERT INTO gosthi_schedule_detail 
  //      (gosthi_schedule_id, gosthi_topic_type_id, gosthi_topic_type_no, topic_name, created_id, created_at)
  //      VALUES (?, ?, ?, ?, ?, NOW())`,
  //     [
  //       scheduleDetailData.gosthi_schedule_id,
  //       scheduleDetailData.gosthi_topic_type_id,
  //       scheduleDetailData.gosthi_topic_type_no,
  //       scheduleDetailData.topic_name,
  //       scheduleDetailData.created_id
  //     ]
  //   );
  //   return result.insertId;
  // }












}

module.exports = GosthiSchedule;
