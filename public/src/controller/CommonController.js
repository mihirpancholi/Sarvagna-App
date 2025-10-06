// controller/CityController.js
const path = require("path");
const Model = require("../model/CommonModel");


// when you search for a country it will show states of that country
exports.getState = async (req, res) => {
  try {
    const { country_id } = req.query;
    const rows = await Model.findByCountryId(country_id);
    res.json(rows); // send array of states
  } catch (err) {
    console.error("Error fetching state list:", err);
    res.status(500).json({ message: "Error fetching state list" });
  }
};

exports.getDistrict = async (req, res) => {
  try {
    const { state_id } = req.query;
    const rows = await Model.findByStateId(state_id);
    res.json(rows); // send array of districts
  } catch (err) {
    console.error("Error fetching district list:", err);
    res.status(500).json({ message: "Error fetching district list" });
  }
};


exports.getTaluka = async (req, res) => {
  try {
    const { district_id } = req.query;
    const rows = await Model.findByDistrictId(district_id);
    res.json(rows); // send array of talukas
  } catch (err) {
    console.error("Error fetching District list:", err);
    res.status(500).json({ message: "Error fetching District list" });
  }
};


exports.getMandir = async (req, res) => {
  try {
    const { zone_id } = req.query;
    const rows = await Model.getmandirbyzone(zone_id);
    res.json(rows); // send array of mandirs
  } catch (err) {
    console.error("Error fetching Mandir list:", err);
    res.status(500).json({ message: "Error fetching Mandir list" });
  }
};

exports.getCityArea = async (req, res) => {
  try {
    const { city_id } = req.query;
    const rows = await Model.getCityAreaByCity(city_id);
    res.json(rows); // send array of city areas
  } catch (err) {
    console.error("Error fetching City Area list:", err);
    res.status(500).json({ message: "Error fetching City Area list" });
  }
};

exports.getPincode = async (req, res) => {
  try {
    const { city_id } = req.query;
    const rows = await Model.getPincodeByCity(city_id);
    res.json(rows); // send array of pincodes
  } catch (err) {
    console.error("Error fetching Pincode list:", err);
    res.status(500).json({ message: "Error fetching Pincode list" });
  }
};

exports.getCityDetails = async (req, res) => {
  try {
    const { city_id } = req.query;
    const rows = await Model.getCityDetails(city_id);
    res.json(rows); // send array of city details
  } catch (err) {
    console.error("Error fetching City details:", err);
    res.status(500).json({ message: "Error fetching City details" });
  }
};


exports.getKshetraDetails = async (req, res) => {
  try {
    const { kshetra_id } = req.query;
    const rows = await Model.getKshetraDetailsbyID(kshetra_id);
    res.json(rows); // send array of kshetra details
  } catch (err) {
    console.error("Error fetching Kshetra details:", err);
    res.status(500).json({ message: "Error fetching Kshetra details" });
  }
};


exports.getKshetraDetailsgosthigroupmaster = async (req, res) => {
  try {
    const { zone_id } = req.query;
    const rows = await Model.getKshetraDetailsforgosthibyID(zone_id);
    res.json(rows); // send array of kshetra details
  } catch (err) {
    console.error("Error fetching Kshetra details:", err);
    res.status(500).json({ message: "Error fetching Kshetra details" });
  }
};

exports.getSevakByBatch = async (req, res) => {
  try {
    const { batch_id } = req.query;
    const rows = await Model.getSevakListByBatch(batch_id);
    res.json(rows); // send array of sevaks
  } catch (err) {
    console.error("Error fetching Sevaks:", err);
    res.status(500).json({ message: "Error fetching Sevaks" });
  }
};

exports.getSatsangDesignation = async (req, res) => {
  try {
    const { satsang_activity_id } = req.query;
    const rows = await Model.getSatsangDesignationbyActivity(satsang_activity_id);
    res.json(rows); // send array of sevaks
  } catch (err) {
    console.error("Error fetching Sevaks:", err);
    res.status(500).json({ message: "Error fetching Sevaks" });
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