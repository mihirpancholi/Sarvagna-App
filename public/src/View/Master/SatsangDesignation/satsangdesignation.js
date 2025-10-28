 // Fetch Satsang Designation list
        function loadSatsangDesignation() {
            fetch('/satsang_designation/list')
                .then(res => res.json())
                .then(data => {
                    const tableBody = document.getElementById('country-table-body');
                    tableBody.innerHTML = '';
                    data.forEach((row, index) => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
              <td>${index + 1}</td>
              <td>${row.satsang_designation_name}</td>
              <td>${row.satsang_activity_name || '-'}</td>
              <td>${row.full_name || '-'}</td>
              <td>
                <button class="btn btn-update" 
                  onclick="openUpdateModal(${row.satsang_designation_id}, '${row.satsang_designation_name}', ${row.satsang_activity_id})">Update</button>
                <button class="btn btn-delete" onclick="deleteSatsangDesignation(${row.satsang_designation_id})">Delete</button>
              </td>
            `;
                        tableBody.appendChild(tr);
                    });
                });
        }

        // Load Satsang Activity dropdown
        function loadSatsangActivity(selectId, selectedValue = null) {
            fetch('/satsang_activity/list')
                .then(res => res.json())
                .then(satsangActivities => {
                    const select = document.getElementById(selectId);
                    select.innerHTML = '<option value="">-- Select Satsang Activity --</option>';
                    satsangActivities.forEach(activity => {
                        const option = document.createElement('option');
                        option.value = activity.satsang_activity_id;
                        option.textContent = activity.satsang_activity_name;
                        if (selectedValue && selectedValue == activity.satsang_activity_id) {
                            option.selected = true;
                        }
                        select.appendChild(option);
                    });
                });
        }

        // --- Add Modal ---
        function openAddModal() {
            loadSatsangActivity('addSatsangActivity');
            document.getElementById('addModal').style.display = 'block';
        }

        function closeAddModal() {
            document.getElementById('addModal').style.display = 'none';
        }
        document.getElementById('addForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const satsang_designation_name = document.getElementById('SatsangDesignationName').value;
            const satsang_activity_id = document.getElementById('addSatsangActivity').value;

            fetch('/satsang_designation/addSatsangDesignation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        satsang_designation_name,
                        satsang_activity_id
                    })
                })
                .then(res => res.json())
                .then(() => {
                    closeAddModal();
                    loadSatsangDesignation();
                    window.location.reload(); // 🔄 refresh whole page

                });
        });

        // --- Update Modal ---
        function openUpdateModal(id, satsang_designation_name, satsang_activity_id) {
            document.getElementById('updateSatsangDesignationId').value = id;
            document.getElementById('updateSatsangDesignationName').value = satsang_designation_name;

            // Load activity dropdown with pre-selected value
            loadSatsangActivity('updateSatsangActivity', satsang_activity_id);

            document.getElementById('updateModal').style.display = 'block';
        }

        function closeUpdateModal() {
            document.getElementById('updateModal').style.display = 'none';
        }

        document.getElementById('updateForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('updateSatsangDesignationId').value;
            const satsang_designation_name = document.getElementById('updateSatsangDesignationName').value;
            const satsang_activity_id = document.getElementById('updateSatsangActivity').value;

            fetch(`/satsang_designation/update/${id}`, {
                    method: 'POST', // use PUT if your backend supports
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        satsang_designation_name,
                        satsang_activity_id
                    })
                })
                .then(res => res.json())
                .then(() => {
                    closeUpdateModal();
                    loadSatsangDesignation();
                    window.location.reload(); // 🔄 refresh whole page

                });
        });

        // --- Delete ---
        function deleteSatsangDesignation(id) {
            if (confirm("Are you sure you want to delete this Satsang Designation?")) {
                fetch(`/satsang_designation/delete/${id}`, {
                        method: 'DELETE'
                    })
                    .then(res => res.json())
                    .then(result => {
                        alert(result.message);
                        loadSatsangDesignation();
                        window.location.reload(); // 🔄 refresh whole page

                    });
            }
        }

        // Initial load
        loadSatsangDesignation();