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


exports.getZoneCode = async (req, res) => {
  try {
    const data = req.body;
    let zoneId = data.zone_id || 0;
    let groupId = data.group_id || null;

    if (!zoneId) {
      return res.status(400).json({ message: 'zone_id is required' });
    }

    // Step 1: Get Zone Name
    const zoneRows = await GosthiGroupModel.getZoneNameById(zoneId);
    if (zoneRows.length === 0) {
      return res.status(404).json({ message: 'Zone not found' });
    }

    const zoneName = zoneRows[0].zone_name;
    const zoneCode = zoneName ? zoneName.substring(0, 1) : '';

    let zone_no = '';

    // Step 2: If groupId present, fetch its zone_no
    if (groupId) {
      const groupRows = await GosthiGroupModel.getZoneNoAndCodeForGroup(zoneId, groupId);
      if (groupRows.length > 0) {
        zone_no = groupRows[0].zone_no.toString().padStart(2, '0');
      } else {
        // fallback: if group_id not found
        const maxRows = await GosthiGroupModel.getMaxZoneNoAndCode(zoneId);
        if (maxRows.length > 0 && maxRows[0].zone_no !== null) {
          zone_no = (maxRows[0].zone_no + 1).toString().padStart(2, '0');
        } else {
          zone_no = '01';
        }
      }
    } else {
      // Step 3: If no groupId, take max zone_no + 1
      const maxRows = await GosthiGroupModel.getMaxZoneNoAndCode(zoneId);
      if (maxRows.length > 0 && maxRows[0].zone_no !== null) {
        zone_no = (maxRows[0].zone_no + 1).toString().padStart(2, '0');
      } else {
        zone_no = '01';
      }
    }

    res.json({ zone_code: zoneCode, zone_no });

  } catch (err) {
    console.error('Error fetching zone code:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


