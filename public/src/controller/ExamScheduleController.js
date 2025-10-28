// controller/ExamScheduleController.js
const path = require("path");
const db = require('../config/db.js');
const Model = require("../model/ExamScheduleModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show ExamSchedule list page
exports.getExamScheduleIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Exam", "ExamSchedule", "list.html"));
};

// API - fetch ExamSchedule list
exports.getExamSchedulesData = async (req, res) => {
    try {
        const rows = await Model.getAll();
        res.json(rows);
    } catch (err) {
        console.error("Error fetching ExamSchedule list:", err);
        res.status(500).json({ message: "Error fetching ExamSchedule list" });
    }
};

// Get ExamSchedule by ID (for update modal)
exports.getExamScheduleById = async (req, res) => {
    try {
        const { id } = req.params;
        const ExamSchedule = await Model.getById(id);
        if (!ExamSchedule) return res.status(404).json({ message: "ExamSchedule not found" });
        res.json(ExamSchedule);
    } catch (err) {
        console.error("Error fetching ExamSchedule:", err);
        res.status(500).json({ message: "Error fetching ExamSchedule" });
    }
};


const fs = require('fs').promises;

exports.postExamSchedule = async (req, res) => {
    try {
        // Get current talim batch from database
        const [talimBatchList] = await db.query(
            "SELECT talim_batch_id FROM talim_batch_master WHERE is_active='Y' AND is_deleted='N'"
        );

        const talim_batch_id = talimBatchList[0]?.talim_batch_id;

        if (!talim_batch_id) {
            return res.status(400).json({
                success: false,
                message: "No active talim batch found"
            });
        }

        // Get other fields from request body
        const { examtype_id, exam_id, exam_date, total_marks, mark_entry_start_date, mark_entry_end_date, created_id } = req.body;

        let upload_exam_paper = null;

        // Handle file upload and rename
        if (req.file) {
            // Get file extension
            const fileExtension = path.extname(req.file.originalname);

            // Create new filename: exam_date_exam_id.ext
            const newFileName = `${exam_date}_${exam_id}${fileExtension}`;

            // Define paths
            const uploadDir = path.join(__dirname, '..', 'exam_paper');
            const oldPath = req.file.path; // temp file location
            const newPath = path.join(uploadDir, newFileName);

            // Create directory if it doesn't exist
            await fs.mkdir(uploadDir, { recursive: true });

            // Move and rename the file from temp to final location
            await fs.rename(oldPath, newPath);

            // Store relative path for database
            upload_exam_paper = `src/exam_paper/${newFileName}`;

        }

        // Pass talim_batch_id to your model function
        const id = await Model.addExamSchedule(talim_batch_id, examtype_id, exam_id, exam_date, total_marks, mark_entry_start_date, mark_entry_end_date, upload_exam_paper, created_id || 1);

        res.json({ success: true, message: "ExamSchedule added successfully", id });
    } catch (err) {
        console.error("Error adding ExamSchedule:", err);

        // Clean up temp file if it exists and there was an error
        if (req.file && req.file.path) {
            try {
                await fs.unlink(req.file.path);
            } catch (unlinkErr) {
                console.error("Error deleting temp file:", unlinkErr);
            }
        }

        res.status(500).json({ success: false, message: "Error adding ExamSchedule" });
    }
};






// Update ExamSchedule
exports.updateExamSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { examtype_id, exam_id, exam_date, total_marks, mark_entry_start_date, mark_entry_end_date, updated_id } = req.body;

        // Get existing record to check for old file
        const existingSchedule = await Model.getById(id);

        if (!existingSchedule) {
            return res.status(404).json({
                success: false,
                message: "Exam schedule not found"
            });
        }

        let upload_exam_paper = existingSchedule.upload_exam_paper; // Keep existing file by default

        // Handle file upload and replace old file
        if (req.file) {
            // Delete old file if it exists
            if (existingSchedule.upload_exam_paper) {
                const oldFilePath = path.join(__dirname, '..', existingSchedule.upload_exam_paper);
                try {
                    await fs.unlink(oldFilePath);
                    console.log('Old file deleted successfully');
                } catch (unlinkErr) {
                    console.error("Error deleting old file:", unlinkErr);
                    // Continue even if old file deletion fails
                }
            }

            // Get file extension
            const fileExtension = path.extname(req.file.originalname);

            // Create new filename: exam_date_exam_id.ext
            const newFileName = `${exam_date}_${exam_id}${fileExtension}`;

            // Define paths
            const uploadDir = path.join(__dirname, '..', 'exam_paper');
            const oldPath = req.file.path; // temp file location
            const newPath = path.join(uploadDir, newFileName);

            // Create directory if it doesn't exist
            await fs.mkdir(uploadDir, { recursive: true });

            // Move and rename the file from temp to final location
            await fs.rename(oldPath, newPath);

            // Store relative path for database
            upload_exam_paper = `src/exam_paper/${newFileName}`;
        }

        // Update the record
        await Model.updateExamSchedule(
            id,
            examtype_id,
            exam_id,
            exam_date,
            total_marks,
            mark_entry_start_date,
            mark_entry_end_date,
            upload_exam_paper,
            updated_id || 1
        );

        res.json({
            success: true,
            message: "Exam schedule updated successfully"
        });
    } catch (err) {
        console.error("Error updating exam schedule:", err);

        // Clean up temp file if it exists and there was an error
        if (req.file && req.file.path) {
            try {
                await fs.unlink(req.file.path);
            } catch (unlinkErr) {
                console.error("Error deleting temp file:", unlinkErr);
            }
        }

        res.status(500).json({
            success: false,
            message: "Error updating exam schedule"
        });
    }
};

// Delete ExamSchedule
exports.deleteExamSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted_id = 1;

        // Get existing record to delete file
        const existingSchedule = await Model.getById(id);

        if (existingSchedule && existingSchedule.upload_exam_paper) {
            const filePath = path.join(__dirname, '..', existingSchedule.upload_exam_paper);
            try {
                await fs.unlink(filePath);
                console.log('File deleted successfully');
            } catch (unlinkErr) {
                console.error("Error deleting file:", unlinkErr);
            }
        }


        await Model.deleteExamSchedule(deleted_id, id);
        res.json({ success: true, message: "Exam schedule deleted successfully" });
    } catch (err) {
        console.error("Error deleting exam schedule:", err);
        res.status(500).json({ success: false, message: "Error deleting exam schedule" });
    }
};