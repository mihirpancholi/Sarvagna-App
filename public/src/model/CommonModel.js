const pool = require("../config/db");

class CommonModel {

static async findByCountryId(country_id) {
  const [rows] = await pool.execute(
    `SELECT * FROM state_master WHERE country_id = ? AND is_deleted = 'N'`,
    [country_id]
  );
  return rows; // return the whole array, not rows[0]
}

static async findByStateId(state_id) {
  const [rows] = await pool.execute(
    `SELECT * FROM district_master WHERE state_id = ? AND is_deleted = 'N'`,
    [state_id]
  );
  return rows; // return the whole array, not rows[0]
}


static async findByDistrictId(district_id) {
  const [rows] = await pool.execute(
    `SELECT * FROM taluka_master WHERE district_id = ? AND is_deleted = 'N'`,
    [district_id]
  );
  return rows; // return the whole array, not rows[0]
}


static async getmandirbyzone(zone_id) {
  const [rows] = await pool.execute(
    `SELECT * FROM mandir_master WHERE zone_id = ? AND is_deleted = 'N'`,
    [zone_id]
  );
  return rows; // return the whole array, not rows[0]
}

}

module.exports = CommonModel;
