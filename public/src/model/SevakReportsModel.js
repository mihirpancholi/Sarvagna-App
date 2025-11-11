const pool = require("../config/db");

exports.getSevakRegisteredList = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                sm.ytk_id,
                CONCAT(sm.first_name, ' ', sm.middle_name, ' ', sm.last_name) AS sevak_name,
                cm.city_name,
                rm.role,
                CASE 
                    WHEN sm.certified_status = 'Y' THEN 'Certified' 
                    WHEN sm.temporary_status = 'Y' THEN 'Temporary' 
                    ELSE 'N/A' 
                END AS status,
                CASE 
                    WHEN sm.is_active = 'Y' THEN 'Active' 
                    ELSE 'Inactive' 
                END AS statusRegister
            FROM sevak_master sm
            LEFT JOIN city_master cm ON sm.city_id = cm.city_id
            LEFT JOIN user_role rm ON sm.role_id = rm.role_id
            WHERE sm.is_deleted = 'N'
        `);
        return rows;
    } catch (err) {
        console.error("Error in getSevakRegisteredList model:", err);
        throw err;
    }
};

exports.getSantNirdeshakReportData = async (santNirdeshakName) => {
    try {
        let query = `
            SELECT
  sevak_master.current_sant_nirdeshak,
  sevak_master.ytk_id,
  concat(sevak_master.first_name, ' ', sevak_master.middle_name, ' ', sevak_master.last_name) AS sevak_name,
  city_master.city_name,
  kshetra_master.kshetra_name,
  sevak_master.current_mandir
FROM sevak_master
  INNER JOIN city_master ON city_master.city_id = sevak_master.city_id
  INNER JOIN kshetra_master ON kshetra_master.kshetra_id = sevak_master.current_kshetra_id
WHERE sevak_master.is_deleted = 'N'
        `;

        const queryParams = [];
        let orderByClause = '';

        // Applying the logic from your requested update
        if (santNirdeshakName && santNirdeshakName !== 'All') {
            // Using parameterized query for safety
            query += ` AND sevak_master.current_sant_nirdeshak = ?`;
            queryParams.push(santNirdeshakName);
            orderByClause = ` ORDER BY sevak_master.ytk_id ASC`;
        } else {
            // When 'All' is passed
            orderByClause = ` ORDER BY sevak_master.current_sant_nirdeshak ASC, sevak_master.ytk_id ASC`;
        }

        query += orderByClause;

        // Assuming 'pool' is your MySQL connection pool object available in the scope
        const [rows] = await pool.query(query, queryParams);
        return rows;
    } catch (err) {
        console.error("Error in getSantNirdeshakReportData model:", err);
        throw err;
    }
};

exports.getBirthDateWiseReportData = async (talimBatchId, month) => {
    try {
        let queryParams = [];
        let baseQuery = `
            SELECT
                sm.ytk_id,
                tbm.talim_batch_id,
                CONCAT(tbm.talim_year, '-', IF(tbm.talim_batch = 'F', 'First', 'Second')) AS batch,
                sm.birth_date,
                DATE_FORMAT(sm.birth_date, '%m') AS month,
                IF(? = 'all', 'January To December', DATE_FORMAT(sm.birth_date, '%M')) AS monthWord,
                CONCAT(sm.first_name, ' ', sm.middle_name, ' ', sm.last_name) AS sevakName
            FROM sevak_master sm
            INNER JOIN talim_batch_master tbm ON tbm.talim_batch_id = sm.talim_batch_id
            WHERE sm.is_deleted = 'N' 
              AND (sm.certified_status = 'Y' OR sm.temporary_status = 'Y')  
              AND (sm.expired_status != 'Y' AND sm.sant_in_baps_status != 'Y')
        `;
        queryParams.push(month);

        if (month !== 'all') {
            baseQuery += ` AND DATE_FORMAT(sm.birth_date, '%m') = ?`;
            queryParams.push(month);
        }

        if (talimBatchId !== 'All') {
            baseQuery += ` AND sm.talim_batch_id = ?`;
            queryParams.push(talimBatchId);
        }

        baseQuery += ` ORDER BY DATE_FORMAT(sm.birth_date, '%m') ASC, DATE_FORMAT(sm.birth_date, '%d') ASC`;

        const [rows] = await pool.query(baseQuery, queryParams);
        return rows;
    } catch (err) {
        console.error("Error in getBirthDateWiseReportData model:", err);
        throw err;
    }
};

exports.getTalimBatchList = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                talim_batch_id,
                CONCAT(talim_year, '-', IF(talim_batch = 'F', 'First', 'Second')) AS batch,
                is_active 
            FROM talim_batch_master 
            WHERE is_deleted = 'N'  
            ORDER BY talim_year DESC, talim_batch DESC;
        `);
        return rows;
    } catch (err) {
        console.error("Error in getTalimBatchList model:", err);
        throw err;
    }
};

