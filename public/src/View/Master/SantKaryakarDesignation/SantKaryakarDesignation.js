  // Fetch Sant Karyakar Designation list
        function loadSantKaryakarDesignation() {
            fetch('/sant_karyakar_designation/list')
                .then(res => res.json())
                .then(data => {
                    const tableBody = document.getElementById('blood-group-table-body');
                    tableBody.innerHTML = '';
                    data.forEach((santkaryakar, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
              <td>${index + 1}</td>
  <td>${santkaryakar.type === 'S' ? 'Sant' : santkaryakar.type === 'K' ? 'Karyakar' : ''}</td>
              <td>${santkaryakar.designation}</td>
              <td>${santkaryakar.full_name}</td>
              <td>
  <button class="btn btn-update" 
      onclick="openUpdateModal(
        ${santkaryakar.sant_karyakar_designation_id}, 
        '${santkaryakar.type}', 
        '${santkaryakar.designation}'
      )">Update</button>
                <button class="btn btn-delete" onclick="deleteSantKaryakarDesignation(${santkaryakar.sant_karyakar_designation_id})">Delete</button>
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
            const type = document.querySelector('input[name="type"]:checked').value;
            const designation = document.getElementById('adddesignation').value;

            fetch('/sant_karyakar_designation/addSantKaryakarDesignation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type,
                        designation
                    })
                })
                .then(res => res.json())
                .then(result => {
                    closeAddModal();
                    loadSantKaryakarDesignation();
                    window.location.reload(); // 🔄 refresh whole page

                });
        });

        // --- Update Modal ---
        function openUpdateModal(id, type, designation) {
            document.getElementById('updateSantKaryakarDesignationid').value = id;
            document.querySelector(`input[name="updateType"][value="${type}"]`).checked = true;
            document.getElementById('updateDesignation').value = designation;
            document.getElementById('updateModal').style.display = 'block';
        }

        function closeUpdateModal() {
            document.getElementById('updateModal').style.display = 'none';
        }
        document.getElementById('updateForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('updateSantKaryakarDesignationid').value;
            const type = document.querySelector('input[name="updateType"]:checked').value;
            const designation = document.getElementById('updateDesignation').value;

            fetch(`/sant_karyakar_designation/update/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type,
                        designation
                    })
                })
                .then(res => res.json())
                .then(result => {
                    closeUpdateModal();
                    loadSantKaryakarDesignation();
                });
        });


        // --- Delete ---
        function deleteSantKaryakarDesignation(id) {
            if (confirm("Are you sure you want to delete this Sant Karyakar Designation?")) {
                fetch(`/sant_karyakar_designation/delete/${id}`, {
                        method: 'DELETE'
                    }) // keep POST if backend expects it
                    .then(res => res.json())
                    .then(result => {
                        alert(result.message);
                        loadSantKaryakarDesignation();
                        window.location.reload(); // 🔄 refresh whole page

                    });
            }
        }

        // Initial load
        loadSantKaryakarDesignation();