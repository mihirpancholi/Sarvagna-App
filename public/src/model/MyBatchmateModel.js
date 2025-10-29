const db = require('../config/db.js');

class MyBatchmateModel {
    static async getBatchmates(sevakId) {
        if (!sevakId) {
            throw new Error("Sevak ID is required.");
        }

        // 1. Get the talim_batch_id for the logged-in sevak
        const [talimResult] = await db.query(
            "SELECT talim_batch_id FROM sevak_master WHERE sevak_id = ? AND is_deleted='N' AND sevak_type='S'",
            [sevakId]
        );

        const talimBatchId = talimResult[0]?.talim_batch_id;

        if (!talimBatchId) {
            return []; // No batch found for this sevak, so return empty array.
        }

        // 2. Get all batchmates using the talim_batch_id, excluding the current user
        const [batchmates] = await db.query(`
            SELECT
                sm.sevak_id,
                sm.ytk_id,
                sm.contact_mobile1,
                sm.contact_mobile2,
                sm.contact_phone_1,
                sm.contact_phone_2,
                sm.contact_res_phone1,
                sm.contact_res_phone2,
                sm.contact_whatsapp_no,
                CONCAT(sm.first_name, ' ', sm.middle_name, ' ', sm.last_name) AS sevak_name,
                cm.city_name,
                sm.birth_date,
                IF(sm.marital_status_id = '3', sm.marital_date, NULL) AS marriage_date,
                CONCAT(tbm.talim_year, '-', IF((tbm.talim_batch = 'F'), 'First', 'Second')) AS batch
            FROM sevak_master sm
            LEFT JOIN city_master cm ON cm.city_id = sm.city_id
            LEFT JOIN talim_batch_master tbm ON tbm.talim_batch_id = sm.talim_batch_id
            WHERE sm.is_deleted = 'N' 
              AND (sm.certified_status = 'Y' OR sm.temporary_status = 'Y') 
              AND (sm.expired_status != 'Y' AND sm.sant_in_baps_status != 'Y') 
              AND sm.sevak_type = 'S' 
              AND sm.talim_batch_id = ? 
              AND sm.sevak_id != ? 
            ORDER BY MONTH(sm.birth_date) ASC, DAY(sm.birth_date) ASC, YEAR(sm.birth_date) ASC`,
            [talimBatchId, sevakId]
        );

        return batchmates;
    }
}

module.exports = MyBatchmateModel;
