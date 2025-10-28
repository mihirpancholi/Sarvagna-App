// model/ExamMarkEntryModel.js
const pool = require("../config/db");

class ExamMarkEntry {

    // Permanently delete a mark entry for a student
    static async deleteMarkEntry(exam_id, sevak_id) {
        const [result] = await pool.execute(
            `DELETE FROM exam_mark_entry_master
         WHERE exam_id = ? AND sevak_id = ?`,
            [exam_id, sevak_id]
        );
        return result;
    }


    // Add Exam Mark Entry
    static async addExamMarkEntry(entryData) {
        const {
            talim_batch_id, examtype_id, exam_id, ytk_id, student_name,
            sevak_id, marks, attandance, remarks, created_id
        } = entryData;

        const [result] = await pool.execute(
            `INSERT INTO exam_mark_entry_master 
         (talim_batch_id, examtype_id, exam_id, ytk_id, student_name, sevak_id, marks, attandance, remarks,  created_id) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [talim_batch_id, examtype_id, exam_id, ytk_id, student_name, sevak_id, marks, attandance, remarks, created_id]
        );

        return result.insertId;
    }

    // Read all
    static async getAll() {
        const [rows] = await pool.execute(`
SELECT
    exam_mark_entry_master.mark_entry_id AS mark_entry_id,
    exam_mark_entry_master.examtype_id AS examtype_id,
    exam_mark_entry_master.exam_id AS exam_id,
    exam_type_master.exam_type AS exam_type,
    exam_master.exam_name AS exam_name,
    (
        SELECT exam_schedule_master.total_marks
        FROM exam_schedule_master
        WHERE exam_schedule_master.examtype_id = exam_mark_entry_master.examtype_id
          AND exam_schedule_master.exam_id = exam_mark_entry_master.exam_id
          AND exam_schedule_master.talim_batch_id = exam_mark_entry_master.talim_batch_id
        LIMIT 1
    ) AS total_marks,
    (
        SELECT DATE_FORMAT(exam_schedule_master.exam_date, '%d-%m-%Y')
        FROM exam_schedule_master
        WHERE exam_schedule_master.examtype_id = exam_mark_entry_master.examtype_id
          AND exam_schedule_master.exam_id = exam_mark_entry_master.exam_id
          AND exam_schedule_master.talim_batch_id = exam_mark_entry_master.talim_batch_id
        LIMIT 1
    ) AS exam_date,
    COUNT(IF(exam_mark_entry_master.attandance = 'P', 1, NULL)) AS present_count,
    COUNT(IF(exam_mark_entry_master.attandance = 'A', 1, NULL)) AS absent_count
FROM
    exam_mark_entry_master
    JOIN exam_master ON exam_master.exam_id = exam_mark_entry_master.exam_id
    JOIN exam_type_master ON exam_type_master.examtype_id = exam_mark_entry_master.examtype_id
    JOIN sevak_master ON sevak_master.sevak_id = exam_mark_entry_master.sevak_id
WHERE
    exam_mark_entry_master.is_deleted = 'N'
    AND (sevak_master.certified_status = 'Y' OR sevak_master.temporary_status = 'Y')
    AND sevak_master.expired_status <> 'Y'
    AND sevak_master.sant_in_baps_status <> 'Y'
    AND exam_mark_entry_master.talim_batch_id IN (
        SELECT talim_batch_master.talim_batch_id
        FROM talim_batch_master
        WHERE talim_batch_master.is_active = 'Y'
          AND talim_batch_master.is_deleted = 'N'
    )
GROUP BY
    exam_mark_entry_master.examtype_id,
    exam_mark_entry_master.exam_id;
            
        `);
        return rows;
    }

    static async getIndexData() {
        const [rows] = await pool.execute(
            `SELECT
  talim_batch_master.talim_batch_id,
  concat(talim_year, '-', if(talim_batch = 'F', 'First', 'Second')) AS batch,
  count(sevak_master.sevak_id) AS sevakCount
FROM talim_batch_master
  INNER JOIN sevak_master ON sevak_master.talim_batch_id = talim_batch_master.talim_batch_id
WHERE talim_batch_master.is_deleted = 'N' AND sevak_master.is_deleted='N'
AND sevak_master.is_active='Y'
AND (sevak_master.certified_status='Y' OR sevak_master.temporary_status='Y') AND (sevak_master.expired_status != 'Y' AND sevak_master.sant_in_baps_status != 'Y')
AND sevak_master.sevak_type='S' AND talim_batch_master.is_active = 'Y'`,
        );
        return rows;
    }

    // Read by ID
    // static async getExamMarkEntryById(exam_id, examtype_id) {
    //     const [rows] = await pool.execute(
    //         `SELECT e.exam_name, t.exam_type, s.exam_date, s.total_marks
    //  FROM exam_mark_entry_master m
    //  JOIN exam_master e ON e.exam_id = m.exam_id
    //  JOIN exam_type_master t ON t.examtype_id = m.examtype_id
    //  JOIN exam_schedule_master s ON s.exam_id = m.exam_id
    //  WHERE m.exam_id = ? AND m.examtype_id = ? AND m.is_deleted = 'N'
    //  LIMIT 1`,
    //         [exam_id, examtype_id]
    //     );
    //     return rows;
    // }

    static async getExamMarkEntryById(exam_id, examtype_id, talim_batch_id) {
        const [rows] = await pool.execute(
            `SELECT
  exam_mark_entry_master.mark_entry_id,
  exam_mark_entry_master.examtype_id,
  exam_mark_entry_master.exam_id,
    date_format(exam_schedule_master.mark_entry_end_date, '%d-%m-%Y') AS mark_entry_end_date
FROM exam_mark_entry_master
  INNER JOIN exam_schedule_master ON exam_schedule_master.exam_id = exam_mark_entry_master.exam_id AND
                                     exam_schedule_master.examtype_id = exam_mark_entry_master.examtype_id
WHERE exam_mark_entry_master.is_deleted = 'N' AND
exam_mark_entry_master.exam_id = ? AND
exam_mark_entry_master.examtype_id = ? AND
exam_schedule_master.talim_batch_id = ?
`,
            [exam_id, examtype_id, talim_batch_id]
        );
        return rows;
    }


    // Get total marks for a specific exam
    static async getTotalMarks(exam_id) {
        const [rows] = await pool.query(
            "select marks from exam_mark_entry_master WHERE mark_entry_id = ?",
            [exam_id]
        );
        return rows[0] || null;
    }

    // Get students for a specific exam
    static async getStudents(exam_id, talim_batch_id) {
        const [rows] = await pool.query(
            `SELECT
                s.sevak_id,
            s.first_name,
            s.middle_name,
            s.last_name,
            s.ytk_id,
            s.sevak_no,
            e.talim_batch_id,
            m.mark_entry_id,
            e.total_marks,
            m.marks,
            m.remarks,
            m.attandance
            FROM sevak_master s
            LEFT JOIN exam_schedule_master e 
                ON e.talim_batch_id = s.talim_batch_id
            LEFT JOIN exam_mark_entry_master m 
                ON m.exam_id = e.exam_id AND m.sevak_id = s.sevak_id
            WHERE s.is_deleted = 'N' 
              AND e.is_deleted = 'N'
              AND s.sevak_type = 'S' 
              AND(s.certified_status = 'Y' OR s.temporary_status = 'Y') 
              AND(s.expired_status != 'Y' AND s.sant_in_baps_status != 'Y')
              AND s.talim_batch_id = ?
            AND e.exam_id = ?
                GROUP BY s.sevak_no
            ORDER BY s.ytk_id ASC`,
            [talim_batch_id, exam_id]
        );
        return rows;
    }

    // Get exam schedule data for a batch and exam
    static async getExamScheduleData(talim_batch_id, exam_id) {
        const [rows] = await pool.execute(
            `SELECT mark_entry_start_date, mark_entry_end_date, total_marks
         FROM exam_schedule_master
         WHERE talim_batch_id = ? AND exam_id = ? AND is_deleted = 'N'`,
            [talim_batch_id, exam_id]
        );
        return rows; // must return array of objects
    }

    static async updateExamMarkEntry(entryData) {
        const {
            talim_batch_id, examtype_id, exam_id, sevak_id, marks, attandance, remarks, updated_id
        } = entryData;

        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const [result] = await conn.execute(
                `UPDATE exam_mark_entry_master 
         SET marks = ?, attandance = ?, remarks = ?, updated_id = ?, updated_at = NOW()
         WHERE talim_batch_id = ? AND examtype_id = ? AND exam_id = ? AND sevak_id = ?`,
                [marks, attandance, remarks, updated_id, talim_batch_id, examtype_id, exam_id, sevak_id]
            );

            await conn.commit();
            return result.affectedRows;
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    }




}

module.exports = ExamMarkEntry;
