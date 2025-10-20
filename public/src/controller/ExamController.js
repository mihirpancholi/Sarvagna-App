// controller/ExamController.js
const path = require("path");
const Model = require("../model/ExamModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show Exam list page
exports.getExamIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Exam", "Exam", "list.html"));
};

// API - fetch Exam list
exports.getExamsData = async (req, res) => {
    try {
        const rows = await Model.getAll();
        res.json(rows);
    } catch (err) {
        console.error("Error fetching Exam list:", err);
        res.status(500).json({ message: "Error fetching Exam list" });
    }
};

// Add Exam (modal submit)
exports.postExam = async (req, res) => {
    try {
        const { examtype_id, exam_name, created_id } = req.body;
        if (!exam_name || !examtype_id)
            return res.status(400).json({ message: "Exam name and type are required" });

        const id = await Model.addExam(examtype_id, exam_name, created_id || 1);
        res.json({ success: true, message: "Exam added successfully", id });
    } catch (err) {
        console.error("Error adding Exam:", err);
        res.status(500).json({ success: false, message: "Error adding Exam" });
    }
};



// Get Exam by ID (for update modal)
exports.getExamById = async (req, res) => {
    try {
        const { id } = req.params;
        const exam = await Model.getById(id);
        if (!exam) return res.status(404).json({ message: "Exam not found" });
        res.json(exam);
    } catch (err) {
        console.error("Error fetching Exam:", err);
        res.status(500).json({ message: "Error fetching Exam" });
    }
};


// Update Exam
exports.updateExam = async (req, res) => {
    try {
        const { id } = req.params;
        const { examtype_id, exam_name } = req.body;
        const updated_id = 1;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid Exam ID" });
        }

        if (!exam_name || exam_name.trim() === '') {
            return res.status(400).json({ success: false, message: "Exam name is required" });
        }

        // Check if exists
        const existing = await Model.getById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: "Exam not found" });
        }

        await Model.updateExam(id, examtype_id, exam_name, updated_id);
        res.json({ success: true, message: "Exam updated successfully" });
    } catch (err) {
        console.error("Error updating Exam:", err);
        res.status(500).json({ success: false, message: "Error updating Exam" });
    }
};

// Delete Exam
exports.deleteExam = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted_id = 1; // Get from session, default to 1

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid Exam ID" });
        }

        // Check if exists
        const existing = await Model.getById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: "Exam not found" });
        }

        await Model.deleteExam(id, deleted_id);
        res.json({ success: true, message: "Exam deleted successfully" });
    } catch (err) {
        console.error("Error deleting Exam:", err);
        res.status(500).json({ success: false, message: "Error deleting Exam" });
    }
};