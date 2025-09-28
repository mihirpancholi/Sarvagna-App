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
