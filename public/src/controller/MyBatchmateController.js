// src/controller/MyBatchmateController.js
const path = require("path");
const MyBatchmateModel = require("../model/MyBatchmateModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show MyBatchmate list page
exports.getMyBatchmateIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "MyBatchmate", "MyBatchmate.html"));
};

exports.getMyBatchmates = async (req, res) => {
    try {
        const sevakId = 1;
        if (!sevakId) {
            return res.status(401).json({ success: false, message: "User not authenticated." });
        }

        const data = await MyBatchmateModel.getBatchmates(sevakId);
        res.json({ success: true, data });
    } catch (err) {
        console.error("Error fetching batchmates:", err);
        res.status(500).json({ success: false, message: "Server error while fetching batchmates." });
    }
};
