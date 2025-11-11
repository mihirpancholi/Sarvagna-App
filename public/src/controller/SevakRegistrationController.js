const multer = require('multer'); // Add this at the top of your controller

const fs = require('fs');
const path = require("path");
const pool = require("../config/db");
const Model = require("../model/SevakRegistrationModel.js");
const viewsPath = path.join(__dirname, "..", "view");


// Serve HTML pages
exports.AddSevakRegistration = (req, res) => {
  res.sendFile(path.join(viewsPath, "SevakRegistration", "SevakRegistration.html"));
};

exports.SevakIndex = (req, res) => {
  res.sendFile(path.join(viewsPath, "SevakRegistration", "viewSevak.html"));
};

exports.generateYtkID = async (req, res) => {
  try {
    const sevak_no = req.body.sevak_no || 0;
    const talim_batch_id = req.body.talim_batch_id || 0;
    const sevak_id = req.body.sevak_id || 0;

    // Get batch info
    const batchInfo = await Model.getTalimBatchById(talim_batch_id);
    if (!batchInfo) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Build YTK ID
    const talim_year = batchInfo.talim_year;
    const talim_batch = batchInfo.talim_batch;
    const paddedSevakNo = sevak_no.toString().padStart(3, "0");
    const YTKID = `YTK${talim_year}${talim_batch}${paddedSevakNo}`;

    // 🔎 Check duplicate directly in controller
    let sevakIDInfo;
    if (sevak_id && sevak_id != 0) {
      // updating existing sevak, exclude current record
      const [rows] = await pool.execute(
        `SELECT sevak_id 
         FROM sevak_master 
         WHERE sevak_id != ? 
           AND talim_batch_id = ? 
           AND sevak_no = ? 
           AND is_deleted = 'N'`,
        [sevak_id, talim_batch_id, sevak_no]
      );
      sevakIDInfo = rows.length > 0 ? rows : null;
    } else {
      // new sevak
      const [rows] = await pool.execute(
        `SELECT sevak_id 
         FROM sevak_master 
         WHERE talim_batch_id = ? 
           AND sevak_no = ? 
           AND is_deleted = 'N'`,
        [talim_batch_id, sevak_no]
      );
      sevakIDInfo = rows.length > 0 ? rows : null;
    }

    const is_sevak_duplicate = sevakIDInfo ? "Y" : "N";

    return res.json({
      is_sevak_duplicate,
      ytk_id: YTKID,
    });

  } catch (err) {
    console.error("Error generating YTK ID:", err);
    res.status(500).json({ message: "Error generating YTK ID" });
  }
};


