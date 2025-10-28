// controller/GosthiController.js
const path = require("path");
const Model = require("../model/GosthiModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show Gosthi list page
exports.getGosthiIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Gosthi", "Gosthi", "list.html"));
};


exports.createGosthi = (req, res) => {
    res.sendFile(path.join(viewsPath, "Gosthi", "Gosthi", "createGosthi.html"));
};

exports.getGroups = async (req, res) => {
    try {
        const groups = await Model.getGroups();
        res.json({ success: true, data: groups });
    } catch (error) {
        console.error("Error fetching groups:", error);
        res.status(500).json({ success: false, message: "Error fetching groups" });
    }
};

exports.getGosthiReports = async (req, res) => {
    try {
        const group_id = parseInt(req.query.group_id);
        const reports = await Model.getGosthiReports(group_id);
        res.json({ success: true, data: reports });
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ success: false, message: "Error fetching reports" });
    }
};

exports.PostcreateGosthi = async (req, res) => {
    try {
        const { group_id, gosthi_date, from_time, to_time, location, created_id } =
            req.body;

        if (!group_id || !gosthi_date || !from_time || !to_time || !location) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        const date = new Date(gosthi_date);
        const month = date.toLocaleString("en-US", { month: "long" });
        const year = date.getFullYear();

        const sevak_id = await Model.getSanchalakByGroup(group_id);

        const insertId = await Model.createGosthi({
            group_id,
            gosthi_date,
            from_time,
            to_time,
            location,
            created_id: created_id || null,
            month,
            year,
            sevak_id,
        });

        res.json({
            success: true,
            message: "Gosthi created successfully",
            insertId,
        });
    } catch (error) {
        console.error("Error creating gosthi:", error);
        res.status(500).json({ success: false, message: "Error creating gosthi" });
    }
};

