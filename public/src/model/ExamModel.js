// models/ExamModel.js
const pool = require("../config/db");

class Exam {
    // Create
    static async addExam(examtype_id, exam_name, created_id) {
        const [result] = await pool.execute(
            `INSERT INTO exam_master(examtype_id, exam_name, created_id) VALUES (?, ?, ?)`,
            [examtype_id, exam_name, created_id]
        );
        return result.insertId;
    }

    // Read all
    static async getAll() {
        const [rows] = await pool.execute(`
            SELECT exam_master.*, exam_type_master.exam_type,
                   CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
            FROM exam_master 
            LEFT JOIN sevak_master ON sevak_master.sevak_id = exam_master.created_id 
            LEFT JOIN exam_type_master ON exam_type_master.examtype_id = exam_master.examtype_id
            WHERE exam_master.is_deleted = 'N'
        `);
        return rows;
    }

    // Read by ID
    static async getById(id) {
        const [rows] = await pool.execute(
            `SELECT exam_master.*, exam_type_master.exam_type FROM exam_master
            LEFT JOIN exam_type_master ON exam_type_master.examtype_id = exam_master.examtype_id
            WHERE exam_master.exam_id = ? AND exam_master.is_deleted = 'N'`,
            [id]
        );
        return rows[0];
    }

    // Update
    static async updateExam(id, examtype_id, exam_name, updated_id) {
        const [result] = await pool.execute(
            `UPDATE exam_master SET examtype_id = ?, exam_name = ?, updated_id = ?, updated_at = NOW() WHERE exam_id = ?`,
            [examtype_id, exam_name, updated_id, id]
        );
        return result;
    }

    // Soft delete
    static async deleteExam(exam_id, deleted_id) {
        const [result] = await pool.execute(
            `UPDATE exam_master 
             SET is_deleted = 'Y', 
                 deleted_at = NOW(), 
                 deleted_id = ? 
             WHERE exam_id = ? 
             AND is_deleted = 'N'`,
            [deleted_id, exam_id]
        );
        return result;
    }
}

module.exports = Exam;