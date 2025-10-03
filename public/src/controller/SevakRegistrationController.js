const multer = require('multer'); // Add this at the top of your controller

const path = require("path");
const pool = require("../config/db"); 
const Model = require("../model/SevakRegistrationModel.js");
const viewsPath = path.join(__dirname, "..", "view");


// Serve HTML pages
exports.AddSevakRegistration = (req, res) => {
  res.sendFile(path.join(viewsPath, "SevakRegistration", "SevakRegistration.html"));
};

exports.SevakIndex = (req, res) => {
  res.sendFile(path.join(viewsPath, "Master", "SevakRegistration", "viewSevak.html"));
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

// ---------- Multer Setup ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
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
    { name: "sevak_photo", maxCount: 1 },
    { name: "latest_photo", maxCount: 1 }
  ]),
  async (req, res) => {
    const conn = await (await require("../config/db")).getConnection();
    try {
      await conn.beginTransaction();
      let data = { ...req.body };

      // Remove unnecessary fields
      [
        "sevak_id","taluka_name","district_name","state_name","country_name",
        "per_taluka_name","per_district_name","per_state_name","per_country_name",
        "talim_taluka_name","talim_district_name","talim_state_name","talim_country_name"
      ].forEach(f => delete data[f]);

      // Capitalize names
      ["first_name","middle_name","last_name"].forEach(f => {
        if (data[f])
          data[f] = data[f].charAt(0).toUpperCase() + data[f].slice(1).toLowerCase();
      });

      // Status fields
      const statusFields = ["admitted","certified","not_complete","temporary","expired","sant_in_baps"];
      statusFields.forEach(f => {
        if (f in data) {
          data[f + "_status"] = data[f] === "on" ? "Y" : "N";
          data[f + "_date"] = formatDate(data[f + "_date"]);
          delete data[f];
          delete data[f + "_date"];
        }
      });

      // Checkboxes
      data.sameprimaryno = data.sameprimaryno === "on" ? "Y" : "N";

      // Permanent Address
      if (data.is_perm_add === "on") {
        data.is_perm_add = "Y";
        ["address1","country_id","state_id","district_id","taluka_id","city_id","pincode"].forEach(field => {
          data["per_" + field] = data[field];
        });
      } else data.is_perm_add = "N";

      // Talim Address
      if (data.is_talim_add === "on") {
        data.is_talim_add = "Y";
        ["address1","country_id","state_id","district_id","taluka_id","city_id","pincode"].forEach(field => {
          data["talim_" + field] = data[field];
        });
      } else data.is_talim_add = "N";

      // Uploaded Files
      if (req.files["sevak_photo"])
        data.sevak_photo = req.files["sevak_photo"][0].filename;
      if (req.files["latest_photo"])
        data.latest_photo = req.files["latest_photo"][0].filename;

      // Metadata
      data.created_id = req.user?.user_id || 1; // fallback if no auth
      data.created_at = new Date();
      data.role_id = 2;

      // Duplicate check
      const existing = await Model.checkDuplicateSevak(data.talim_batch_id, data.sevak_no);
      if (existing.length > 0) {
        return res.status(400).json({ success: false, message: "Sevak No already exists" });
      }

      // Insert Sevak
      const sevakID = await Model.insert("sevak_master", data);

      // Group Mapping
      await Model.insert("group_member_mapping", {
        group_id: data.gosthi_group_id,
        is_sanchalak: "N",
        is_sah_sanchalak: "N",
        sevak_id: sevakID
      });

      // Roles (array)
      if (req.body.role_id && Array.isArray(req.body.role_id)) {
        const roles = req.body.role_id.map(roleId => ({ role_id: roleId, sevak_id: sevakID }));
        await Model.insertMultiple("sevak_role", roles);
      }

      // Talents (array)
      if (data.talent_id && Array.isArray(data.talent_id)) {
        const talents = data.talent_id.map((t, i) => ({
          sevak_id: sevakID,
          talent_id: t,
          grade_id: data.grade_id[i],
          talent_detail: data.talent_detail[i]
        }));
        await Model.insertMultiple("sevak_talent", talents);
      }

      // Family (array)
      if (data.relationship_id && Array.isArray(data.relationship_id)) {
        const family = data.relationship_id.map((r, i) => ({
          sevak_id: sevakID,
          relationship_id: r,
          family_name: data.family_name[i],
          family_country_code: data.family_country_code[i],
          family_mobile: data.family_mobile[i],
          family_occupation: data.family_occupation[i],
          family_email: data.family_email[i]
        }));
        await Model.insertMultiple("sevak_family", family);
      }

      // Education (array)
      if (data.degree_id && Array.isArray(data.degree_id)) {
        const edu = data.degree_id.map((d, i) => ({
          sevak_id: sevakID,
          degree_id: d,
          specialization_id: data.specialization_id[i],
          edu_remark: data.edu_remark[i]
        }));
        await Model.insertMultiple("sevak_education", edu);
      }

      // Employment (array)
      if (data.employment_id && Array.isArray(data.employment_id)) {
        const emp = data.employment_id.map((e, i) => ({
          sevak_id: sevakID,
          employment_id: e,
          emp_detail: data.emp_detail[i],
          post_designation: data.post_designation[i],
          emp_remark: data.emp_remark[i]
        }));
        await Model.insertMultiple("sevak_employment", emp);
      }

      // Satsang (array)
      if (data.satsang_activity_id && Array.isArray(data.satsang_activity_id)) {
        const satsang = data.satsang_activity_id.map((s, i) => ({
          sevak_id: sevakID,
          satsang_activity_id: s,
          satsang_designation_id: data.satsang_designation_id[i],
          seva_details: data.seva_details[i]
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