exports.getMandir = async (req, res) => {
  try {
    const { city_id, shikhar_mandir_id = 0, hari_mandir_id = 0 } = req.body;

    // 1️⃣ Get country_id from city_id
    const city = await Model.getCityById(city_id);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }
    const country_id = city.country_id;

    // 2️⃣ Fetch Shikharbadh mandirs by country
    const shikharMandirs = await Model.getMandirsByType(country_id, 'Shikharbadh');

    let shikharHTML = `<option value="">Select Shikharbaddh Mandir</option>`;
    shikharHTML += shikharMandirs.map(m =>
      `<option value="${m.mandir_id}" ${m.mandir_id == shikhar_mandir_id ? 'selected' : ''}>${m.mandir_name}</option>`
    ).join('');

    // 3️⃣ Fetch Hari Mandir by country
    const hariMandirs = await Model.getMandirsByType(country_id, 'Hari Mandir');

    let hariHTML = `<option value="">Select Hari Mandir</option>`;
    hariHTML += hariMandirs.map(m =>
      `<option value="${m.mandir_id}" ${m.mandir_id == hari_mandir_id ? 'selected' : ''}>${m.mandir_name}</option>`
    ).join('');

    // 4️⃣ Respond just like original PHP
    res.json({
      country_id,
      shikhar_mandir: shikharHTML,
      hari_mandir: hariHTML
    });

  } catch (err) {
    console.error('Error in getMandir:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.getSpecializationByDegree = async (req, res) => {
  try {
    const { degree_id } = req.query;
    if (!degree_id) {
      return res.status(400).json({ error: 'Degree ID is required' });
    }
    const specializations = await Model.getSpecializationByDegree(degree_id);
    res.json(specializations || []); // Ensure an array is always returned
  } catch (err) {
    console.error('Error fetching specializations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.FilterData = async (req, res) => {
  try {
    const filters = req.body;

    const sevakID = 1;

    // Save filter data to session
    if (req.session) {
      req.session.searchSessionData = filters;
    }

    const sevakResult = await Model.filterSevaks(filters);

    // This part is a placeholder for your user rights logic
    const userrolecheck = {
      checkRights: (form, right) => 'Y' // Mock: returns 'Y' for demo
    };

    let table = `<div class="table-responsive mt-5">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered" id="sevakSearch-datatable">`;
    table += `<thead><tr>
                <th>YTK ID</th>
                <th>Sevak Name</th>
                <th>City</th>
                <th>City Area</th>
                <th>Taluka</th>
                <th>District</th>
                <th>State</th>
                <th>Country</th>
                <th>Kshetra</th>
                <th>Kshetra Code</th>
                <th>Mandir</th>
                <th>Zone</th>
                <th>Mobile 1</th>
                <th>Mobile 2</th>
                <th>Office Phone 1</th>
                <th>Office Phone 2</th>
                <th>Residence Phone 1</th>
                <th>Residence Phone 2</th>
                <th>Whatsapp No</th>
                <th>Birth Date</th>
                <th>Employment</th>
                <th>Employment Detail</th>
                <th>Post Designation</th>
                <th>Education</th>
                <th>Specialisation</th>
                <th>Caste</th>
                <th>Marriage Date</th>
                <th>Grade</th>
                <th>Email</th>
                <th>Company Email</th>
                <th>Sant Nirdeshak</th>
                <th>Satsang Activity</th>
                <th>Satsang Designation</th>
                <th>Address</th>
                <th>Active Status</th>`;
    table += '<th>Edit</th>';
    table += '<th>Delete</th>';
    table += '</tr></thead><tbody>';

    sevakResult.forEach(row => {
      const sevak_id = row.sevak_id;
      let notes = row.overall_notes ? `<a href="#" data-toggle="modal" onclick="getSevakId(${sevak_id})" data-target="#overAllRemarkModel">&nbsp;&nbsp;<i class="fa fa-info-circle"></i></a>` : '';

      table += `<tr>
        <td class="text-center">${row.ytk_id || ''}</td>
        <td class="text-left">${row.sevak_name || ''}</td>
        <td class="text-left">${row.city_name || ''}</td>
        <td class="text-left">${row.area_name || ''}</td>
        <td class="text-left">${row.taluka_name || ''}</td>
        <td class="text-left">${row.district_name || ''}</td>
        <td class="text-left">${row.state_name || ''}</td>
        <td class="text-left">${row.country_name || ''}</td>
        <td class="text-left">${row.kshetra_name || ''}</td>
        <td class="text-left">${row.kshetra_code || ''}</td>
        <td class="text-left">${row.mandir || ''}</td>
        <td class="text-left">${row.zone_name || ''}</td>
        <td class="text-left">${(row.primary_contact_mobile1 || '').replace(/ /g, '')}</td>
        <td class="text-left">${(row.contact_mobile2 || '').replace(/ /g, '')}</td>
        <td class="text-left">${row.contact_phone_1 || ''}</td>
        <td class="text-left">${row.contact_phone_2 || ''}</td>
        <td class="text-left">${row.contact_res_phone1 || ''}</td>
        <td class="text-left">${row.contact_res_phone2 || ''}</td>
        <td class="text-left">${(row.contact_whatsapp_no || '').replace(/ /g, '')}</td>
        <td class="text-left">${row.birth_date || ''}</td>
        <td class="text-left">${row.employment_name || ''}</td>
        <td class="text-left">${row.employment_detail || ''}</td>
        <td class="text-left">${row.post_designation || ''}</td>
        <td class="text-left">${row.sevak_education || ''}</td>
        <td class="text-left">${row.specialization || ''}</td>
        <td class="text-left">${row.caste_name || ''}</td>
        <td class="text-left">${row.marriage_date || ''}</td>
        <td class="text-left">${row.grade_name || ''}${notes}</td>
        <td class="text-left">${row.contact_per_mail || ''}</td>
        <td class="text-left">${row.contact_bus_mail || ''}</td>
        <td class="text-left">${row.current_sant_nirdeshak || ''}</td>
        <td class="text-left">${row.satsang_activity_name || ''}</td>
        <td class="text-left">${row.satsang_designation_name || ''}</td>
        <td class="text-left">${row.address || ''}</td>
        <td class="text-left">${row.statusRegister || ''}</td>`;

      table += `<td class="text-left"><a href="/SevakRegistration/edit/${sevak_id}" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i></a></td>`;
      table += `<td class="text-left"><a href="#" onclick="getSevakPassword(${sevak_id})" class="btn btn-sm btn-danger btn-xs" data-toggle="modal" data-target="#sevakPasswordModel"><i class="fa fa-trash-o"></i></a></td>`;
      table += '</tr>';
    });

    table += '</tbody></table></div></div>';
    res.send(table); // Send the HTML back to the client

  } catch (err) {
    console.error('Error in sevakFilterData:', err);
    res.status(500).send('An error occurred while filtering data.');
  }
};

// New endpoints for the viewSevak page
exports.allSevakData = async (req, res) => {
  try {
    const [sevaks] = await pool.execute("SELECT sm.sevak_id,sm.ytk_id,CONCAT(sm.first_name, ' ', sm.middle_name, ' ', sm.last_name) AS sevak_name,cm.city_name,km.kshetra_name,km.kshetra_code,sm.current_mandir AS mandir,ca.area_name,tm.taluka_name,dm.district_name,stm.state_name,com.country_name,sm.current_sant_nirdeshak AS sant_nirdeshak,REPLACE(sm.contact_mobile1, ' ', '') AS contact_mobile1,IF(sm.login_active = 'Y', 'Active', 'In Active') AS statusRegister,REPLACE(sm.contact_mobile2, ' ', '') AS contact_mobile2,sm.contact_phone_1,sm.contact_phone_2,sm.contact_res_phone1,sm.contact_res_phone2,REPLACE(sm.contact_whatsapp_no, ' ', '') AS contact_whatsapp_no,DATE_FORMAT(sm.birth_date, '%d-%m-%Y') AS birth_date,casm.caste_name,IF(sm.marital_status_id = '3', CONVERT(DATE_FORMAT(sm.marital_date, '%d-%m-%Y') USING utf8mb4), '') AS marriage_date,sm.contact_per_mail,sm.contact_bus_mail,zm.zone_name,gmm.group_id,GROUP_CONCAT(DISTINCT em.employment_name SEPARATOR ', ') AS employment_name,GROUP_CONCAT(DISTINCT se.emp_detail SEPARATOR ', ') AS employment_detail,GROUP_CONCAT(DISTINCT se.post_designation SEPARATOR ', ') AS post_designation,CONCAT(gm.group_code, ' - ', gm.group_name) AS group_name,GROUP_CONCAT(DISTINCT sam.satsang_activity_name SEPARATOR ', ') AS satsang_activity_name,GROUP_CONCAT(DISTINCT sdm.satsang_designation_name SEPARATOR ', ') AS satsang_designation_name,GROUP_CONCAT(DISTINCT deg.degree SEPARATOR ', ') AS sevak_education,CONCAT(sm.contact_mobile1, ',', sm.contact_mobile2, ',', sm.contact_phone_1, ',', sm.contact_phone_2, ',', sm.contact_res_phone1, ',', sm.contact_res_phone2, ',', sm.contact_whatsapp_no) AS all_contact_no,GROUP_CONCAT(DISTINCT spm.specialization SEPARATOR ', ') AS specialization,grm.grade_name,CONCAT(sm.address1,IF(sm.city_area_id IS NULL OR sm.city_area_id = 0, '', CONCAT(',', ca.area_name)),IF(sm.city_id IS NULL OR sm.city_id = 0, '', CONCAT(',', cm.city_name)),IF(sm.pincode IS NULL OR sm.pincode = 0, '', CONCAT('-', sm.pincode)),IF(sm.taluka_id IS NULL OR sm.taluka_id = 0, '', CONCAT(',', tm.taluka_name)),IF(sm.district_id IS NULL OR sm.district_id = 0, '', CONCAT(',', dm.district_name)),IF(sm.state_id IS NULL OR sm.state_id = 0, '', CONCAT(',', stm.state_name)),IF(sm.country_id IS NULL OR sm.country_id = 0, '', CONCAT('-', com.country_name))) AS address, CONCAT(tbm.talim_year, '-', IF(tbm.talim_batch = 'F', 'First', 'Second') ) AS batch FROM sevak_master AS sm LEFT JOIN talim_batch_master AS tbm ON tbm.talim_batch_id = sm.talim_batch_id LEFT JOIN city_master AS cm ON cm.city_id = sm.city_id LEFT JOIN kshetra_master AS km ON km.kshetra_id = sm.current_kshetra_id LEFT JOIN zone_master AS zm ON zm.zone_id = km.zone_id LEFT JOIN caste_master AS casm ON casm.caste_id = sm.caste_id LEFT JOIN city_area AS ca ON ca.city_area_id = sm.city_area_id LEFT JOIN taluka_master AS tm ON tm.taluka_id = sm.taluka_id LEFT JOIN district_master AS dm ON dm.district_id = sm.district_id LEFT JOIN state_master AS stm ON stm.state_id = sm.state_id LEFT JOIN country_master AS com ON com.country_id = sm.country_id LEFT JOIN sevak_satsang AS ss ON ss.sevak_id = sm.sevak_id LEFT JOIN satsang_activity_master AS sam ON sam.satsang_activity_id = ss.satsang_activity_id LEFT JOIN satsang_designation_master AS sdm ON sdm.satsang_designation_id = ss.satsang_designation_id LEFT JOIN sevak_education AS sed ON sed.sevak_id = sm.sevak_id LEFT JOIN degree_master AS deg ON deg.degree_id = sed.degree_id LEFT JOIN specialization_master AS spm ON spm.specialization_id = sed.specialization_id LEFT JOIN sevak_evaluation AS sev ON sev.sevak_id = sm.sevak_id LEFT JOIN grade_master AS grm ON grm.grade_id = sev.overall_grade_id LEFT JOIN group_member_mapping AS gmm ON gmm.sevak_id = sm.sevak_id LEFT JOIN group_master AS gm ON gm.group_id = gmm.group_id LEFT JOIN sevak_employment AS se ON se.sevak_id = sm.sevak_id LEFT JOIN employment_master AS em ON em.employment_id = se.employment_id WHERE sm.is_deleted = 'N' AND sm.sevak_type = 'S' GROUP BY sm.sevak_id ORDER BY sm.talim_batch_id DESC");
    res.json({
      draw: parseInt(req.query.draw) || 1,
      recordsTotal: sevaks.length,
      recordsFiltered: sevaks.length,
      data: sevaks
    });
  } catch (err) {
    console.error('Error fetching all sevak data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.CurrentSevakDetail = async (req, res) => {
  try {
    const { sevak_id } = req.body;
    if (!sevak_id) {
      return res.status(400).send("Sevak ID is required.");
    }
    const [rows] = await pool.execute(
      `SELECT 
                sm.sevak_photo, sm.ytk_id, 
                CONCAT(sm.first_name, ' ', sm.middle_name, ' ', sm.last_name) AS sevak_name,
                CONCAT(tbm.talim_year, '-', IF(tbm.talim_batch = 'F', 'First', 'Second')) AS talim_batch_name,
                GROUP_CONCAT(DISTINCT deg.degree SEPARATOR ', ') AS education,
                sm.contact_mobile1 AS mobile,
                cm.city_name AS city,
                grm.group_name
            FROM sevak_master sm
            LEFT JOIN talim_batch_master tbm ON tbm.talim_batch_id = sm.talim_batch_id
            LEFT JOIN sevak_education sed ON sed.sevak_id = sm.sevak_id
            LEFT JOIN degree_master deg ON deg.degree_id = sed.degree_id
            LEFT JOIN city_master cm ON cm.city_id = sm.city_id
            LEFT JOIN group_member_mapping gmm ON gmm.sevak_id = sm.sevak_id
            LEFT JOIN group_master grm ON grm.group_id = gmm.group_id
            WHERE sm.sevak_id = ?
            GROUP BY sm.sevak_id`,
      [sevak_id]
    );

    if (rows.length === 0) {
      return res.status(404).send("Sevak not found.");
    }

    const sevak = rows[0];

    // --- Build HTML response ---
    let html = `<div class="table-responsive">
      <table class="table table-bordered">
        <tbody>`;

    if (sevak.sevak_photo) {
      html += `<tr>
                  <td colspan="2" class="text-center">
                    <img src="/${sevak.sevak_photo}" alt="Sevak Photo" style="max-width: 150px; border-radius: 5px;">
                  </td>
               </tr>`;
    }

    html += `<tr><th>YTK ID</th><td>${sevak.ytk_id || ''}</td></tr>
             <tr><th>Sevak Name</th><td>${sevak.sevak_name || ''}</td></tr>
             <tr><th>Talim Batch</th><td>${sevak.talim_batch_name || ''}</td></tr>
             <tr><th>Education</th><td>${sevak.education || ''}</td></tr>
             <tr><th>Mobile</th><td>${sevak.mobile || ''}</td></tr>
             <tr><th>City</th><td>${sevak.city || ''}</td></tr>
             <tr><th>Goshthi Group</th><td>${sevak.group_name || ''}</td></tr>
           </tbody></table></div>`;

    res.status(200).send(html);
  } catch (err) {
    console.error('Error in CurrentSevakDetail:', err);
    res.status(500).send('An error occurred while fetching sevak details.');
  }
};


// ---------- Multer Setup ----------
const uploadDir = "public/src/upload/sevak_photos/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ---------- Helper ----------
const formatDate = (dateStr) =>
  dateStr ? new Date(dateStr).toISOString().split("T")[0] : null;

// ---------- Controller ----------
exports.addSevak = [
  upload.fields([
    { name: 'sevak_photo', maxCount: 1 },
    { name: 'latest_photo', maxCount: 1 }
  ]),
  async (req, res) => {
    const conn = await (await require("../config/db")).getConnection();
    try {
      await conn.beginTransaction();
      let data = { ...req.body };

      // 1. Unset unnecessary fields (like in PHP)
      const fieldsToDelete = [
        "sevak_id", "taluka_name", "district_name", "state_name", "country_name",
        "per_taluka_name", "per_district_name", "per_state_name", "per_country_name",
        "talim_taluka_name", "talim_district_name", "talim_state_name", "talim_country_name"
      ];
      fieldsToDelete.forEach(f => delete data[f]);

      // Sanitize integer/foreign key fields: convert empty strings to null
      const intFields = [
        // Personal Info
        'talim_batch_id', 'caste_id', 'category_id', 'blood_group_id', 'marital_status_id',
        // Address Fields (Current, Permanent, Talim)
        'country_id', 'state_id', 'district_id', 'taluka_id', 'city_id', 'city_area_id', 'pincode',
        'per_country_id', 'per_state_id', 'per_district_id', 'per_taluka_id', 'per_city_id', 'per_city_area_id', 'per_pincode',
        'talim_country_id', 'talim_state_id', 'talim_district_id', 'talim_taluka_id', 'talim_city_id', 'talim_city_area_id', 'talim_pincode',
        // Kshetra & Mandir
        'kshetra_id', 'talim_kshetra_id', 'current_kshetra_id',
        'shikhar_mandir_id', 'hari_mandir_id',
        // Referees
        'satsangi_batch_id', 'satsangi_sevak_id', 'sat_ref_city_id',
        'inpired_batch_id', 'inspired_sevak_id', 'ins_by_city_id',
        // Other
        'gosthi_group_id'
      ];

      for (const field of intFields) {
        if (data[field] === '') {
          data[field] = null;
        }
      }

      // Capitalize names
      ["first_name", "middle_name", "last_name"].forEach(f => {
        if (data[f])
          data[f] = data[f].charAt(0).toUpperCase() + data[f].slice(1).toLowerCase();
      });

      // 2. Format all optional date fields
      const dateFields = [
        'birth_date', 'marital_date', 'parshad_date', 'certified_date',
        'not_complete_date', 'temporary_date', 'expired_date', 'sant_in_baps_date'
      ];
      dateFields.forEach(field => {
        data[field] = formatDate(data[field]);
      });

      // 3. Handle status checkboxes
      const statusFields = ["certified", "not_complete", "temporary", "expired", "sant_in_baps"];
      let statusArray = [];
      statusFields.forEach(field => {
        if (data[field] === 'on') {
          statusArray.push(field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' '));
          data[`${field}_status`] = 'Y'; // The date is already formatted above
        } else {
          data[`${field}_status`] = 'N';
        }
        delete data[field]; // remove original checkbox field
      });
      delete data.status; // <-- CRITICAL: Remove original status array from form data
      data.status = statusArray.join(',');

      // Checkboxes
      data.sameprimaryno = data.sameprimaryno === "on" ? "Y" : "N";
      data.ytk_sevak_satsangi = data.ytk_sevak_satsangi === "on" ? "Y" : "N";
      data.ytk_sevak_inspired = data.ytk_sevak_inspired === "on" ? "Y" : "N";

      // Permanent Address
      if (data.is_perm_add === "on") {
        data.is_perm_add = "Y";
        ["address1", "country_id", "state_id", "district_id", "taluka_id", "city_id", "city_area_id", "pincode"].forEach(field => {
          data["per_" + field] = data[field];
        });
      } else data.is_perm_add = "N";

      // Talim Address
      if (data.is_talim_add === "on") {
        data.is_talim_add = "Y";
        ["address1", "country_id", "state_id", "district_id", "taluka_id", "city_id", "city_area_id", "pincode"].forEach(field => {
          data["talim_" + field] = data[field];
        });
      } else data.is_talim_add = "N";

      // Uploaded Files
      // With upload.fields(), files are in req.files object, e.g., req.files['sevak_photo'][0]
      if (req.files) {
        if (req.files['sevak_photo']) {
          data.sevak_photo = req.files['sevak_photo'][0].path.replace('public/src/', '');
        }
        if (req.files['latest_photo']) {
          data.latest_photo = req.files['latest_photo'][0].path.replace('public/src/', '');
        }
      }

      // Metadata
      data.created_id = req.user?.user_id || 1; // fallback if no auth
      data.created_at = new Date();
      data.role_id = 2;

      // 4. Separate array data and remove from main data object before insert
      const subTableFields = [
        'degree_id', 'specialization_id', 'edu_remark',
        'employment_id', 'emp_detail', 'post_designation', 'emp_remark',
        'relationship_id', 'family_name', 'family_country_code', 'family_mobile', 'family_email', 'family_occupation',
        'satsang_activity_id', 'satsang_designation_id', 'seva_details',
        'talent_id', 'grade_id', 'talent_detail',
        'role_id' // <-- Add role_id here
      ];
      const subTableData = {};
      subTableFields.forEach(field => {
        if (data[field]) {
          // Ensure it's an array, as single entries might not be
          subTableData[field] = Array.isArray(data[field]) ? data[field] : [data[field]];
          delete data[field];
        }
      });
      // Also remove the gosthi_group_id as it's for a separate mapping table
      const gosthiGroupId = data.gosthi_group_id;
      delete data.gosthi_group_id;


      // 4. Main Insert
      const sevakID = await Model.insert("sevak_master", data);

      // 5. Sub-table Inserts
      // Group Mapping (if gosthi_group_id is provided)
      if (gosthiGroupId) {
        await Model.insert("group_member_mapping", {
          group_id: gosthiGroupId,
          is_sanchalak: "N",
          is_sah_sanchalak: "N",
          sevak_id: sevakID
        });
      }

      // Roles (array)
      if (subTableData.role_id) {
        const roles = (Array.isArray(subTableData.role_id) ? subTableData.role_id : [subTableData.role_id]).map(roleId => ({ role_id: roleId, sevak_id: sevakID }));
        await Model.insertMultiple("sevak_role", roles);
      }

      // Talents (array)
      if (subTableData.talent_id && subTableData.talent_id.length > 0 && subTableData.talent_id[0]) {
        const talents = subTableData.talent_id.map((t, i) => ({
          sevak_id: sevakID,
          talent_id: t,
          grade_id: subTableData.grade_id[i],
          talent_detail: subTableData.talent_detail[i]
        }));
        await Model.insertMultiple("sevak_talent", talents);
      }

      // Family (array)
      if (subTableData.relationship_id && subTableData.relationship_id.length > 0 && subTableData.relationship_id[0]) {
        const family = subTableData.relationship_id.map((r, i) => ({
          sevak_id: sevakID,
          relationship_id: r,
          family_name: subTableData.family_name[i],
          family_country_code: subTableData.family_country_code[i],
          family_mobile: subTableData.family_mobile[i],
          family_occupation: subTableData.family_occupation[i],
          family_email: subTableData.family_email[i]
        }));
        await Model.insertMultiple("sevak_family", family);
      }

      // Education (array)
      if (subTableData.degree_id && subTableData.degree_id.length > 0 && subTableData.degree_id[0]) {
        const edu = subTableData.degree_id.map((d, i) => ({
          sevak_id: sevakID,
          degree_id: d,
          specialization_id: subTableData.specialization_id[i],
          edu_remark: subTableData.edu_remark[i]
        }));
        await Model.insertMultiple("sevak_education", edu);
      }

      // Employment (array)
      if (subTableData.employment_id && subTableData.employment_id.length > 0 && subTableData.employment_id[0]) {
        const emp = subTableData.employment_id.map((e, i) => ({
          sevak_id: sevakID,
          employment_id: e,
          emp_detail: subTableData.emp_detail[i],
          post_designation: subTableData.post_designation[i],
          emp_remark: subTableData.emp_remark[i]
        }));
        await Model.insertMultiple("sevak_employment", emp);
      }

      // Satsang (array)
      if (subTableData.satsang_activity_id && subTableData.satsang_activity_id.length > 0 && subTableData.satsang_activity_id[0]) {
        const satsang = subTableData.satsang_activity_id.map((s, i) => ({
          sevak_id: sevakID,
          satsang_activity_id: s,
          satsang_designation_id: subTableData.satsang_designation_id[i],
          seva_details: subTableData.seva_details[i]
        }));
        await Model.insertMultiple("sevak_satsang", satsang);
      }

      await conn.commit();
      res.json({ success: true, message: "Sevak created successfully" });
    } catch (err) {
      await conn.rollback();
      console.error(err);
      res.status(500).json({ success: false, message: "Error adding Sevak", error: err.message });
    } finally {
      conn.release();
    }
  }
];


// Serve Edit Page
exports.getEditSevakPage = (req, res) => {
  res.sendFile(path.join(viewsPath, "SevakRegistration", "editSevakRegistration.html"));
};

exports.getSevakForEdit = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "Sevak ID is required." });
    }

    // Fetch all data in parallel for maximum efficiency
    const [
      sevakInfo,
      families,
      sevakTalents,
      educations,
      employments,
      satsangs,
      currentSevakRole,
      currentGosthiGroupId
    ] = await Promise.all([
      Model.getSevakById(id),
      Model.getSevakFamily(id),
      Model.getSevakTalents(id),
      Model.getSevakEducation(id),
      Model.getSevakEmployment(id),
      Model.getSevakSatsang(id),
      Model.getSevakRoles(id),
      Model.getSevakGosthiGroup(id)
    ]);

    if (!sevakInfo) {
      return res.status(404).json({ success: false, message: "Sevak not found." });
    }

    res.json({ success: true, data: { sevakInfo, families, sevakTalents, educations, employments, satsangs, currentSevakRole, current_gosthi_group_id: currentGosthiGroupId } });
  } catch (err) {
    console.error("Error fetching sevak data for edit:", err);
    res.status(500).json({ success: false, message: "An error occurred while fetching data." });
  }
};


