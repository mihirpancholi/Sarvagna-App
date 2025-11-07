const pool = require("../config/db");

class SevakRegistrationModel {

  static async getSevakById(sevak_id) {
    const [sevak] = await pool.execute("SELECT * FROM sevak_master WHERE sevak_id = ?", [sevak_id]);
    if (sevak.length === 0) return null;

    const data = sevak[0];

    // Fetch related data from other tables
    const [education] = await pool.execute("SELECT * FROM sevak_education WHERE sevak_id = ?", [sevak_id]);
    const [employment] = await pool.execute("SELECT * FROM sevak_employment WHERE sevak_id = ?", [sevak_id]);
    const [family] = await pool.execute("SELECT * FROM sevak_family WHERE sevak_id = ?", [sevak_id]);
    const [satsang] = await pool.execute("SELECT * FROM sevak_satsang WHERE sevak_id = ?", [sevak_id]);
    const [talent] = await pool.execute("SELECT * FROM sevak_talent WHERE sevak_id = ?", [sevak_id]);
    const [roles] = await pool.execute("SELECT role_id FROM sevak_role WHERE sevak_id = ?", [sevak_id]);
    const [group] = await pool.execute("SELECT group_id FROM group_member_mapping WHERE sevak_id = ?", [sevak_id]);

    return {
      ...data,
      education,
      employment,
      family,
      satsang,
      talent,
      roles: roles.map(r => r.role_id),
      gosthi_group_id: group.length > 0 ? group[0].group_id : null
    };
  }

  // Assume other generic model functions like these exist
  static async update(tableName, data, where) { /* ... implementation ... */ }
  static async insert(tableName, data) { /* ... implementation ... */ }
  static async insertMultiple(tableName, dataArray) { /* ... implementation ... */ }
  static async delete(tableName, where) { /* ... implementation ... */ }
  static async getTalimBatchById(id) { /* ... implementation ... */ }
  static async getCityById(id) { /* ... implementation ... */ }
  static async getMandirsByType(country_id, type) { /* ... implementation ... */ }
  static async getSpecializationByDegree(degree_id) { /* ... implementation ... */ }
  static async filterSevaks(filters) { /* ... implementation ... */ }
  static async softDelete(tableName, where, deleteInfo) { /* ... implementation ... */ }


}

module.exports = SevakRegistrationModel;