exports.getSantNirdeshakList = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                sant_nirdeshak_id, 
                sant_nirdeshak_name 
            FROM sant_nirdeshak_master 
            WHERE is_deleted = 'N' AND is_active = 'Y' 
            ORDER BY sant_nirdeshak_name ASC
        `);
        return rows;
    } catch (err) {
        console.error("Error in getSantNirdeshakList model:", err);
        throw err;
    }
};

exports.getTalentReportData = async (talentId, gradeId) => {
    try {
        let query = `
            SELECT
                sm.ytk_id,
                CONCAT(sm.first_name, ' ', sm.middle_name, ' ', sm.last_name) AS sevakName,
                st.talent_detail,
                tm.talent_name,
                gm.grade_name
            FROM sevak_master sm
            INNER JOIN sevak_talent st ON st.sevak_id = sm.sevak_id
            INNER JOIN talent_master tm ON tm.talent_id = st.talent_id
            INNER JOIN grade_master gm ON gm.grade_id = st.grade_id
            WHERE sm.is_deleted = 'N' 
              AND (sm.certified_status = 'Y' OR sm.temporary_status = 'Y') 
              AND (sm.expired_status != 'Y' AND sm.sant_in_baps_status != 'Y')
        `;

        const queryParams = [];

        if (talentId && talentId !== 'All') {
            query += ` AND st.talent_id = ?`;
            queryParams.push(talentId);
        }

        if (gradeId && gradeId !== 'All') {
            query += ` AND st.grade_id = ?`;
            queryParams.push(gradeId);
        }

        query += ` ORDER BY tm.talent_name ASC, gm.grade_name ASC, sm.ytk_id ASC`;

        const [rows] = await pool.query(query, queryParams);
        return rows;
    } catch (err) {
        console.error("Error in getTalentReportData model:", err);
        throw err;
    }
};

exports.getSantParshadReportData = async (talimBatchId) => {
    try {
        let queryParams = [];
        let query = `
            SELECT
  sevak_master.sevak_id,
  sevak_master.talim_batch_id,
  concat(talim_year, '-', if(talim_batch = 'F', 'First', 'Second')) AS talimBatch,
  sevak_master.ytk_id,
  concat(sevak_master.first_name, ' ', sevak_master.middle_name, ' ', sevak_master.last_name) AS sevak_name,
  city_master.city_name,
  sevak_master.name_of_parshad,
  concat(if(sevak_master.certified_status='Y','Certified',''),if(sevak_master.not_complete_status='Y',',Not Complete',''),if(sevak_master.temporary_status='Y',',Temporary',''),if(sevak_master.expired_status='Y','Expired',''),if(sevak_master.sant_in_baps_status='Y',',Sant in Baps','')) AS sevakStatus,
  IF(((sevak_master.parshad_date IS NOT NULL) AND
      (sevak_master.parshad_date = '1970-01-01')), '',
     date_format(sevak_master.parshad_date, '%d-%m-%Y')) AS parshad_date,
  IF(((sevak_master.sant_in_baps_date IS NOT NULL) AND
    (sevak_master.sant_in_baps_date = '1970-01-01')), '',
    date_format(sevak_master.sant_in_baps_date, '%d-%m-%Y')) AS bhagvatiDikshaDate,
  sevak_master.name_of_sant,
  sevak_master.sant_in_baps_status
FROM sevak_master
  INNER JOIN talim_batch_master ON talim_batch_master.talim_batch_id = sevak_master.talim_batch_id
  LEFT JOIN city_master ON city_master.city_id = sevak_master.city_id
WHERE sevak_master.is_deleted = 'N' AND sevak_master.sant_in_baps_status='Y'
 AND sevak_master.certified_status='Y' AND sevak_master.sant_in_baps_status='Y' AND sevak_master.not_complete_status!='Y' AND sevak_master.temporary_status!='Y' AND sevak_master.expired_status!='Y'
        `;

        if (talimBatchId && talimBatchId !== 'All') {
            query += ` AND sevak_master.talim_batch_id = ? ORDER BY sevak_master.ytk_id ASC`;
            queryParams.push(talimBatchId);
        } else {
            query += ` ORDER BY talimBatch ASC, sevak_master.ytk_id ASC`;
        }

        const [rows] = await pool.query(query, queryParams);
        return rows;
    } catch (err) {
        console.error("Error in getSantParshadReportData model:", err);
        throw err;
    }
};