exports.updateSevak = [
  // Use the same multer middleware as addSevak
  upload.fields([
    { name: 'sevak_photo', maxCount: 1 },
    { name: 'latest_photo', maxCount: 1 }
  ]),
  async (req, res) => {
    const conn = await (await require("../config/db")).getConnection();
    try {
      await conn.beginTransaction();

      // Get sevak_id from the form body (your script adds it)
      const { sevak_id } = req.body;
      if (!sevak_id) {
        throw new Error("Sevak ID is missing from the update request.");
      }

      let data = { ...req.body };

      // 1. Unset unnecessary fields (same as addsevak)
      const fieldsToDelete = [
        "sevak_id", "taluka_name", "district_name", "state_name", "country_name",
        "per_taluka_name", "per_district_name", "per_state_name", "per_country_name",
        "talim_taluka_name", "talim_district_name", "talim_state_name", "talim_country_name"
      ];
      fieldsToDelete.forEach(f => delete data[f]);

      // Sanitize integer/foreign key fields
      const intFields = [
        'talim_batch_id', 'caste_id', 'category_id', 'blood_group_id', 'marital_status_id',
        'country_id', 'state_id', 'district_id', 'taluka_id', 'city_id', 'city_area_id', 'pincode',
        'per_country_id', 'per_state_id', 'per_district_id', 'per_taluka_id', 'per_city_id', 'per_city_area_id', 'per_pincode',
        'talim_country_id', 'talim_state_id', 'talim_district_id', 'talim_taluka_id', 'talim_city_id', 'talim_city_area_id', 'talim_pincode',
        'kshetra_id', 'talim_kshetra_id', 'current_kshetra_id',
        'shikhar_mandir_id', 'hari_mandir_id',
        'satsangi_batch_id', 'satsangi_sevak_id', 'sat_ref_city_id',
        'inpired_batch_id', 'inspired_sevak_id', 'ins_by_city_id',
        'gosthi_group_id'
      ];

      for (const field of intFields) {
        if (data[field] === '') {
          data[field] = null;
        }
      }

      // Capitalize names
      ["first_name", "middle_name", "last_name"].forEach(f => {
        if (data[f])
          data[f] = data[f].charAt(0).toUpperCase() + data[f].slice(1).toLowerCase();
      });

      // 2. Format all optional date fields
      const dateFields = [
        'birth_date', 'marital_date', 'parshad_date', 'certified_date',
        'not_complete_date', 'temporary_date', 'expired_date', 'sant_in_baps_date'
      ];
      dateFields.forEach(field => {
        data[field] = formatDate(data[field]); // Uses your existing helper
      });

      // 3. Handle status checkboxes
      const statusFields = ["certified", "not_complete", "temporary", "expired", "sant_in_baps"];
      let statusArray = [];
      statusFields.forEach(field => {
        if (data[field] === 'on') {
          statusArray.push(field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' '));
          data[`${field}_status`] = 'Y';
        } else {
          data[`${field}_status`] = 'N';
        }
        delete data[field];
      });
      delete data.status;
      data.status = statusArray.join(',');

      // Checkboxes
      data.sameprimaryno = data.sameprimaryno === "on" ? "Y" : "N";
      data.ytk_sevak_satsangi = data.ytk_sevak_satsangi === "on" ? "Y" : "N";
      data.ytk_sevak_inspired = data.ytk_sevak_inspired === "on" ? "Y" : "N";

      // Permanent Address
      if (data.is_perm_add === "on") {
        data.is_perm_add = "Y";
        ["address1", "country_id", "state_id", "district_id", "taluka_id", "city_id", "city_area_id", "pincode"].forEach(field => {
          data["per_" + field] = data[field];
        });
      } else data.is_perm_add = "N";

      // Talim Address
      if (data.is_talim_add === "on") {
        data.is_talim_add = "Y";
        ["address1", "country_id", "state_id", "district_id", "taluka_id", "city_id", "city_area_id", "pincode"].forEach(field => {
          data["talim_" + field] = data[field];
        });
      } else data.is_talim_add = "N";

      // Handle Uploaded Files (Only update if a new file is provided)
      if (req.files) {
        if (req.files['sevak_photo']) {
          data.sevak_photo = req.files['sevak_photo'][0].path.replace('public/src/', '');
        }
        if (req.files['latest_photo']) {
          data.latest_photo = req.files['latest_photo'][0].path.replace('public/src/', '');
        }
      }

      // Metadata for UPDATE
      data.updated_id = req.user?.user_id || 1; // fallback if no auth
      data.updated_at = new Date();
      delete data.created_id;  // Do not change creation date
      delete data.created_at; // Do not change creation date
      delete data.role_id; // role_id is managed in sevak_role table

      // 4. Separate array data and remove from main data object
      const subTableFields = [
        'degree_id', 'specialization_id', 'edu_remark',
        'employment_id', 'emp_detail', 'post_designation', 'emp_remark',
        'relationship_id', 'family_name', 'family_country_code', 'family_mobile', 'family_email', 'family_occupation',
        'satsang_activity_id', 'satsang_designation_id', 'seva_details',
        'talent_id', 'grade_id', 'talent_detail',
        'role_id'
      ];
      const subTableData = {};
      subTableFields.forEach(field => {
        if (data[field]) {
          subTableData[field] = Array.isArray(data[field]) ? data[field] : [data[field]];
          delete data[field];
        }
      });
      const gosthiGroupId = data.gosthi_group_id;
      delete data.gosthi_group_id;


      // 4. Main Table UPDATE
      await Model.update("sevak_master", data, { sevak_id }, conn);

      // 5. === DELETE ALL CHILD RECORDS ===
      // This is the "delete-and-re-insert" pattern that matches your addSevak logic
      await Model.delete("group_member_mapping", { sevak_id }, conn);
      await Model.delete("sevak_role", { sevak_id }, conn);
      await Model.delete("sevak_talent", { sevak_id }, conn);
      await Model.delete("sevak_family", { sevak_id }, conn);
      await Model.delete("sevak_education", { sevak_id }, conn);
      await Model.delete("sevak_employment", { sevak_id }, conn);
      await Model.delete("sevak_satsang", { sevak_id }, conn);

      // 6. === RE-INSERT ALL CHILD RECORDS ===

      // Group Mapping (if gosthi_group_id is provided)
      if (gosthiGroupId) {
        await Model.insert("group_member_mapping", {
          group_id: gosthiGroupId,
          is_sanchalak: "N",
          is_sah_sanchalak: "N",
          sevak_id: sevak_id // Use existing sevak_id
        }, conn);
      }

      // Roles (array)
      if (subTableData.role_id) {
        const roles = (Array.isArray(subTableData.role_id) ? subTableData.role_id : [subTableData.role_id]).map(roleId => ({ role_id: roleId, sevak_id: sevak_id }));
        if (roles.length > 0) await Model.insertMultiple("sevak_role", roles, conn);
      }

      // Talents (array)
      if (subTableData.talent_id && subTableData.talent_id.length > 0 && subTableData.talent_id[0]) {
        const talents = subTableData.talent_id.map((t, i) => ({
          sevak_id: sevak_id,
          talent_id: t,
          grade_id: subTableData.grade_id[i],
          talent_detail: subTableData.talent_detail[i]
        }));
        await Model.insertMultiple("sevak_talent", talents, conn);
      }

      // Family (array)
      if (subTableData.relationship_id && subTableData.relationship_id.length > 0 && subTableData.relationship_id[0]) {
        const family = subTableData.relationship_id.map((r, i) => ({
          sevak_id: sevak_id,
          relationship_id: r,
          family_name: subTableData.family_name[i],
          family_country_code: subTableData.family_country_code[i],
          family_mobile: subTableData.family_mobile[i],
          family_occupation: subTableData.family_occupation[i],
          family_email: subTableData.family_email[i]
        }));
        await Model.insertMultiple("sevak_family", family, conn);
      }

      // Education (array)
      if (subTableData.degree_id && subTableData.degree_id.length > 0 && subTableData.degree_id[0]) {
        const edu = subTableData.degree_id.map((d, i) => ({
          sevak_id: sevak_id,
          degree_id: d,
          specialization_id: subTableData.specialization_id[i],
          edu_remark: subTableData.edu_remark[i]
        }));
        await Model.insertMultiple("sevak_education", edu, conn);
      }

      // Employment (array)
      if (subTableData.employment_id && subTableData.employment_id.length > 0 && subTableData.employment_id[0]) {
        const emp = subTableData.employment_id.map((e, i) => ({
          sevak_id: sevak_id,
          employment_id: e,
          emp_detail: subTableData.emp_detail[i],
          post_designation: subTableData.post_designation[i],
          emp_remark: subTableData.emp_remark[i]
        }));
        await Model.insertMultiple("sevak_employment", emp, conn);
      }

      // Satsang (array)
      if (subTableData.satsang_activity_id && subTableData.satsang_activity_id.length > 0 && subTableData.satsang_activity_id[0]) {
        const satsang = subTableData.satsang_activity_id.map((s, i) => ({
          sevak_id: sevak_id,
          satsang_activity_id: s,
          satsang_designation_id: subTableData.satsang_designation_id[i],
          seva_details: subTableData.seva_details[i]
        }));
        await Model.insertMultiple("sevak_satsang", satsang, conn);
      }

      await conn.commit();
      res.json({ success: true, message: "Sevak updated successfully" });
    } catch (err) {
      await conn.rollback();
      console.error(err);
      res.status(500).json({ success: false, message: "Error updating Sevak", error: err.message });
    } finally {
      conn.release();
    }
  }
];

