// controller/GosthiScheduleController.js
const path = require("path");
const Model = require("../model/GosthiReportSubmission.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show Gosthi Schedule list page
exports.getGosthiScheduleIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Gosthi", "GosthiReportSubmission", "list.html"));
};

