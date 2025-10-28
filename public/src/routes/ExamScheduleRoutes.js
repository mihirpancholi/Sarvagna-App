const express = require("express");
const router = express.Router();
const ExamScheduleController = require("../controller/ExamScheduleController.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // ADD THIS LINE

// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, '..', '..', 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// Configure storage - save to temp folder first
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);  // Save to temp first
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get("/", ExamScheduleController.getExamScheduleIndex);
router.get("/list", ExamScheduleController.getExamSchedulesData);
router.get("/:id", ExamScheduleController.getExamScheduleById);
router.post("/addExamSchedule", upload.single("exam_paper"), ExamScheduleController.postExamSchedule);
router.post('/update/:id', upload.single('exam_paper'), ExamScheduleController.updateExamSchedule);
router.delete('/delete/:id', ExamScheduleController.deleteExamSchedule);


module.exports = router;