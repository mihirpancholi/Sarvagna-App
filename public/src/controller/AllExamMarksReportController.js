const path = require("path");
const Model = require("../model/AllExamMarksReportModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show the report generation page
exports.getReportPage = (req, res) => {
    res.sendFile(path.join(viewsPath, "Exam", "AllExamMarksReport", "AllExamMarksReport.html"));
};

// API to get initial data for the Talim Batch dropdown
exports.getInitialData = async (req, res) => {
    try {
        const talimBatches = await Model.getTalimBatches();
        res.json({ success: true, data: { talimBatches } });
    } catch (err) {
        console.error("Error fetching initial report data:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// API to generate the final report data
exports.generateReport = async (req, res) => {
    try {
        const { talim_batch_id } = req.body;

        if (!talim_batch_id) {
            return res.status(400).json({ success: false, message: "Talim Batch is required." });
        }

        // Fetch exams and students in parallel
        const [exams, students] = await Promise.all([
            Model.getExamsForBatch(talim_batch_id),
            Model.getStudentsForBatch(talim_batch_id)
        ]);

        if (!students.length || !exams.length) {
            return res.json({ success: false, message: "No data found for the selected batch." });
        }

        // Fetch all marks for the batch
        const allMarks = await Model.getAllMarksForBatch(talim_batch_id);

        // Create a map for quick mark lookup: sevakId_examId -> marks
        const marksMap = new Map();
        allMarks.forEach(mark => {
            marksMap.set(`${mark.sevak_id}_${mark.exam_id}`, mark.marks);
        });

        res.json({
            success: true,
            data: { exams, students, marksMap: Object.fromEntries(marksMap) }
        });

    } catch (err) {
        console.error("Error generating all exam marks report:", err);
        res.status(500).json({
            success: false,
            message: "An error occurred while generating the report.",
        });
    }
};