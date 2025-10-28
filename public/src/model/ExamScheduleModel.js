// models/ExamScheduleModel.js
const pool = require("../config/db");

class ExamSchedule {

    // Create
    static async addExamSchedule(talim_batch_id, examtype_id, exam_id, exam_date, total_marks, mark_entry_start_date, mark_entry_end_date, upload_exam_paper, created_id) {
        const [rows] = await pool.execute(
            `INSERT INTO exam_schedule_master 
    (talim_batch_id, examtype_id, exam_id, exam_date, total_marks, mark_entry_start_date, mark_entry_end_date, upload_exam_paper, created_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                talim_batch_id, examtype_id, exam_id, exam_date,
                total_marks, mark_entry_start_date, mark_entry_end_date,
                upload_exam_paper, created_id
            ]
        );

        return rows.insertId;
    }




    // Read all
    static async getAll() {
        const [rows] = await pool.execute(`
            SELECT exam_schedule_master.*, 
            exam_type_master.exam_type, 
            exam_master.exam_name,
            CONCAT( sevak_master.first_name, ' ', sevak_master.last_name ) AS full_name FROM exam_schedule_master 
            LEFT JOIN sevak_master ON sevak_master.sevak_id = exam_schedule_master.created_id 
            LEFT JOIN talim_batch_master ON talim_batch_master.talim_batch_id = exam_schedule_master.talim_batch_id 
            LEFT JOIN exam_master ON exam_master.exam_id = exam_schedule_master.exam_id 
            LEFT JOIN exam_type_master ON exam_type_master.examtype_id = exam_master.examtype_id 
            WHERE exam_schedule_master.is_deleted = 'N';       
        `);
        return rows;
    }

    // Read by ID
    static async getById(id) {
        const [rows] = await pool.execute(
            `
            SELECT exam_schedule_master.* FROM exam_schedule_master
            LEFT JOIN sevak_master ON sevak_master.sevak_id = exam_schedule_master.created_id
            LEFT JOIN talim_batch_master ON talim_batch_master.talim_batch_id = exam_schedule_master.talim_batch_id
            LEFT JOIN exam_master ON exam_master.exam_id = exam_schedule_master.exam_id
            LEFT JOIN exam_type_master ON exam_type_master.examtype_id = exam_master.examtype_id
            WHERE exam_schedule_master.exam_schedule_id = ? AND exam_schedule_master.is_deleted = 'N'`,
            [id]
        );
        return rows[0];
    }

    static async updateExamSchedule(id, examtype_id, exam_id, exam_date, total_marks, mark_entry_start_date, mark_entry_end_date, upload_exam_paper, updated_id) {
        const [result] = await pool.execute(
            `UPDATE exam_schedule_master 
         SET examtype_id = ?, 
             exam_id = ?, 
             exam_date = ?, 
             total_marks = ?, 
             mark_entry_start_date = ?, 
             mark_entry_end_date = ?, 
             upload_exam_paper = ?,
             updated_id = ?,
             updated_at = NOW()
         WHERE exam_schedule_id = ?`,
            [examtype_id, exam_id, exam_date, total_marks, mark_entry_start_date, mark_entry_end_date, upload_exam_paper, updated_id, id]
        );
        return result.affectedRows;
    }

    // Delete (Soft delete)
    static async deleteExamSchedule(id, deleted_id) {
        const [result] = await pool.execute(
            `UPDATE exam_schedule_master 
         SET is_deleted = 'Y',
          deleted_at = NOW(),
                 deleted_id = ?
         WHERE exam_schedule_id = ?`,
            [deleted_id, id]
        );
        return result.affectedRows;
    }





}

module.exports = ExamSchedule;