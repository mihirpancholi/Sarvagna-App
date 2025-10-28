// controller/ExamDashboardController.js
const path = require("path");
const Model = require("../model/ExamDashboardModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show Exam Dashboard page
exports.getExamDashboardIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Exam", "Dashboard", "list.html"));
};

