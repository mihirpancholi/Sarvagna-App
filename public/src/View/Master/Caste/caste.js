        // Fetch caste list
        function loadCastes() {
            fetch('/caste/list')
                .then(res => res.json())
                .then(data => {
                    const tableBody = document.getElementById('caste-table-body');
                    tableBody.innerHTML = '';
                    data.forEach((caste, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
              <td>${index + 1}</td>
              <td>${caste.caste_name}</td>
              <td>${caste.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${caste.caste_id}, '${caste.caste_name}')">Update</button>
                <button class="btn btn-delete" onclick="deleteCaste(${caste.caste_id})">Delete</button>
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
            const caste_name = document.getElementById('addCasteName').value;

            fetch('/caste/addCaste', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        caste_name
                    })
                })
                .then(res => res.json())
                .then(result => {
                    closeAddModal();
                    loadCastes();
                    window.location.reload(); // 🔄 refresh whole page

                });
        });

        // --- Update Modal ---
        function openUpdateModal(id, name) {
            document.getElementById('updateCasteId').value = id;
            document.getElementById('updateCasteName').value = name;
            document.getElementById('updateModal').style.display = 'block';
        }

        function closeUpdateModal() {
            document.getElementById('updateModal').style.display = 'none';
        }
        document.getElementById('updateForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('updateCasteId').value;
            const caste_name = document.getElementById('updateCasteName').value;

            fetch(`/caste/update/${id}`, {
                    method: 'POST', // keep POST if your backend expects it
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        caste_name
                    })
                })
                .then(res => res.json())
                .then(result => {
                    closeUpdateModal();
                    loadCastes();
                    window.location.reload(); // 🔄 refresh whole page

                });
        });

        // --- Delete ---
        function deleteCaste(id) {
            if (confirm("Are you sure you want to delete this caste?")) {
                fetch(`/caste/delete/${id}`, {
                        method: 'DELETE'
                    }) // keep POST if backend expects it
                    .then(res => res.json())
                    .then(result => {
                        alert(result.message);
                        loadCastes();
                        window.location.reload(); // 🔄 refresh whole page

                    });
            }
        }

        // Initial load
        loadCastes();
   