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
