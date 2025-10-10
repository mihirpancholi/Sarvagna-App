// controller/GosthiGroupController.js
const path = require("path");
const Model = require("../model/gosthiGroupModel");
const viewsPath = path.join(__dirname, "..", "view");

// Show gosthi group list page
exports.getGosthiIndex = (req, res) => {
  res.sendFile(path.join(viewsPath, "Gosthi", "GroupMaster", "list.html"));
  
};

// API - fetch gosthi group list
exports.getGosthiData = async (req, res) => {
  try {
    const rows = await Model.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching gosthi group list:", err);
    res.status(500).json({ message: "Error fetching gosthi group list" });
  }
};




exports.addGosthiGroup = async (req, res) => {
  try {
    const { zone_code, zone_no, zone_id, mandir_id, kshetra_id, group_name, created_id } = req.body;

    // ✅ Generate group_code properly (example: concatenate zone_code and zone_no)
    const group_code = `${zone_code}-${zone_no}`;

    // Call model function
    const id = await Model.addGroup(
      zone_code,
      zone_no,
      zone_id,
      mandir_id,
      kshetra_id,
      group_code,
      group_name,
      created_id || 1 // default to 1 if missing
    );

    res.json({ success: true, message: "Gosthi Group added successfully", id });
  } catch (err) {
    console.error("Error adding Gosthi Group:", err);
    res.status(500).json({ success: false, message: "Error adding Gosthi Group" });
  }
};


// Get Group by ID (for update modal)
exports.getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const Group = await Model.getById(id);
    if (!Group) return res.status(404).json({ message: "Group not found" });
    res.json(Group);
  } catch (err) {
    console.error("Error fetching Group:", err);
    res.status(500).json({ message: "Error fetching Group" });
  }
};

// Update Group
// Update Group
exports.updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_id = 1; // TODO: Replace with actual user id
    const { zone_code, zone_no, zone_id, mandir_id, kshetra_id, group_name } = req.body;

    const group_code = `${zone_code}-${zone_no}`;

    // ✅ Check if group_name or group_code already exists for other records
    const duplicate = await Model.checkDuplicateGroup(id, group_name, group_code);
    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: `Group with name "${group_name}" or code "${group_code}" already exists.`,
      });
    }

    // ✅ Proceed with update
    await Model.updateGroup(
      id,
      zone_code,
      zone_no,
      zone_id,
      mandir_id,
      kshetra_id,
      group_code,
      group_name,
      updated_id
    );

    res.json({ success: true, message: "Group updated successfully" });
  } catch (err) {
    console.error("Error updating Group:", err);
    res.status(500).json({ success: false, message: "Error updating Group" });
  }
};




// Delete Group
exports.deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_id = 1; 
    await Model.deleteGroupmaster(id, deleted_id);
    res.json({ success: true, message: "Group deleted successfully" });
  } catch (err) {
    console.error("Error deleting Group:", err);
    res.status(500).json({ success: false, message: "Error deleting Group" });
  }
};

