   // Fetch country list
        function loadSatsangActivity() {
            fetch('/satsang_activity/list')
                .then(res => res.json())
                .then(data => {
                    const tableBody = document.getElementById('country-table-body');
                    tableBody.innerHTML = '';
                    data.forEach((SatsangActivity, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
              <td>${index + 1}</td>
              <td>${SatsangActivity.satsang_activity_name}</td>
              <td>${SatsangActivity.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${SatsangActivity.satsang_activity_id}, '${SatsangActivity.satsang_activity_name}')">Update</button>
                <button class="btn btn-delete" onclick="deleteSatsangActivity(${SatsangActivity.satsang_activity_id})">Delete</button>
              </td>
            `;
                        tableBody.appendChild(row);

                    });
                });
        }

        // --- Add Modal ---
        function openAddModal() {
            document.getElementById('addModal').style.display = 'block';
        }

        function closeAddModal() {
            document.getElementById('addModal').style.display = 'none';
        }
        document.getElementById('addForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const satsang_activity_name = document.getElementById('addSatsangActivityName').value;

            fetch('/satsang_activity/addSatsangActivity', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        satsang_activity_name
                    })
                })
                .then(res => res.json())
                .then(result => {
                    closeAddModal();
                    loadSatsangActivity();
                    window.location.reload(); // 🔄 refresh whole page
                });
        });

        // --- Update Modal ---
        function openUpdateModal(id, SatsangActivity) {
            document.getElementById('updateSatsangActivityId').value = id;
            document.getElementById('updateSatsangActivityName').value = SatsangActivity;
            document.getElementById('updateModal').style.display = 'block';
        }

        function closeUpdateModal() {
            document.getElementById('updateModal').style.display = 'none';
        }

        document.getElementById('updateForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('updateSatsangActivityId').value;
            const SatsangActivity = document.getElementById('updateSatsangActivityName').value;

            fetch(`/satsang_activity/update/${id}`, {
                    method: 'POST', // keep POST if your backend expects it
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        SatsangActivity
                    })
                })
                .then(res => res.json())
                .then(result => {
                    closeUpdateModal();
                    loadSatsangActivity();
                    window.location.reload(); // 🔄 refresh whole page
                });
        });

        // --- Delete ---
        function deleteSatsangActivity(id) {
            if (confirm("Are you sure you want to delete this Satsang Activity?")) {
                fetch(`/satsang_activity/delete/${id}`, {
                        method: 'DELETE'
                    }) // keep POST if backend expects it
                    .then(res => res.json())
                    .then(result => {
                        alert(result.message);
                        loadSatsangActivity();
                        window.location.reload(); // 🔄 refresh whole page

                    });
            }
        }

        // Initial load
        loadSatsangActivity();