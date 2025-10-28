// models/ExamTypeModel.js
const pool = require("../config/db");

class ExamType {
    // Create
    static async addExamType(exam_type, created_id) {
        const [result] = await pool.execute(
            `INSERT INTO exam_type_master (exam_type, created_id) VALUES (?, ?)`,
            [exam_type, created_id]
        );
        return result.insertId;
    }

    // Read all
    static async getAll() {
        const [rows] = await pool.execute(`
            SELECT exam_type_master.*, 
                   CONCAT(sevak_master.first_name, ' ', sevak_master.last_name) AS full_name 
            FROM exam_type_master 
            LEFT JOIN sevak_master ON sevak_master.sevak_id = exam_type_master.created_id 
            WHERE exam_type_master.is_deleted = 'N'
        `);
        return rows;
    }

    // Read by ID
    static async getById(id) {
        const [rows] = await pool.execute(
            `SELECT * FROM exam_type_master WHERE examtype_id = ? AND is_deleted = 'N'`,
            [id]
        );
        return rows[0];
    }

    // Update
    static async updateExamType(id, exam_type, updated_id) {
        const [result] = await pool.execute(
            `UPDATE exam_type_master SET exam_type = ?, updated_id = ?, updated_at = NOW() WHERE examtype_id = ?`,
            [exam_type, updated_id, id]
        );
        return result;
    }

    // Soft delete
    static async deleteExamType(examtype_id, deleted_id) {
        const [result] = await pool.execute(
            `UPDATE exam_type_master 
             SET is_deleted = 'Y', 
                 deleted_at = NOW(), 
                 deleted_id = ? 
             WHERE examtype_id = ? 
             AND is_deleted = 'N'`,
            [deleted_id, examtype_id]
        );
        return result;
    }
}

module.exports = ExamType;