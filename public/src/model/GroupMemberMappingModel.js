const pool = require("../config/db");

class GroupMemberMapping {

    static async getSevakList() {
        const [rows] = await pool.execute(`select sevak_master.gosthi_group_status, sevak_master.sevak_id, concat(if(sevak_master.ytk_id != '', concat(sevak_master.ytk_id, '-'), ''), concat(first_name, ' ', middle_name, ' ', last_name)) as sevak_name, ifnull(sevak_master.ytk_id, '') as ytk_id, group_member_mapping.group_id, group_member_mapping.group_member_mapping_id, if((group_member_mapping.group_id is not null and group_member_mapping.group_id!=0), 'Y', 'N') as is_selected from sevak_master left join group_member_mapping on group_member_mapping.sevak_id = sevak_master.sevak_id where sevak_master.is_deleted = 'N' AND(certified_status = 'Y' OR temporary_status = 'Y') AND (expired_status != 'Y' AND sant_in_baps_status != 'Y') and sevak_master.sevak_type = 'S' order by ytk_id ASC`);
        return rows;
    }

    // 🟢 Get selected Sevak list
    static async getSelectedSevakList(groupId) {
        const [rows] = await pool.execute(`
            SELECT 
                sevak_master.contact_mobile1 AS contact_no,
                sevak_master.gosthi_group_status,
                group_id,
                group_member_mapping.sevak_id,
                CONCAT(
                    IF(sevak_master.ytk_id != '', CONCAT(sevak_master.ytk_id, '-'), ''),
                    CONCAT(first_name, ' ', middle_name, ' ', last_name)
                ) AS sevak_name,
                IFNULL(sevak_master.ytk_id, '') AS ytk_id,
                is_sanchalak,
                is_sah_sanchalak,
                '0' AS parent_index
            FROM group_member_mapping
            LEFT JOIN sevak_master 
                ON sevak_master.sevak_id = group_member_mapping.sevak_id
            WHERE 
                group_member_mapping.group_id = ?
                AND group_member_mapping.is_deleted = 'N'
            ORDER BY sevak_master.ytk_id ASC
        `, [groupId]);
        return rows;
    }

    // 🟢 Get all groups
    static async getGroupList() {
        const [rows] = await pool.execute(`
            SELECT 
                group_id,
                group_name,
                zone_code,
                LPAD(zone_no, 2, '0') AS zone_no
            FROM group_master
            WHERE is_deleted = 'N'
            ORDER BY zone_code ASC, zone_no ASC
        `);
        return rows;
    }

    // 🟢 Transfer Sevak to another group
    static async transferGroup(groupId, sevakId) {
        await pool.execute(`
            UPDATE group_member_mapping 
            SET group_id = ?, is_sanchalak = 'N', is_sah_sanchalak = 'N' 
            WHERE sevak_id = ?
        `, [groupId, sevakId]);

        await pool.execute(`
            DELETE FROM sevak_role 
            WHERE role_id IN (3, 4) AND sevak_id = ?
        `, [sevakId]);
    }

