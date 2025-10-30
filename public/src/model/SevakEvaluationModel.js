const pool = require("../config/db");

class SevakEvaluationModel {
    static async addSevakEvaluation(data) {
        const fields = [
            'sevak_id', 'talim_batch_id', 'satsang_grade_id', 'satsang_notes',
            'seva_grade_id', 'seva_notes', 'human_relations_grade_id', 'human_relations_notes',
            'skill_grade_id', 'skill_notes', 'abhyas_grade_id', 'abhyas_notes',
            'family_ecostatus_grade_id', 'family_ecostatus_notes', 'family_satsang_grade_id', 'family_satsang_notes',
            'overall_grade_id', 'overall_notes', 'remarks', 'created_id'
        ];

        const placeholders = fields.map(() => '?').join(', ');
        const values = fields.map(field => data[field] || null);

        const [result] = await pool.query(
            `INSERT INTO sevak_evaluation (${fields.join(', ')}) VALUES (${placeholders})`,
            values
        );
        return result.insertId;
    }

    static async getEvaluationBySevakId(sevakId) {
        const [rows] = await pool.query("SELECT * FROM sevak_evaluation WHERE sevak_id = ? AND is_deleted = 'N'", [sevakId]);
        return rows[0];
    }

    static async getEvaluationById(id) {
        const [rows] = await pool.query("SELECT * FROM sevak_evaluation WHERE sevak_evaluation_id = ?", [id]);
        return rows[0];
    }

    static async updateSevakEvaluation(id, data) {
        const fields = Object.keys(data);
        const values = Object.values(data);
        const fieldPlaceholders = fields.map(field => `${field} = ?`).join(', ');

        const [result] = await pool.query(`UPDATE sevak_evaluation SET ${fieldPlaceholders} WHERE sevak_evaluation_id = ?`, [...values, id]);
        return result.affectedRows;
    }

    static async deleteSevakEvaluation(id, deletedId) {
        const [result] = await pool.query(
            "UPDATE sevak_evaluation SET is_deleted = 'Y', deleted_id = ?, deleted_at = NOW() WHERE sevak_evaluation_id = ?",
            [deletedId, id]
        );
        return result.affectedRows;
    }

    static async getFilterData(tableName) {
        const [rows] = await pool.query(`SELECT * FROM ?? WHERE is_deleted='N'`, [tableName]);
        return rows;
    }

    static async getFilteredEvaluations(filters) {
        let query = `
            SELECT 
                se.sevak_evaluation_id,
                CONCAT(tbm.talim_year, '-', tbm.talim_batch) AS talim_batch,
                CONCAT(sm.first_name, ' ', sm.last_name) AS sevak_name,
                cm.city_name,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.satsang_grade_id) AS satsangGrade,
                se.satsang_notes,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.seva_grade_id) AS sevaGrade,
                se.seva_notes,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.human_relations_grade_id) AS humanRelationsGrade,
                se.human_relations_notes,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.skill_grade_id) AS skillGrade,
                se.skill_notes,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.abhyas_grade_id) AS educationGrade,
                se.abhyas_notes,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.family_ecostatus_grade_id) AS familyEcostatusGrade,
                se.family_ecostatus_notes,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.family_satsang_grade_id) AS familySatsangGrade,
                se.family_satsang_notes,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.overall_grade_id) AS overallGrade,
                se.overall_notes
            FROM sevak_evaluation se
            JOIN sevak_master sm ON se.sevak_id = sm.sevak_id
            JOIN talim_batch_master tbm ON se.talim_batch_id = tbm.talim_batch_id
            LEFT JOIN city_master cm ON sm.city_id = cm.city_id
            LEFT JOIN sevak_education sed ON sm.sevak_id = sed.sevak_id
            LEFT JOIN group_member_mapping gmm ON sm.sevak_id = gmm.sevak_id
            LEFT JOIN kshetra_master km ON sm.current_kshetra_id = km.kshetra_id
            LEFT JOIN sevak_satsang ss ON sm.sevak_id = ss.sevak_id
            WHERE se.is_deleted = 'N' AND sm.is_deleted = 'N'
        `;

        const params = [];
        const addCondition = (field, value) => {
            if (value) {
                query += ` AND ${field} = ?`;
                params.push(value);
            }
        };

        addCondition('se.talim_batch_id', filters.talim_batch_id);
        addCondition('sm.city_id', filters.city_id);
        addCondition('se.overall_grade_id', filters.grade_id);
        addCondition('sm.current_kshetra_id', filters.kshetra_id);
        addCondition('sm.district_id', filters.district_id);
        addCondition('sed.degree_id', filters.degree_id);
        addCondition('gmm.group_id', filters.group_id);
        addCondition('sm.current_mandir', filters.mandir);
        addCondition('km.zone_id', filters.zone_id);
        addCondition('ss.satsang_activity_id', filters.satsang_activity_id);
        addCondition('ss.satsang_designation_id', filters.satsang_designation_id);

        const [rows] = await pool.query(query, params);
        return rows;
    }

    static async getRemarkById(id, notesColumn) {
        const [rows] = await pool.query(
            `SELECT ?? FROM sevak_evaluation WHERE sevak_evaluation_id = ?`,
            [notesColumn, id]
        );
        return rows[0] ? rows[0][notesColumn] : null;
    }

    static async getTalimBatchWiseSevak(talimBatchId, evaluationId = 0) {
        let query = `
            SELECT sevak_id, ytk_id, first_name, middle_name, last_name 
            FROM sevak_master 
            WHERE is_deleted = 'N' AND talim_batch_id = ? 
            AND sevak_id NOT IN (SELECT sevak_id FROM sevak_evaluation WHERE is_deleted = 'N' AND talim_batch_id = ? AND sevak_evaluation_id != ?)
            ORDER BY ytk_id ASC`;
        const [rows] = await pool.query(query, [talimBatchId, talimBatchId, evaluationId]);
        return rows;
    }

    static async getEvaluationForPrint(id) {
        const query = `
            SELECT 
                se.*,
                CONCAT(tbm.talim_year, '-', tbm.talim_batch) AS talim_batch_name,
                CONCAT(sm.first_name, ' ', sm.middle_name, ' ', sm.last_name) AS sevak_name,
                sm.ytk_id,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.satsang_grade_id) AS satsang_grade_name,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.seva_grade_id) AS seva_grade_name,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.human_relations_grade_id) AS human_relations_grade_name,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.skill_grade_id) AS skill_grade_name,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.abhyas_grade_id) AS abhyas_grade_name,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.family_ecostatus_grade_id) AS family_ecostatus_grade_name,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.family_satsang_grade_id) AS family_satsang_grade_name,
                (SELECT grade_name FROM grade_master WHERE grade_id = se.overall_grade_id) AS overall_grade_name
            FROM sevak_evaluation se
            JOIN sevak_master sm ON se.sevak_id = sm.sevak_id
            JOIN talim_batch_master tbm ON se.talim_batch_id = tbm.talim_batch_id
            WHERE se.sevak_evaluation_id = ? AND se.is_deleted = 'N'
        `;
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = SevakEvaluationModel;