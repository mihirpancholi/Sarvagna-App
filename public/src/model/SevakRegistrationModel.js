// models/stateModel.js
const pool = require("../config/db");

class SevakRegistration {

  // Read by ID
  static async getTalimBatchById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM talim_batch_master WHERE talim_batch_id = ? AND is_deleted = 'N'`,
      [id]
    );
    return rows[0]; // single row
  }

  // adding sevak master
  static async checkDuplicateSevak(talim_batch_id, sevak_no) {
    const [rows] = await pool.execute(
      "SELECT * FROM sevak_master WHERE talim_batch_id = ? AND sevak_no = ? AND is_deleted = 'N'",
      [talim_batch_id, sevak_no]
    );
    return rows;
  }

  static async insert(table, data) {
    const [result] = await pool.query(`INSERT INTO ${table} SET ?`, [data]);
    return result.insertId;
  }

  static async insertMultiple(table, records) { // Fix: Use bulk insert for performance
    if (records.length > 0) {
      const keys = Object.keys(records[0]);
      const values = records.map(record => keys.map(key => record[key]));
      await pool.query(`INSERT INTO ${table} (${keys.join(', ')}) VALUES ?`, [values]);
    }
  }

  static async getCityById(city_id) {
    const [rows] = await pool.execute(
      `SELECT country_id 
             FROM city_master 
             WHERE city_id = ? 
               AND is_deleted = 'N'`,
      [city_id]
    );
    return rows[0] || null; // return the first matching row or null
  }

  static async getMandirsByType(country_id, type) {
    const [rows] = await pool.execute(
      `SELECT mandir_id, mandir_name 
             FROM mandir_master 
             WHERE country_id = ? 
               AND mandir_type = ? 
               AND is_deleted = 'N'`,
      [country_id, type]
    );
    return rows;
  }



  static async getSpecializationByDegree(degree_id) {
    const [rows] = await pool.execute(
      `SELECT specialization_id, specialization 
       FROM specialization_master 
       WHERE degree_id = ? AND is_deleted = 'N'`,
      [degree_id]
    );
    return rows;
  }

  static async filterSevaks(filters) {
    const {
      talim_batch_id, degree_id, city_id, district_id, grade_id, group_id,
      mandir, zone_id, employment_id, satsang_activity_id, satsang_designation_id,
      kshetra_id, specialization_id, marital_status_id, status
    } = filters;

    let queryParams = [];
    let whereClauses = ["sm.is_deleted = 'N'", "sm.sevak_type = 'S'"]; // Correctly using alias

    if (talim_batch_id) {
      whereClauses.push("sm.talim_batch_id = ?");
      queryParams.push(talim_batch_id);
    }
    if (degree_id) {
      whereClauses.push("sed.degree_id = ?");
      queryParams.push(degree_id);
    }
    if (city_id) {
      whereClauses.push("sm.city_id = ?");
      queryParams.push(city_id);
    }
    if (district_id) {
      whereClauses.push("sm.district_id = ?");
      queryParams.push(district_id);
    }
    if (grade_id) {
      whereClauses.push("se.overall_grade_id = ?");
      queryParams.push(grade_id);
    }
    if (group_id) {
      whereClauses.push("gmm.group_id = ?");
      queryParams.push(group_id);
    }
    if (mandir) {
      whereClauses.push("sm.current_mandir = ?");
      queryParams.push(mandir);
    }
    if (zone_id) {
      whereClauses.push("km.zone_id = ?");
      queryParams.push(zone_id);
    }
    if (employment_id) {
      whereClauses.push("seme.employment_id = ?");
      queryParams.push(employment_id);
    }
    if (satsang_activity_id) {
      whereClauses.push("ss.satsang_activity_id = ?");
      queryParams.push(satsang_activity_id);
    }
    if (satsang_designation_id) {
      whereClauses.push("ss.satsang_designation_id = ?");
      queryParams.push(satsang_designation_id);
    }
    if (kshetra_id) {
      whereClauses.push("sm.current_kshetra_id = ?");
      queryParams.push(kshetra_id);
    }
    if (specialization_id) {
      whereClauses.push("sed.specialization_id = ?");
      queryParams.push(specialization_id);
    }
    if (marital_status_id) {
      whereClauses.push("sm.marital_status_id = ?");
      queryParams.push(marital_status_id);
    }

    if (status && status.length > 0) {
      const statusClauses = status.map(s => {
        if (s === 'Certified') return "sm.certified_status='Y'";
        if (s === 'Expired') return "sm.expired_status='Y'";
        if (s === 'Not Complete') return "sm.not_complete_status='Y'";
        if (s === 'Temporary') return "sm.temporary_status='Y'";
        if (s === 'Sant in BAPS') return "sm.sant_in_baps_status='Y'";
        return '';
      }).filter(Boolean);

      if (statusClauses.length > 0) {
        whereClauses.push(`(${statusClauses.join(' OR ')})`);
      }
    }

    const whereString = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const sql = `SELECT
      sm.sevak_id, sm.ytk_id, concat(sm.first_name, ' ', sm.middle_name, ' ', sm.last_name) AS sevak_name,
      cm.city_name, km.kshetra_name, gm.grade_name, se.overall_grade_id, se.overall_notes,
      km.kshetra_code, sm.current_mandir AS mandir, ca.area_name, tm.taluka_name, dm.district_name,
      s.state_name, c.country_name, sm.current_sant_nirdeshak,
      concat(sm.mobile1_country_code,' ',sm.contact_mobile1) AS primary_contact_mobile1,
      sm.contact_mobile1, sm.contact_mobile2, sm.contact_phone_1, sm.contact_phone_2,
      sm.contact_res_phone1, sm.contact_res_phone2, sm.contact_whatsapp_no,
      sm.certified_status, sm.expired_status, sm.not_complete_status, sm.temporary_status, sm.sant_in_baps_status,
      IF(sm.login_active = 'Y', 'Active', 'In Active') AS statusRegister,
      DATE_FORMAT(sm.birth_date,'%d-%m-%Y') AS birth_date, cas.caste_name,
      IF(sm.marital_status_id = '3', DATE_FORMAT(sm.marital_date,'%d-%m-%Y'), '') AS marriage_date,
      sm.contact_per_mail, sm.contact_bus_mail, zm.zone_name,
      GROUP_CONCAT(DISTINCT em.employment_name SEPARATOR ', ') AS employment_name,
      GROUP_CONCAT(DISTINCT seme.emp_detail SEPARATOR ', ') AS employment_detail,
      GROUP_CONCAT(DISTINCT seme.post_designation SEPARATOR ', ') AS post_designation,
      concat(grm.group_code,' - ',grm.group_name) AS group_name,
      GROUP_CONCAT(DISTINCT sam.satsang_activity_name SEPARATOR ', ') AS satsang_activity_name,
      GROUP_CONCAT(DISTINCT sdm.satsang_designation_name SEPARATOR ', ') AS satsang_designation_name,
      GROUP_CONCAT(DISTINCT deg.degree SEPARATOR ', ') AS sevak_education,
      GROUP_CONCAT(DISTINCT spm.specialization SEPARATOR ', ') AS specialization,
      concat(tbm.talim_year, '-', if((tbm.talim_batch = 'F'), 'First', 'Second')) AS batch
    FROM sevak_master sm
      JOIN talim_batch_master tbm ON tbm.talim_batch_id = sm.talim_batch_id
      LEFT JOIN city_master cm ON cm.city_id = sm.city_id
      LEFT JOIN kshetra_master km ON km.kshetra_id = sm.current_kshetra_id
      LEFT JOIN zone_master zm ON zm.zone_id = km.zone_id
      LEFT JOIN caste_master cas ON cas.caste_id = sm.caste_id
      LEFT JOIN city_area ca ON ca.city_area_id = sm.city_area_id
      LEFT JOIN taluka_master tm ON tm.taluka_id = sm.taluka_id
      LEFT JOIN district_master dm ON dm.district_id = sm.district_id
      LEFT JOIN state_master s ON s.state_id = sm.state_id
      LEFT JOIN country_master c ON c.country_id = sm.country_id
      LEFT JOIN sevak_satsang ss ON ss.sevak_id = sm.sevak_id
      LEFT JOIN satsang_activity_master sam ON sam.satsang_activity_id = ss.satsang_activity_id
      LEFT JOIN satsang_designation_master sdm ON sdm.satsang_designation_id = ss.satsang_designation_id
      LEFT JOIN sevak_education sed ON sed.sevak_id = sm.sevak_id
      LEFT JOIN degree_master deg ON deg.degree_id = sed.degree_id
      LEFT JOIN specialization_master spm ON spm.specialization_id = sed.specialization_id
      LEFT JOIN sevak_evaluation se ON se.sevak_id=sm.sevak_id
      LEFT JOIN group_member_mapping gmm ON gmm.sevak_id=sm.sevak_id
      LEFT JOIN group_master grm ON grm.group_id=gmm.group_id
      LEFT JOIN sevak_employment seme ON seme.sevak_id=sm.sevak_id
      LEFT JOIN employment_master em ON em.employment_id=seme.employment_id
      LEFT JOIN grade_master gm ON gm.grade_id=se.overall_grade_id
    ${whereString}
      GROUP BY sm.sevak_id ORDER BY sm.ytk_id ASC`;

    const [rows] = await pool.execute(sql, queryParams);
    return rows;
  }


}

module.exports = SevakRegistration;