const pool = require("../config/db");

class AllExamMarksReportModel {
    static async getTalimBatches() {
        const [rows] = await pool.query(
            "SELECT talim_batch_id, concat(talim_year, '-', if(talim_batch = 'F', 'First', 'Second')) AS batch FROM talim_batch_master WHERE is_deleted = 'N' ORDER BY talim_year DESC, talim_batch DESC"
        );
        return rows;
    }

    static async getExamsForBatch(talimBatchId) {
        const [rows] = await pool.query(
            `SELECT DISTINCT
                em.exam_id,
                em.exam_name,
                esm.total_marks
            FROM exam_mark_entry_master emem
            INNER JOIN exam_master em ON em.exam_id = emem.exam_id
            INNER JOIN exam_schedule_master esm ON esm.exam_id = emem.exam_id AND esm.talim_batch_id = emem.talim_batch_id
            WHERE emem.is_deleted = 'N' AND emem.talim_batch_id = ?
            ORDER BY emem.exam_id`,
            [talimBatchId]
        );
        return rows;
    }

    static async getStudentsForBatch(talimBatchId) {
        const [rows] = await pool.query(
            `SELECT DISTINCT
                sm.sevak_id,
                sm.ytk_id,
                concat(IFNULL(CONCAT(sm.ytk_id, ' - '), ''), sm.first_name, ' ', sm.middle_name, ' ', sm.last_name) AS sevak_name,
                cm.city_name
            FROM exam_mark_entry_master emem
            INNER JOIN sevak_master sm ON sm.sevak_id = emem.sevak_id
            LEFT JOIN city_master cm ON cm.city_id = sm.city_id
            WHERE emem.is_deleted = 'N'
              AND sm.sevak_type = 'S'
              AND sm.certified_status = 'Y'
              AND sm.expired_status != 'Y'
              AND sm.sant_in_baps_status != 'Y'
              AND sm.temporary_status != 'Y'
              AND emem.talim_batch_id = ?
            ORDER BY sm.ytk_id ASC`,
            [talimBatchId]
        );
        return rows;
    }

    static async getAllMarksForBatch(talimBatchId) {
        const [rows] = await pool.query(
            `SELECT
                sevak_id,
                exam_id,
                marks
            FROM exam_mark_entry_master
            WHERE is_deleted = 'N' AND talim_batch_id = ?`,
            [talimBatchId]
        );
        return rows;
    }
}

module.exports = AllExamMarksReportModel;