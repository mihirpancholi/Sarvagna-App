// models/stateModel.js
const pool = require("../config/db");

class SevakReportsModel {

    static async getSevakRegisteredList() {
        const [rows] = await pool.execute(`
        SELECT
            sm.sevak_id,
            sm.ytk_id,
            IF(sm.login_active = 'Y', 'Active', 'In Active') AS statusRegister,
            CONCAT(sm.first_name, ' ', sm.middle_name, ' ', sm.last_name) AS sevak_name,
            cm.city_name,
            GROUP_CONCAT(DISTINCT ur.role SEPARATOR ', ') AS role,
            CONCAT(
                IF(sm.certified_status = 'Y', 'Certified', ''),
                IF(sm.not_complete_status = 'Y', ',Not Complete', ''),
                IF(sm.temporary_status = 'Y', ',Temporary', ''),
                IF(sm.expired_status = 'Y', 'Expired', ''),
                IF(sm.sant_in_baps_status = 'Y', ',Sant in Baps', '')
            ) AS status
        FROM sevak_master sm
        JOIN sevak_role sr ON sr.sevak_id = sm.sevak_id
        JOIN user_role ur ON ur.role_id = sr.role_id
        LEFT JOIN city_master cm ON cm.city_id = sm.city_id
        WHERE sm.is_deleted = 'N' AND sm.login_active = 'Y'
        GROUP BY sm.sevak_id
        ORDER BY sm.ytk_id ASC
    `);
        return rows;
    }

    static async getSantNirdeshakReportData(santNirdeshakId) {
        let query = `
        SELECT
            snm.sant_nirdeshak_name, 
            sm.ytk_id, 
            CONCAT(sm.first_name, ' ', sm.middle_name, ' ', sm.last_name) AS sevak_name,
            cm.city_name, km.kshetra_name, sm.current_mandir
        FROM sevak_master sm
            INNER JOIN city_master cm ON sm.city_id = cm.city_id
            INNER JOIN kshetra_master km ON sm.current_kshetra_id = km.kshetra_id
            LEFT JOIN sant_nirdeshak_master snm ON km.sant_nirdeshak_id = snm.sant_nirdeshak_id
        WHERE sm.is_deleted = 'N'
    `;
        const params = [];

        if (santNirdeshakId && santNirdeshakId !== 'All') {
            query += ` AND km.sant_nirdeshak_id = ?`;
            params.push(santNirdeshakId);
        }

        query += ` ORDER BY snm.sant_nirdeshak_name ASC, sm.ytk_id ASC`;

        const [rows] = await pool.execute(query, params);
        return rows;
    }





}

module.exports = SevakReportsModel;