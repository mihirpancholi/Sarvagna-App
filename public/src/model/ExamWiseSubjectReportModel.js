const pool = require("../config/db");

class ExamWiseSubjectReportModel {
    static async getTalimBatches() {
        const [rows] = await pool.query(
            "SELECT talim_batch_id, concat(talim_year, '-', if(talim_batch = 'F', 'First', 'Second')) AS batch FROM talim_batch_master WHERE is_deleted = 'N' ORDER BY talim_year DESC, talim_batch DESC"
        );
        return rows;
    }

    static async getExamTypes() {
        const [rows] = await pool.query(
            "SELECT examtype_id, exam_type FROM exam_type_master WHERE is_deleted='N' ORDER BY exam_type"
        );
        return rows;
    }

    static async getExamsByTypeAndBatch(talimBatchId, examTypeId) {
        const [rows] = await pool.query(
            `SELECT esm.exam_id, em.exam_name
             FROM exam_schedule_master esm
             INNER JOIN exam_master em ON em.exam_id = esm.exam_id
             WHERE esm.is_deleted = 'N' AND esm.examtype_id = ? AND esm.talim_batch_id = ?
             ORDER BY em.exam_name ASC`,
            [examTypeId, talimBatchId]
        );
        return rows;
    }

    static async getExamSubjectReport(talimBatchId, examTypeId, examId) {
        const [rows] = await pool.query(
            `SELECT
                emem.sevak_id,
                emem.marks,
                emem.attandance,
                etm.exam_type,
                DATE_FORMAT(esm.exam_date, '%d-%m-%Y') as exam_date,
                esm.total_marks,
                em.exam_name,
                CONCAT(sm.first_name, ' ', sm.middle_name, ' ', sm.last_name) AS sevak_name,
                sm.ytk_id,
                cm.city_name
            FROM exam_mark_entry_master emem
            INNER JOIN exam_type_master etm ON etm.examtype_id = emem.examtype_id
            INNER JOIN exam_schedule_master esm ON esm.exam_id = emem.exam_id AND esm.talim_batch_id = emem.talim_batch_id
            INNER JOIN exam_master em ON em.exam_id = emem.exam_id
            INNER JOIN sevak_master sm ON sm.sevak_id = emem.sevak_id
            LEFT JOIN city_master cm ON cm.city_id = sm.city_id
            WHERE emem.is_deleted = 'N'
              AND sm.sevak_type = 'S'
              AND (sm.certified_status = 'Y' OR sm.temporary_status = 'Y')
              AND (sm.expired_status != 'Y' AND sm.sant_in_baps_status != 'Y')
              AND emem.talim_batch_id = ?
              AND emem.exam_id = ?
              AND emem.examtype_id = ?`,
            [talimBatchId, examId, examTypeId]
        );
        return rows;
    }
}

module.exports = ExamWiseSubjectReportModel;