exports.deleteSevak = async (req, res) => {
  try {
    const { sevak_id } = req.body;

    if (!sevak_id) {
      return res.status(400).json({ success: false, message: "Sevak ID is required." });
    }

    // Use the softDelete method from the model
    const affectedRows = await Model.softDelete('sevak_master', { sevak_id: sevak_id }, { deleted_id: req.user?.user_id || 1 });

    if (affectedRows > 0) {
      res.json({ success: true, message: "Sevak deleted successfully." });
    } else {
      res.status(404).json({ success: false, message: "Sevak not found or already deleted." });
    }
  } catch (err) {
    console.error("Error deleting sevak:", err);
    res.status(500).json({ success: false, message: "An error occurred while deleting the sevak." });
  }
};


exports.AddNoneSevakRegistration = (req, res) => {
  res.sendFile(path.join(viewsPath, "SevakRegistration", "AddNoneSevak.html"));
};

exports.addNoneSevak = [

  upload.fields([
    { name: 'sevak_photo', maxCount: 1 }
  ]),
  async (req, res) => {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      let data = { ...req.body };

      // 1. Sanitize and format data based on PHP logic
      // Unset fields that are not part of the sevak_master table
      delete data.sevak_id;
      delete data.taluka_name;
      delete data.district_name;
      delete data.state_name;
      delete data.country_name;

      // Capitalize names
      data.first_name = data.first_name ? data.first_name.charAt(0).toUpperCase() + data.first_name.slice(1).toLowerCase() : null;
      data.middle_name = data.middle_name ? data.middle_name.charAt(0).toUpperCase() + data.middle_name.slice(1).toLowerCase() : null;
      data.last_name = data.last_name ? data.last_name.charAt(0).toUpperCase() + data.last_name.slice(1).toLowerCase() : null;

      // Format date
      data.birth_date = data.birth_date ? new Date(data.birth_date).toISOString().split('T')[0] : null;

      const intFields = [
        'city_id', 'country_id', 'blood_group_id', 'city_area_id', 'state_id', 'district_id', 'taluka_id', 'marital_status_id',
      ];

      for (const field of intFields) {
        if (data[field] === '') {
          data[field] = null;
        }
      }


      const dateFields = [
        'birth_date', 'marital_date', 'parshad_date', 'certified_date',
      ];
      dateFields.forEach(field => {
        data[field] = formatDate(data[field]); // Uses your existing helper
      });

      // Handle checkbox
      data.login_active = data.login_active === 'on' ? 'Y' : 'N';

      // Set sevak type
      data.sevak_type = 'N';

      // Handle file upload
      if (req.files) {
        if (req.files['sevak_photo']) {
          data.sevak_photo = req.files['sevak_photo'][0].path.replace('public/src/', '');
        }
      }

      // Set creation metadata
      data.created_id = req.user?.user_id || 1; // Fallback to 1 if user is not available
      data.created_at = new Date();

      // 2. Insert into sevak_master
      const sevakID = await Model.insert("sevak_master", data, conn);

      // 3. Insert into sevak_role
      await Model.insert("sevak_role", {
        role_id: data.role_id,
        sevak_id: sevakID
      }, conn);

      await conn.commit();
      res.json({ success: true, message: "None Sevak created successfully." });

    } catch (err) {
      await conn.rollback();
      console.error("Error adding None Sevak:", err);
      res.status(500).json({ success: false, message: "An error occurred while adding the None Sevak." });
    } finally {
      conn.release();
    }
  }
];


