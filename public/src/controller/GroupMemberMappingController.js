const path = require("path");
const Model = require("../model/GroupMemberMappingModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show Group Member Mapping list page
exports.getGroupMemberMappingIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Gosthi", "GroupMemberMapping", "list.html"));
};

// Show Group Member Mapping manage page
exports.manageGroupMemberMapping = (req, res) => {
    res.sendFile(path.join(viewsPath, "Gosthi", "GroupMemberMapping", "manage.html"));
};

exports.getGroupSevakDetails = async (req, res) => {
    try {
        const { groupId } = req.params;
        if (!groupId) return res.status(400).send("Group ID is required");
        const rows = await Model.getGroupSevakDetails(groupId);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching group sevak details:", err);
        res.status(500).json({ message: "Error fetching group sevak details" });
    }
};

exports.getAllData = async (req, res) => {
    try {
        const rows = await Model.getAll();
        res.json(rows);
    } catch (err) {
        console.error("Error fetching list:", err);
        res.status(500).json({ message: "Error fetching list" });
    }
};

// 🟢 API: Get all Sevaks
exports.getSevakList = async (req, res) => {
    try {
        const data = await Model.getSevakList();
        res.json(data);
    } catch (error) {
        console.error("Error fetching Sevak list:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// 🟢 API: Get selected Sevaks
exports.getSelectedSevakList = async (req, res) => {
    try {
        const { group_id } = req.body;
        const data = await Model.getSelectedSevakList(group_id);
        res.json(data);
    } catch (error) {
        console.error("Error fetching selected Sevak list:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// 🟢 API: Get all groups
exports.getGroupList = async (req, res) => {
    try {
        const data = await Model.getGroupList();
        res.json(data);
    } catch (error) {
        console.error("Error fetching group list:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// 🟢 API: Transfer Sevak
exports.transferGroup = async (req, res) => {
    try {
        const { group_id, sevak_id } = req.body;
        await Model.transferGroup(group_id, sevak_id);
        res.json({ message: "Group transferred successfully" });
    } catch (error) {
        console.error("Error transferring group:", error);
        res.status(500).json({ error: "Server error" });
    }
};


exports.saveGroupMemberMapping = async (req, res) => {
    try {
        const groupId = req.body.group_id;
        const members = Array.isArray(req.body.members) ? req.body.members : [];
        // get user id from session/auth (replace as needed)
        const created_id = 1;

        if (!groupId) {
            return res.status(400).json({ success: false, message: "group_id is required" });
        }

        await Model.saveGroupMembers(groupId, members, created_id);
        return res.json({ success: true, message: "Group Member Mapping saved successfully" });
    } catch (err) {
        console.error("Error saving group members:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
