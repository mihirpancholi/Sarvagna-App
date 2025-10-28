// controller/ExamTypeController.js
const path = require("path");
const Model = require("../model/ExamTypeModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show ExamType list page
exports.getExamTypeIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Exam", "ExamType", "list.html"));
};

// API - fetch ExamType list
exports.getExamTypesData = async (req, res) => {
    try {
        const rows = await Model.getAll();
        res.json(rows);
    } catch (err) {
        console.error("Error fetching ExamType list:", err);
        res.status(500).json({ message: "Error fetching ExamType list" });
    }
};

// Add ExamType (modal submit)
exports.postExamType = async (req, res) => {
    try {
        const { exam_type, created_id } = req.body;
        const id = await Model.addExamType(exam_type, created_id || 1); // default to 1 if missing
        res.json({ success: true, message: "ExamType added successfully", id });
    } catch (err) {
        console.error("Error adding ExamType:", err);
        res.status(500).json({ success: false, message: "Error adding ExamType" });
    }
};


// Get ExamType by ID (for update modal)
exports.getExamTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const examType = await Model.getById(id);
        if (!examType) return res.status(404).json({ message: "ExamType not found" });
        res.json(examType);
    } catch (err) {
        console.error("Error fetching ExamType:", err);
        res.status(500).json({ message: "Error fetching ExamType" });
    }
};


// Update ExamType
exports.updateExamType = async (req, res) => {
    try {
        const { id } = req.params;
        const { exam_type } = req.body;
        const updated_id = 1;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid ExamType ID" });
        }

        if (!exam_type || exam_type.trim() === '') {
            return res.status(400).json({ success: false, message: "Exam type is required" });
        }

        // Check if exists
        const existing = await Model.getById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: "ExamType not found" });
        }

        await Model.updateExamType(id, exam_type, updated_id);
        res.json({ success: true, message: "ExamType updated successfully" });
    } catch (err) {
        console.error("Error updating ExamType:", err);
        res.status(500).json({ success: false, message: "Error updating ExamType" });
    }
};

// Delete ExamType
exports.deleteExamType = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted_id = 1; // Get from session, default to 1

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid ExamType ID" });
        }

        // Check if exists
        const existing = await Model.getById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: "ExamType not found" });
        }

        await Model.deleteExamType(id, deleted_id);
        res.json({ success: true, message: "ExamType deleted successfully" });
    } catch (err) {
        console.error("Error deleting ExamType:", err);
        res.status(500).json({ success: false, message: "Error deleting ExamType" });
    }
};