const path = require("path");
const Model = require("../model/ExamWiseSubjectReportModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show the report generation page
exports.getReportPage = (req, res) => {
    res.sendFile(path.join(viewsPath, "Exam", "ExamWiseSubjectReport", "ExamWiseSubjectReport.html"));
};

// API to get initial data for dropdowns
exports.getInitialData = async (req, res) => {
    try {
        const [talimBatches, examTypes] = await Promise.all([
            Model.getTalimBatches(),
            Model.getExamTypes(),
        ]);
        res.json({ success: true, data: { talimBatches, examTypes } });
    } catch (err) {
        console.error("Error fetching initial report data:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// API to get exam names based on type and batch
exports.getExamNames = async (req, res) => {
    try {
        const { talimbatch_id, examtype_id } = req.body;
        if (!talimbatch_id || !examtype_id) {
            return res.status(400).json({ success: false, message: "Talim Batch and Exam Type are required." });
        }
        const exams = await Model.getExamsByTypeAndBatch(talimbatch_id, examtype_id);
        res.json({ success: true, data: exams });
    } catch (err) {
        console.error("Error fetching exam names:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// API to generate the final report data
exports.generateReport = async (req, res) => {
    try {
        const { talim_batch_id, examtype_id, exam_id } = req.body;

        if (!talim_batch_id || !examtype_id || !exam_id) {
            return res.status(400).json({ success: false, message: "All filter fields are required." });
        }

        const reportData = await Model.getExamSubjectReport(talim_batch_id, examtype_id, exam_id);

        if (!reportData.length) {
            return res.json({ success: false, message: "No data found for the selected criteria." });
        }

        res.json({ success: true, data: reportData });

    } catch (err) {
        console.error("Error generating exam subject report:", err);
        res.status(500).json({
            success: false,
            message: "An error occurred while generating the report.",
        });
    }
};