exports.ViewNoneSevak = (req, res) => {
  res.sendFile(path.join(viewsPath, "SevakRegistration", "ViewNoneSevak.html"));
};

exports.listNoneSevak = async (req, res) => {
  try {
    const rows = await Model.getNoneSevak();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching  Nirdeshak list:", err);
    res.status(500).json({ message: "Error fetching  Nirdeshak list" });
  }
};

exports.getEditNoneSevakPage = (req, res) => {
  res.sendFile(path.join(viewsPath, "SevakRegistration", "editNoneSevak.html"));
};

exports.getNoneSevakForEdit = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "Sevak ID is required." });
    }

    // Fetch all data in parallel for maximum efficiency
    const [
      sevakInfo,
      currentSevakRole,
    ] = await Promise.all([
      Model.getSevakById(id),
      Model.getSevakRoles(id),
    ]);

    if (!sevakInfo) {
      return res.status(404).json({ success: false, message: "Sevak not found." });
    }

    res.json({ success: true, data: { sevakInfo, currentSevakRole, } });
  } catch (err) {
    console.error("Error fetching sevak data for edit:", err);
    res.status(500).json({ success: false, message: "An error occurred while fetching data." });
  }
};

exports.updateNoneSevak = [
  // Use the same multer middleware as addSevak
  upload.fields([
    { name: 'sevak_photo', maxCount: 1 },
  ]),
  async (req, res) => {
    const conn = await (await require("../config/db")).getConnection();
    try {
      await conn.beginTransaction();

      // Get sevak_id from the form body (your script adds it)
      const { sevak_id } = req.body;
      if (!sevak_id) {
        throw new Error("Sevak ID is missing from the update request.");
      }

      let data = { ...req.body };


      delete data.sevak_id;
      delete data.taluka_name;
      delete data.district_name;
      delete data.state_name;
      delete data.country_name;

      // Capitalize names
      data.first_name = data.first_name ? data.first_name.charAt(0).toUpperCase() + data.first_name.slice(1).toLowerCase() : null;
      data.middle_name = data.middle_name ? data.middle_name.charAt(0).toUpperCase() + data.middle_name.slice(1).toLowerCase() : null;
      data.last_name = data.last_name ? data.last_name.charAt(0).toUpperCase() + data.last_name.slice(1).toLowerCase() : null;

      // Format date
      data.birth_date = data.birth_date ? new Date(data.birth_date).toISOString().split('T')[0] : null;

      const intFields = [
        'city_id', 'country_id',
        'blood_group_id', 'city_area_id', 'state_id', 'district_id', 'taluka_id', 'marital_status_id',
      ];

      for (const field of intFields) {
        if (data[field] === '') {
          data[field] = null;
        }
      }


      const dateFields = [
        'birth_date', 'marital_date', 'parshad_date', 'certified_date',
      ];
      dateFields.forEach(field => {
        data[field] = formatDate(data[field]); // Uses your existing helper
      });

      // Handle checkbox
      data.login_active = data.login_active === 'on' ? 'Y' : 'N';

      // Set sevak type
      data.sevak_type = 'N';

      // Handle file upload
      if (req.files) {
        if (req.files['sevak_photo']) {
          data.sevak_photo = req.files['sevak_photo'][0].path.replace('public/src/', '');
        }
      }

      data.updated_id = req.user?.user_id || 1; // Fallback to 1 if user is not available
      data.updated_at = new Date();


      // 4. Main Table UPDATE
      await Model.update("sevak_master", data, { sevak_id }, conn);
      await Model.delete("sevak_role", { sevak_id }, conn);

      // Roles (array)
      if (data.role_id) { // <-- CORRECTED: Changed subTableData to data
        const roles = (Array.isArray(data.role_id) ? data.role_id : [data.role_id]).map(roleId => ({ role_id: roleId, sevak_id: sevak_id }));
        if (roles.length > 0) await Model.insertMultiple("sevak_role", roles, conn);
      }

      await conn.commit();
      res.json({ success: true, message: "Sevak updated successfully" });
    } catch (err) {
      await conn.rollback();
      console.error(err);
      res.status(500).json({ success: false, message: "Error updating Sevak", error: err.message });
    } finally {
      conn.release();
    }
  }
];


