document.addEventListener("DOMContentLoaded", () => {
    // --- Global State ---
    let sevakItems = [];
    let selectedSevaks = [];
    let sevakGroups = [];
    let groupId = null;
    let changeGroupId = null;
    let selectedTransferSevakId = null;

    // Elements
    const groupSelect = document.getElementById("group_id");
    const availableBody = document.getElementById("availableSevaks");
    const selectedBody = document.getElementById("selectedSevaks");
    const transferModal = document.getElementById("transferModal");
    const changeGroupSelect = document.getElementById("change_group_id");

    // ----------------- 1️⃣ Load Groups -----------------
    async function loadGroups() {
        try {
            const res = await fetch("/GroupMemberMapping/getGroupList");
            sevakGroups = await res.json();
            groupSelect.innerHTML = `<option value="">-- Select Group Name --</option>`;
            sevakGroups.forEach(g => {
                const opt = document.createElement("option");
                opt.value = g.group_id;
                opt.textContent = `${g.zone_code}-${g.group_name}`;
                groupSelect.appendChild(opt);
            });
        } catch (err) {
            console.error("Error loading groups:", err);
        }
    }

    // ----------------- 2️⃣ Load Sevaks -----------------
    async function loadSevaks() {
        try {
            const res = await fetch("/GroupMemberMapping/getSevakList");
            const allSevaks = await res.json();
            // Only include sevaks where is_selected = 'N'
            sevakItems = allSevaks.filter(s => s.is_selected === 'N');
            renderAvailableSevaks();
        } catch (err) {
            console.error("Error loading sevaks:", err);
        }
    }

    // ----------------- 3️⃣ Load Selected Sevaks for Group -----------------
    async function loadSelectedSevaks() {
        if (!groupId) return;
        try {
            const res = await fetch("/GroupMemberMapping/getSelectedSevakList", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ group_id: groupId }),
            });
            selectedSevaks = await res.json();
            renderSelectedSevaks();
        } catch (err) {
            console.error("Error loading selected sevaks:", err);
        }
    }

    // ----------------- 4️⃣ Render Sevak Tables -----------------
    function renderAvailableSevaks() {
        availableBody.innerHTML = "";
        sevakItems.forEach(s => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${s.sevak_name}</td>
            <td>
                <button type="button" class="btn btn-primary btn-sm" onclick="addToSelectedSevak(${s.sevak_id})">Add</button>
            </td>`;
            availableBody.appendChild(tr);
        });
    }


    function renderSelectedSevaks() {
        selectedBody.innerHTML = "";
        selectedSevaks.forEach(s => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${s.sevak_name}</td>
                <td>
                    <select onchange="updateRole(${s.sevak_id}, this.value)">
                        <option value="none">None</option>
                        <option value="sanchalak" ${s.is_sanchalak === "Y" ? "selected" : ""}>Sanchalak</option>
                        <option value="sah_sanchalak" ${s.is_sah_sanchalak === "Y" ? "selected" : ""}>Sah Sanchalak</option>
                    </select>
                </td>
<td>
  <button type="button" class="btn btn-danger btn-sm" onclick="removeFromSelectedSevak(${s.sevak_id})">Remove</button>
<button type="button" class="btn btn-secondary btn-sm" onclick="openTransferModal(${s.sevak_id}, ${s.group_id})">Transfer</button>
</td>
`;
            selectedBody.appendChild(tr);
        });
    }

    // ----------------- 5️⃣ Add / Remove Sevaks -----------------
    window.addToSelectedSevak = function (id) {
        const sevak = sevakItems.find(s => s.sevak_id === id);
        if (!sevak) return;
        selectedSevaks.push({
            group_id: groupId,
            sevak_id: sevak.sevak_id,
            sevak_name: sevak.sevak_name,
            ytk_id: sevak.ytk_id,
            contact_no: sevak.contact_no,
            is_sanchalak: "N",
            is_sah_sanchalak: "N"
        });
        renderSelectedSevaks();
    };

    window.removeFromSelectedSevak = function (id) {
        selectedSevaks = selectedSevaks.filter(s => s.sevak_id !== id);
        renderSelectedSevaks();
    };

    // ----------------- 6️⃣ Update Roles -----------------
    window.updateRole = function (id, role) {
        const s = selectedSevaks.find(x => x.sevak_id === id);
        if (!s) return;
        s.is_sanchalak = role === "sanchalak" ? "Y" : "N";
        s.is_sah_sanchalak = role === "sah_sanchalak" ? "Y" : "N";
    };

    // ----------------- 7️⃣ Transfer Sevak -----------------
    window.openTransferModal = function (id, currentGroupId) {
        selectedTransferSevakId = id;
        selectedTransferCurrentGroupId = currentGroupId;

        const modal = document.getElementById("transferModal");
        modal.style.display = "block";

        const changeGroupSelect = document.getElementById("change_group_id");
        changeGroupSelect.innerHTML = `<option value="">-- Select Group --</option>`;

        const currentGroup = sevakGroups.find(g => g.group_id === currentGroupId);
        document.getElementById("currentGroupLabel").textContent =
            currentGroup ? `Current Group: ${currentGroup.zone_code} - ${currentGroup.group_name}` : "";

        sevakGroups.forEach(g => {
            const opt = document.createElement("option");
            opt.value = g.group_id;
            opt.textContent = `${g.zone_code}-${g.group_name}`;
            if (g.group_id === currentGroupId) opt.selected = true;
            changeGroupSelect.appendChild(opt);
        });
    };

    document.getElementById("closeModal").addEventListener("click", (e) => {
        e.preventDefault();
        transferModal.style.display = "none";
    });



    document.getElementById("saveTransfer").addEventListener("click", async (e) => {
        e.preventDefault(); // prevent accidental form submit

        const saveBtn = e.target;
        saveBtn.disabled = true;
        saveBtn.textContent = "Transferring...";

        const newGroupId = changeGroupSelect.value;
        if (!newGroupId || !selectedTransferSevakId) {
            alert("Select valid group");
            saveBtn.disabled = false;
            saveBtn.textContent = "Save Transfer";
            return;
        }

        try {
            const response = await fetch("/GroupMemberMapping/transferGroup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    group_id: newGroupId,
                    sevak_id: selectedTransferSevakId,
                }),
            });

            if (!response.ok) throw new Error("Failed to transfer");

            alert("Sevak transferred successfully");
            transferModal.style.display = "none";
            loadSelectedSevaks();
        } catch (err) {
            console.error("Error transferring group:", err);
            alert("Error transferring group");
        } finally {
            saveBtn.disabled = false;
            saveBtn.textContent = "Save Transfer";
        }
    });


    // ----------------- 8️⃣ Submit Form -----------------
    document.getElementById("saveBtn").addEventListener("click", async (e) => {
        e.preventDefault(); // prevent any default action
        if (!groupId) return alert("Select a group first!");

        const saveBtn = e.target;
        saveBtn.disabled = true;
        saveBtn.textContent = "Saving...";

        try {
            const response = await fetch("/GroupMemberMapping/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ group_id: groupId, members: selectedSevaks }),
            });

            if (!response.ok) throw new Error("Failed to save");

            alert("Group members saved successfully!");

            // ✅ Reset state after saving
            selectedSevaks = [];                  // clear members
            renderSelectedSevaks();               // refresh UI
            groupSelect.value = "";               // reset group dropdown
            groupId = null;                       // reset variable

        } catch (err) {
            console.error("Error saving group members:", err);
            alert("Error saving group members");
            location.reload();
        } finally {
            saveBtn.disabled = false;
            saveBtn.textContent = "Save mapping";
            location.reload();
        }
    });

    // ----------------- 9️⃣ Handle Group Change -----------------
    groupSelect.addEventListener("change", e => {
        groupId = e.target.value;
        loadSelectedSevaks();
    });

    // ----------------- 🔟 Initial Load -----------------
    loadGroups();
    loadSevaks();

});
