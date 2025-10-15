// controller/GosthiScheduleController.js
const path = require("path");
const Model = require("../model/GosthiScheduleModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show Gosthi Schedule list page
exports.getGosthiScheduleIndex = (req, res) => {
  res.sendFile(path.join(viewsPath, "Gosthi", "GosthiSchedule", "list.html"));
};

// API - fetch Gosthi Schedule list
exports.getGosthiSchedulesData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching Gosthi Schedule list:", err);
    res.status(500).json({ message: "Error fetching Gosthi Schedule list" });
  }
};

// Show Gosthi Schedule list page
exports.addGosthiSchedule = (req, res) => {
  res.sendFile(path.join(viewsPath, "Gosthi", "GosthiSchedule", "add.html"));
};

exports.getYearwiseMonth = async (req, res) => {
  try {
    const { gosthi_year } = req.body;
    const rows = await Model.getYearwiseMonth(gosthi_year);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching Data:", err);
    res.status(500).json({ message: "Error fetching Data" });
  }
};

exports.getGosthiNo = async (req, res) => {
  try {
    const gosthiTopicTypeId = req.body.gosthi_topic_type_id || 0;
    const gosthiMonth = req.body.gosthi_month;

    if (!gosthiMonth) {
      return res.status(400).json({ error: "gosthi_month is required" });
    }

    const result = await Model.getGosthiNo(gosthiTopicTypeId, gosthiMonth);

    let gosthiNo = 1;
    if (result.length > 0 && result[0].gosthi_topic_type_no !== null) {
      gosthiNo = parseInt(result[0].gosthi_topic_type_no, 10) + 1;
    }

    res.json({ gosthi_topic_type_no: gosthiNo });
  } catch (err) {
    console.error("Error in getGosthiNo:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};

exports.postGosthiSchedule = async (req, res) => {
  try {
    const { gosthi_year, gosthi_month, report_submission_from_date, topics } =
      req.body;

    if (!topics || topics.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one Gosthi Topic",
      });
    }

    // Insert main schedule
    const gosthiScheduleData = {
      gosthi_year: gosthi_year,
      gosthi_month: gosthi_month,
      report_submission_from_date: report_submission_from_date,
      created_id: 1,
    };

    const gosthiScheduleId = await Model.insertGosthiSchedule(
      gosthiScheduleData
    );

    // Insert topics detail
    for (const topic of topics) {
      const scheduleDetailData = {
        gosthi_schedule_id: gosthiScheduleId,
        gosthi_topic_type_id: topic.gosthi_topic_type_id,
        gosthi_topic_type_no: topic.gosthi_topic_type_no,
        topic_name: topic.topic_name,
        created_id: 1,
      };

      await Model.insertGosthiScheduleDetail(scheduleDetailData);
    }

    res.json({ success: true, message: "Gosthi Schedule saved successfully" });
  } catch (err) {
    console.error("Error adding Gosthi Schedule:", err);
    res
      .status(500)
      .json({ success: false, message: "Error saving Gosthi Schedule" });
  }
};

exports.getGosthiScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const GosthiType = await Model.getById(id);  // <-- your model fetch
    if (!GosthiType) return res.status(404).json({ message: "GosthiType not found" });
    res.json(GosthiType);
  } catch (err) {
    console.error("Error fetching Gosthi Type:", err);
    res.status(500).json({ message: "Error fetching Gosthi Type" });
  }
};


exports.deleteGosthiSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1;
    await Model.deleteGosthiSchedule(id, deleted_id);
    res.json({ success: true, message: "GosthiType deleted successfully" });
  } catch (err) {
    console.error("Error deleting Gosthi Type:", err);
    res
      .status(500)
      .json({ success: false, message: "Error deleting Gosthi Type" });
  }
};

exports.updateview = async (req, res) => {
  res.sendFile(path.join(viewsPath, "Gosthi", "GosthiSchedule", "edit.html"));
};


exports.PostupdateGosthiSchedule = async (req, res) => {
  try {
    const { gosthi_year, gosthi_month, report_submission_from_date, topics } = req.body;
    const scheduleId = req.params.id;

    if (!topics || topics.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one Gosthi Topic",
      });
    }

    if (!scheduleId) {
      return res.status(400).json({
        success: false,
        message: "Schedule ID is required for update",
      });
    }

    // 1️⃣ Update main schedule
    const gosthiScheduleData = {
      gosthi_schedule_id: scheduleId,
      gosthi_year,
      gosthi_month,
      report_submission_from_date,
      updated_id: 1, // you can replace with logged-in user ID
    };
    await Model.UpdateGosthiSchedule(gosthiScheduleData);

    // 2️⃣ Mark existing topics as deleted
    await Model.DeleteGosthiScheduleDetails(gosthiScheduleData);

    // 3️⃣ Insert all topics
    for (const topic of topics) {
      const scheduleDetailData = {
        gosthi_schedule_id: scheduleId,
        gosthi_topic_type_id: topic.gosthi_topic_type_id,
        gosthi_topic_type_no: topic.gosthi_topic_type_no,
        topic_name: topic.topic_name,
        created_id: 1 // you can replace with logged-in user ID
      };
      await Model.insertGosthiScheduleDetail(scheduleDetailData);
    }

    res.json({ success: true, message: "Gosthi Schedule updated successfully" });

  } catch (err) {
    console.error("Error updating Gosthi Schedule:", err);
    res.status(500).json({ success: false, message: "Error saving Gosthi Schedule" });
  }
};