exports.deleteNonSevakData = async (req, res) => {
  // Although not strictly necessary for two independent operations, using a connection
  // for potential future transactional logic is good practice, especially if softDelete
  // doesn't manage its own connection. However, we'll keep it simple for now and rely
  // on the Model methods managing their connections.

  try {
    const { sevak_id } = req.body;

    if (!sevak_id) {
      return res.status(400).json({ success: false, message: "Sevak ID is required." });
    }

    // --- 1. Soft Delete the Sevak from sevak_master ---
    // The Model.softDelete method updates the 'deleted_at' and 'deleted_id' columns.
    const affectedRows = await Model.softDelete(
      'sevak_master',
      { sevak_id: sevak_id },
      { deleted_id: req.user?.user_id || 1 }
    );

    // Check if the soft delete was successful (i.e., a record was found and updated)
    if (affectedRows === 0) {
      // If no rows were affected, the sevak_id was not found or was already soft-deleted.
      return res.status(404).json({ success: false, message: "Sevak not found or already deleted." });
    }

    // --- 2. Completely Delete the Sevak's Roles from sevak_role (Hard Delete) ---
    // This is the line you needed to add. We use Model.delete for hard deletion.
    await Model.delete('sevak_role', { sevak_id: sevak_id });

    // --- 3. Success Response ---
    res.json({ success: true, message: "Non-Sevak data successfully deleted (soft delete on master, hard delete on roles)." });

  } catch (err) {
    console.error("Error deleting sevak:", err);
    res.status(500).json({ success: false, message: "An error occurred while deleting the sevak." });
  }
};