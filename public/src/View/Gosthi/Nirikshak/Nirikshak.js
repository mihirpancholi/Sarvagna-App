           // Fetch Nirikshak list
            function LoadNirikshak() {
                fetch('/Nirikshak/list')
                    .then(res => res.json())
                    .then(data => {
                        const tableBody = document.getElementById('Nirikshak-table-body');
                        tableBody.innerHTML = '';
                        data.forEach((Nirikshak, index) => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${Nirikshak.zone_name || ''}</td>
                <td>${Nirikshak.talim_year} - ${Nirikshak.talim_batch}</td>
                <td>${Nirikshak.ytk_id} - ${Nirikshak.nirikshak_name}</td>
                <td>${Nirikshak.group_code} - ${Nirikshak.group_name}</td>
                <td>${Nirikshak.created_by_name} </td>
                <td>
                    <button class="btn btn-update" onclick='openUpdateModal(${JSON.stringify(Nirikshak)})'>Update</button>
                    <button class="btn btn-delete" onclick="deleteNirikshak(${Nirikshak.nirikshak_id})">Delete</button>
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

            // Load Talim Batch dropdown
            function loadTalimBatch(selectId, selectedValue = null) {
                fetch('/talim_batch/list')
                    .then(res => res.json())
                    .then(batches => {
                        const select = document.getElementById(selectId);
                        select.innerHTML = '<option value="">-- Select Batch --</option>';

                        batches.forEach(batch => {
                            const option = document.createElement('option');
                            option.value = batch.talim_batch_id;
                            option.textContent = `${batch.talim_year} - ${batch.talim_batch}`;
                            if (selectedValue && selectedValue == batch.talim_batch_id) {
                                option.selected = true;
                            }
                            select.appendChild(option);
                        });
                    })
                    .catch(err => console.error("Error loading Talim Batch:", err));
            }


            // ✅ When Talim Batch changes → update Sevak list
            document.getElementById('talim_batch_id').addEventListener('change', function() {
                const batchId = this.value;
                getSevakByBatch(batchId, 'sevak_id');
            });

            // ✅ Fetch sevak list by batch
            function getSevakByBatch(talim_batch_id, selectId, selectedValue = null, callback = null) {
                const select = document.getElementById(selectId);

                if (!talim_batch_id) {
                    select.innerHTML = '<option value="">-- Select Sevak --</option>';
                    return;
                }

                fetch(`/common/getSevakByBatch?batch_id=${talim_batch_id}`)
                    .then(res => res.json())
                    .then(sevaks => {
                        select.innerHTML = '<option value="">-- Select Sevak --</option>';
                        sevaks.forEach(s => {
                            const option = document.createElement('option');
                            option.value = s.sevak_id;
                            option.textContent = `${s.first_name} ${s.last_name}`;
                            if (selectedValue && selectedValue == s.sevak_id) {
                                option.selected = true;
                            }
                            select.appendChild(option);
                        });

                        if (typeof callback === 'function') callback();
                    })
                    .catch(err => console.error("Error loading Sevaks:", err));
            }

            function getGroupGosthi(zone_id, selectId, selectedValue = null, callback = null) {
                const select = document.getElementById(selectId);

                if (!zone_id) {
                    select.innerHTML = '<option value="">-- Select Group --</option>';
                    return;
                }

                fetch(`/common/getGroupForGhosthi?zone_id=${zone_id}`)
                    .then(res => res.json())
                    .then(Groups => {
                        select.innerHTML = '<option value="">-- Select Group --</option>';
                        Groups.forEach(g => {
                            const option = document.createElement('option');
                            option.value = g.group_id;
                            option.textContent = `${g.group_code} ${g.group_name}`;
                            if (selectedValue && selectedValue == g.group_id) {
                                option.selected = true;
                            }
                            select.appendChild(option);
                        });

                        if (typeof callback === 'function') callback();
                    })
                    .catch(err => console.error("Error loading Group:", err));
            }

            document.getElementById('zone_id').addEventListener('change', function() {
                const zone_id = this.value;
                getGroupGosthi(zone_id, 'group_id');
            });


            // --- Add Modal ---
            function openAddModal() {
                LoadZones('zone_id');
                loadTalimBatch('talim_batch_id');
                document.getElementById('addModal').style.display = 'block';
            }


            function closeAddModal() {
                document.getElementById('addModal').style.display = 'none';
            }

            document.getElementById('addForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const zone_id = document.getElementById('zone_id').value;
                const talim_batch_id = document.getElementById('talim_batch_id').value;
                const sevak_id = document.getElementById('sevak_id').value;
                const group_id = document.getElementById('group_id').value;

                fetch('/Nirikshak/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            zone_id,
                            talim_batch_id,
                            sevak_id,
                            group_id,
                        })

                    })


                    .then(res => res.json())
                    .then(result => {
                        closeAddModal();
                        LoadNirikshak();
                        window.location.reload(); // 🔄 refresh whole page

                    });
            });


            // ✅ Open Update Modal with prefilled data
            function openUpdateModal(data) {
                if (typeof data === 'string') {
                    data = JSON.parse(data);
                }

                document.getElementById('update_nirikshak_id').value = data.nirikshak_id;

                // Load dropdowns with selected values prefilled
                LoadZones('update_zone_id', data.zone_id);
                loadTalimBatch('update_talim_batch_id', data.talim_batch_id);

                // First load Sevak dropdown based on batch
                getSevakByBatch(data.talim_batch_id, 'update_sevak_id', data.sevak_id);

                // Load group based on zone
                getGroupGosthi(data.zone_id, 'update_group_id', data.group_id);

                document.getElementById('updateModal').style.display = 'block';
            }


            // ✅ Close Update Modal
            function closeUpdateModal() {
                document.getElementById('updateModal').style.display = 'none';
            }

            // ✅ When Talim Batch changes in UPDATE → reload sevak list
            document.getElementById('update_talim_batch_id').addEventListener('change', function() {
                const batchId = this.value;
                getSevakByBatch(batchId, 'update_sevak_id');
            });

            // ✅ When Zone changes in UPDATE → reload group list
            document.getElementById('update_zone_id').addEventListener('change', function() {
                const zone_id = this.value;
                getGroupGosthi(zone_id, 'update_group_id');
            });

            // ✅ Handle Update Form submit
            document.getElementById('updateForm').addEventListener('submit', function(e) {
                e.preventDefault();

                const nirikshak_id = document.getElementById('update_nirikshak_id').value;
                const zone_id = document.getElementById('update_zone_id').value;
                const talim_batch_id = document.getElementById('update_talim_batch_id').value;
                const sevak_id = document.getElementById('update_sevak_id').value;
                const group_id = document.getElementById('update_group_id').value;

                fetch(`/Nirikshak/update/${nirikshak_id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            zone_id,
                            talim_batch_id,
                            sevak_id,
                            group_id
                        })
                    })
                    .then(res => res.json())
                    .then(result => {
                        closeUpdateModal();
                        LoadNirikshak();
                        window.location.reload(); // 🔄 refresh whole page

                    })
                    .catch(err => console.error("Error updating Nirikshak:", err));
            });


            function deleteNirikshak(id) {
                if (!confirm("Are you sure you want to delete this Nirikshak?")) return;

                fetch(`/Nirikshak/delete/${id}`, {
                        method: 'DELETE'
                    })
                    .then(res => res.json())
                    .then(result => {
                        alert(result.message);
                        LoadNirikshak();
                        window.location.reload();
                    })
                    .catch(err => console.error("Error deleting Nirikshak:", err));
            }


            // Initial load
            LoadNirikshak();