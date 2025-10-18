// models/GosthiModel.js
const pool = require("../config/db");

class GosthiModel {


    static async getGroups() {
        const [rows] = await pool.execute(`
      select concat(gm.group_code, '-', gm.group_name) AS group_name, 
            gm.group_id from group_master as gm where is_deleted = 'N' 
            order by group_name asc
    `);
        return rows;
    }

    static async getSanchalakByGroup(group_id) {
        const [rows] = await pool.execute(
            `SELECT sevak_id FROM group_member_mapping 
       WHERE is_sanchalak = 'Y' AND group_id = ? LIMIT 1`,
            [group_id]
        );
        return rows.length ? rows[0].sevak_id : null;
    }

    static async createGosthi(data) {
        const {
            group_id,
            gosthi_date,
            from_time,
            to_time,
            location,
            created_id,
            month,
            year,
            sevak_id,
        } = data;

        const [result] = await pool.execute(
            `INSERT INTO gosthi_master 
      (group_id, sevak_id, month, year, scheduled_date, from_time, to_time, location, created_at, created_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
            [
                group_id,
                sevak_id,
                month,
                year,
                gosthi_date,
                from_time,
                to_time,
                location,
                created_id,
            ]
        );
        return result.insertId;
    }

    static async getGosthiReports(group_id) {
        let sql = `
        SELECT group_name, sevak_name, month, scheduled_date, from_time, to_time, location, report_status 
               FROM gosthi_view`;
        const params = [];

        if (group_id > 0) {
            sql += ` WHERE group_id = ?`;
            params.push(group_id);
        }

        sql += ` ORDER BY scheduled_date DESC`;

        const [rows] = await pool.execute(sql, params);
        return rows;
    }
};

module.exports = GosthiModel;

