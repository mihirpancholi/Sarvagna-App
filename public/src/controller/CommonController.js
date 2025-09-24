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