    static async saveGroupMembers(groupId, members = [], created_id) {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            // Normalize members: unique sevak_ids (preserve first occurrence)
            const seen = new Set();
            const uniqueMembers = [];
            for (const m of members) {
                if (!m || !m.sevak_id) continue;
                if (!seen.has(m.sevak_id)) {
                    seen.add(m.sevak_id);
                    uniqueMembers.push(m);
                }
            }

            // 1️⃣ Get old sanchalak
            const [oldRows] = await conn.execute(
                `SELECT sevak_id FROM group_member_mapping WHERE is_sanchalak = 'Y' AND group_id = ? LIMIT 1`,
                [groupId]
            );
            const oldSanchalak = (oldRows[0] && oldRows[0].sevak_id) ? oldRows[0].sevak_id : 0;

            // 2️⃣ Delete sevak_role for current group
            await conn.execute(
                `DELETE sr FROM sevak_role sr 
             LEFT JOIN group_member_mapping gmm ON gmm.sevak_id = sr.sevak_id AND gmm.group_id = ?
             WHERE sr.role_id IN (3,4)`,
                [groupId]
            );

            // 3️⃣ Delete existing mappings for this group
            await conn.execute(
                `DELETE FROM group_member_mapping WHERE group_id = ?`,
                [groupId]
            );

            // 4️⃣ Insert new mappings (check duplication first)
            for (const m of uniqueMembers) {
                const selGroup = m.selected_group_id || m.group_id || groupId;
                if (!m.sevak_id || !selGroup || Number(selGroup) !== Number(groupId)) {
                    continue;
                }

                // 🚨 Duplicate check — does this sevak already exist in *another* group?
                const [existsRows] = await conn.execute(
                    `SELECT group_id FROM group_member_mapping 
                 WHERE sevak_id = ? AND is_deleted = 'N' LIMIT 1`,
                    [m.sevak_id]
                );

                if (existsRows.length > 0 && Number(existsRows[0].group_id) !== Number(groupId)) {
                    console.log(`Skipping Sevak ${m.sevak_id} — already in Group ${existsRows[0].group_id}`);
                    continue; // skip inserting duplicate
                }

                // ✅ Insert mapping
                await conn.execute(
                    `INSERT INTO group_member_mapping 
                (group_id, sevak_id, is_sanchalak, is_sah_sanchalak, created_id, created_at)
                VALUES (?, ?, ?, ?, ?, NOW())`,
                    [selGroup, m.sevak_id, (m.is_sanchalak || 'N'), (m.is_sah_sanchalak || 'N'), created_id]
                );

                // ✅ Insert role entries if needed
                if ((m.is_sanchalak || 'N') === 'Y') {
                    await conn.execute(
                        `INSERT INTO sevak_role (sevak_id, role_id, created_id) VALUES (?, 3, ?)`,
                        [m.sevak_id, created_id]
                    );
                }
                if ((m.is_sah_sanchalak || 'N') === 'Y') {
                    await conn.execute(
                        `INSERT INTO sevak_role (sevak_id, role_id, created_id) VALUES (?, 4, ?)`,
                        [m.sevak_id, created_id]
                    );
                }
            }

            // 5️⃣ Continue with existing logic (sanchalak, gosthi updates, etc.)
            const [newRows] = await conn.execute(
                `SELECT sevak_id FROM group_member_mapping WHERE is_sanchalak = 'Y' AND group_id = ? LIMIT 1`,
                [groupId]
            );
            const newSanchalak = (newRows[0] && newRows[0].sevak_id) ? newRows[0].sevak_id : 0;

            if (Number(oldSanchalak) !== Number(newSanchalak)) {
                await conn.execute(
                    `UPDATE gosthi_master SET sevak_id = ? 
                 WHERE report_submitted = 'N' AND group_id = ?`,
                    [newSanchalak, groupId]
                );
            }

            await conn.commit();
            return { success: true, message: "Group Member Mapping saved successfully (duplicates skipped)" };

        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    }


    static async getGroupSevakDetails(groupId) {
        const [rows] = await pool.execute(`
            SELECT 
                gmm.group_id,
                CONCAT(gm.group_code, '-', gm.group_name) AS group_name,
                gm.group_code,
                CONCAT(sm.first_name, ' ', sm.middle_name, ' ', sm.last_name) AS sevak_name,
                sm.ytk_id,
                km.kshetra_name,
                cm.city_name,
                CONCAT(
                    IF(sm.contact_mobile1 != '', sm.contact_mobile1, ''),
                    IF(sm.contact_mobile2 != '', CONCAT(', ', sm.contact_mobile2), ''),
                    IF(sm.contact_phone_1 != '', CONCAT(', ', sm.contact_phone_1), ''),
                    IF(sm.contact_phone_2 != '', CONCAT(', ', sm.contact_phone_2), ''),
                    IF(sm.contact_res_phone1 != '', CONCAT(', ', sm.contact_res_phone1), ''),
                    IF(sm.contact_res_phone2 != '', CONCAT(', ', sm.contact_res_phone2), '')
                ) AS ContactNo
            FROM group_member_mapping gmm
            LEFT JOIN sevak_master sm ON sm.sevak_id = gmm.sevak_id
            LEFT JOIN group_master gm ON gm.group_id = gmm.group_id
            LEFT JOIN kshetra_master km ON km.kshetra_id = sm.current_kshetra_id
            LEFT JOIN city_master cm ON cm.city_id = sm.city_id
            WHERE gmm.is_deleted = 'N' AND gmm.group_id = ?
            ORDER BY sm.ytk_id ASC
        `, [groupId]);

        return rows;
    }


    // Read all
    static async getAll() {
        const [rows] = await pool.execute(`select zone_name,
       group_id,
       group_name,
       kshetra_name,
       mandir_name,
       (select count(group_member_mapping_id)
        from group_member_mapping
        where group_member_mapping.group_id = group_master.group_id) as no_of_member,
    group_master.zone_code, LPAD(group_master.zone_no, 2, '0') as zone_no
from group_master
       LEFT join zone_master on zone_master.zone_id = group_master.zone_id
       LEFT join kshetra_master on kshetra_master.zone_id = zone_master.zone_id
       LEFT join mandir_master on mandir_master.mandir_id = kshetra_master.mandir_id
where group_master.is_deleted = 'N'
group by group_master.group_id ORDER BY group_master.zone_code, group_master.zone_no ASC
    `);
        return rows;
    }









}

module.exports = GroupMemberMapping;
