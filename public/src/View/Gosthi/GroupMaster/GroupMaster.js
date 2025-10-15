// Fetch GosthiType list
function LoadGosthiGroup() {
            fetch('/GosthiGroup/list')
                .then(res => res.json())
                .then(data => {
                    const tableBody = document.getElementById('GosthiType-table-body');
                    tableBody.innerHTML = '';
                    data.forEach((GosthiType, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
              <td>${index + 1}</td>
              <td>${GosthiType.zone_name || ''}</td>
              <td>${GosthiType.mandir_name || ''}</td>
              <td>${GosthiType.kshetra_name || ''}</td>
              <td>${GosthiType.group_code || ''}</td>
             <td>${GosthiType.group_name || ''}</td> 
             <td></td>            
              <td>${GosthiType.full_name || ''}</td>
              <td>
                <button class="btn btn-update" onclick='openUpdateModal(${JSON.stringify(GosthiType)})'>Update</button>
                <button class="btn btn-delete" onclick="deleteGosthiType(${GosthiType.group_id})">Delete</button>
              </td>
            `;
                        tableBody.appendChild(row);
                    });
                });
        }

        function LoadZones(selectId, selectedValue = null) {
            fetch('/zone/list')
                .then(res => res.json())
                .then(zones => {
                    const select = document.getElementById(selectId);
                    select.innerHTML = '<option value="">-- Select Zone --</option>';
                    zones.forEach(z => {
                        const opt = document.createElement('option');
                        opt.value = z.zone_id;
                        opt.textContent = z.zone_name;
                        if (selectedValue && selectedValue == z.zone_id) opt.selected = true;
                        select.appendChild(opt);
                    });
                });
        }

        function loadMandir(zone_id, selectId, selectedValue = null) {
            fetch(`/common/getmandirbyzone?zone_id=${zone_id}`)
                .then(res => res.json())
                .then(mandirs => {
                    const select = document.getElementById(selectId);
                    select.innerHTML = '<option value="">-- Select Mandir --</option>';
                    mandirs.forEach(m => {
                        const opt = document.createElement('option');
                        opt.value = m.mandir_id;
                        opt.textContent = m.mandir_name;
                        if (selectedValue && selectedValue == m.mandir_id) opt.selected = true;
                        select.appendChild(opt);
                    });
                });
        }

        function loadKshetra(zone_id, selectId, selectedValue = null) {
            fetch(`/common/getkshetraforgroupmaster?zone_id=${zone_id}`)
                .then(res => res.json())
                .then(kshetras => {
                    const select = document.getElementById(selectId);
                    select.innerHTML = '<option value="">-- Select Kshetra --</option>';
                    kshetras.forEach(k => {
                        const opt = document.createElement('option');
                        opt.value = k.kshetra_id;
                        opt.textContent = k.kshetra_name;
                        if (selectedValue && selectedValue == k.kshetra_id) opt.selected = true;
                        select.appendChild(opt);
                    });
                });
        }

        function fetchZoneCode(zone_id, callback = null) {
            fetch(`/common/getZoneCodes?zone_id=${zone_id}`)
                .then(res => res.json())
                .then(data => {
                    document.getElementById('zone_code').value = data.zone_code || '';
                    document.getElementById('zone_no').value = data.zone_no || '';
                    if (typeof callback === "function") callback();
                })

                .catch(err => console.error('Error fetching zone code:', err));
        }


        // --- Add Modal ---
        function openAddModal() {
            LoadZones('addZone');
            document.getElementById('addMandir').innerHTML = '<option value="">-- Select Mandir --</option>';
            document.getElementById('addkshetra').innerHTML = '<option value="">-- Select Kshetra --</option>';

            document.getElementById('addModal').style.display = 'block';
        }

        document.getElementById('addZone').addEventListener('change', function() {
            if (this.value) loadKshetra(this.value, 'addkshetra');
        });

        document.getElementById('addZone').addEventListener('change', function() {
            if (this.value) loadMandir(this.value, 'addMandir');
        });

        function closeAddModal() {
            document.getElementById('addModal').style.display = 'none';
        }

        document.getElementById('addForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const zone_id = document.getElementById('addZone').value;
            const mandir_id = document.getElementById('addMandir').value;
            const kshetra_id = document.getElementById('addkshetra').value;
            const zone_code = document.getElementById('zone_code').value;
            const zone_no = document.getElementById('zone_no').value;
            const group_name = document.getElementById('group_name').value;

            fetch('/GosthiGroup/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        zone_code,
                        zone_no,
                        zone_id,
                        mandir_id,
                        kshetra_id,
                        group_name,
                    })

                })

                .then(res => res.json())
                .then(result => {
                    closeAddModal();
                    LoadGosthiGroup();
                    window.location.reload(); // 🔄 refresh whole page

                });
        });


        // --- Delete ---
        function deleteGosthiType(id) {
            if (confirm("Are you sure you want to delete this Gosthi Master?")) {
                fetch(`/GosthiGroup/delete/${id}`, {
                        method: 'DELETE'
                    }) // keep POST if backend expects it
                    .then(res => res.json())
                    .then(result => {
                        alert(result.message);
                        LoadGosthiGroup();
                        window.location.reload(); // 🔄 refresh whole page

                    });
            }
        }

        // --- ✅ Open Update Modal ---
        function openUpdateModal(group) {
            const {
                group_id,
                zone_id,
                mandir_id,
                kshetra_id,
                zone_code,
                zone_no,
                group_name
            } = group;

            // Store group_id in hidden field
            document.getElementById('updateGroupId').value = group_id;

            // Load Zones first and select current
            LoadZones('updateZone', zone_id);

            // Load Mandir & preselect
            loadMandir(zone_id, 'updateMandir', mandir_id);

            // Load Kshetra & preselect
            loadKshetra(zone_id, 'updateKshetra', kshetra_id);

            // Fill text fields
            document.getElementById('updateZoneCode').value = zone_code || '';
            document.getElementById('updateZoneNo').value = zone_no || '';
            document.getElementById('updateGroupName').value = group_name || '';

            // Show modal
            document.getElementById('updateModal').style.display = 'block';
        }

        // ✅ Handle zone change in Update modal
        document.getElementById('updateZone').addEventListener('change', function() {
            if (this.value) {
                loadMandir(this.value, 'updateMandir');
                loadKshetra(this.value, 'updateKshetra');
                fetchUpdateZoneCode(this.value);
            }
        });

        // ✅ Fetch new zone code & number when zone is changed
        function fetchUpdateZoneCode(zone_id, callback = null) {
            fetch(`/common/getZoneCodes?zone_id=${zone_id}`)
                .then(res => res.json())
                .then(data => {
                    document.getElementById('updateZoneCode').value = data.zone_code || '';
                    document.getElementById('updateZoneNo').value = data.zone_no || '';
                    if (typeof callback === 'function') callback();
                })
                .catch(err => console.error('Error fetching zone code:', err));
        }

        // --- ✅ Submit Update Form ---
        document.getElementById('updateForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const group_id = document.getElementById('updateGroupId').value;
            const zone_id = document.getElementById('updateZone').value;
            const mandir_id = document.getElementById('updateMandir').value;
            const kshetra_id = document.getElementById('updateKshetra').value;
            const zone_code = document.getElementById('updateZoneCode').value;
            const zone_no = document.getElementById('updateZoneNo').value;
            const group_name = document.getElementById('updateGroupName').value;

            fetch(`/GosthiGroup/update/${group_id}`, {
                    method: 'POST', // keep POST if backend expects it
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        zone_code,
                        zone_no,
                        zone_id,
                        mandir_id,
                        kshetra_id,
                        group_name,
                    })
                })
                .then(res => res.json())
                .then(result => {
                    closeUpdateModal();
                    LoadGosthiGroup();
                    window.location.reload(); // optional hard reload
                });
        });

        // --- ✅ Close Update Modal ---
        function closeUpdateModal() {
            document.getElementById('updateModal').style.display = 'none';
        }

        // Initial load
        LoadGosthiGroup();
    