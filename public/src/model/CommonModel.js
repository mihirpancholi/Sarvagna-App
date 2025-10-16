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

  static async getCityAreaByCity(city_id) {
    const [rows] = await pool.execute(
      `SELECT * FROM city_area WHERE city_id = ? AND is_deleted = 'N'`,
      [city_id]
    );
    return rows; // return the whole array, not rows[0]
  }

  static async getPincodeByCity(city_id) {
    const [rows] = await pool.execute(
      `SELECT * FROM pincode_master WHERE city_id = ? AND is_deleted = 'N'`,
      [city_id]
    );
    return rows; // return the whole array, not rows[0]
  }


  static async getCityDetails(city_id) {
    const [rows] = await pool.execute(
      `SELECT city_master.*, state_master.state_name, country_master.country_name,
    district_master.district_name, taluka_master.taluka_name FROM city_master
    LEFT JOIN state_master ON state_master.state_id = city_master.state_id
    LEFT JOIN country_master ON country_master.country_id = city_master.country_id
    LEFT JOIN district_master ON district_master.district_id = city_master.district_id
    LEFT JOIN taluka_master ON taluka_master.taluka_id = city_master.taluka_id
     WHERE city_master.city_id = ? AND city_master.is_deleted = 'N'
    `,
      [city_id]
    );
    return rows; // return the whole array, not rows[0]
  }

  static async getKshetraDetailsbyID(kshetra_id) {
    const [rows] = await pool.execute(
      `SELECT kshetra_master.*, nirdeshak_master.nirdeshak_name, sant_nirdeshak_master.sant_nirdeshak_name,
    mandir_master.mandir_type, mandir_master.mandir_name FROM kshetra_master
     LEFT JOIN  sant_nirdeshak_master on sant_nirdeshak_master.sant_nirdeshak_id  = kshetra_master.sant_nirdeshak_id
     LEFT JOIN  nirdeshak_master on nirdeshak_master.nirdeshak_id =  kshetra_master.nirdeshak_id
     LEFT JOIN mandir_master on kshetra_master.mandir_id = mandir_master.mandir_id
    WHERE kshetra_master.kshetra_id = ? AND kshetra_master.is_deleted = 'N'`,
      [kshetra_id]
    );
    return rows; // return the whole array, not rows[0]
  }

  static async getKshetraDetailsforgosthibyID(zone_id) {
    const [rows] = await pool.execute(
      `SELECT * FROM kshetra_master WHERE zone_id = ? AND is_deleted = 'N'`,
      [zone_id]
    );
    return rows; // return the whole array, not rows[0]
  }



  static async getSevakListByBatch(batch_id) {
    const [rows] = await pool.execute(
      `SELECT * FROM sevak_master WHERE talim_batch_id = ? AND is_deleted = 'N'`,
      [batch_id]
    );
    return rows; // return the whole array, not rows[0]
  }

  static async getSatsangDesignationbyActivity(satsang_activity_id) {
    const [rows] = await pool.execute(
      `SELECT * FROM satsang_designation_master WHERE satsang_activity_id = ? AND is_deleted = 'N'`,
      [satsang_activity_id]
    );
    return rows; // return the whole array, not rows[0]
  }


  static async getZoneNoAndCodeForGroup(zone_id, group_id) {
    const [rows] = await pool.execute(
      `SELECT zone_no, zone_code FROM group_master 
       WHERE zone_id = ? AND group_id = ? AND is_deleted='N'`,
      [zone_id, group_id]
    );
    return rows;
  }

  static async getMaxZoneNoAndCode(zone_id) {
    const [rows] = await pool.execute(
      `SELECT MAX(zone_no) AS zone_no, zone_code 
       FROM group_master 
       WHERE zone_id = ? AND is_deleted='N'`,
      [zone_id]
    );
    return rows;
  }


  static async getGroupGosthi(zone_id) {
    const [rows] = await pool.execute(
      `SELECT * FROM group_master WHERE zone_id = ? AND is_deleted = 'N'`,
      [zone_id]
    );
    return rows; // return the whole array, not rows[0]
  }






}

module.exports = CommonModel;
