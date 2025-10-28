 // Fetch country list
    function loadMaritalStatus() {
      fetch('/marital_status/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('country-table-body');
          tableBody.innerHTML = '';
          data.forEach((maritalStatus, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${maritalStatus.marital_status_name}</td>
              <td>${maritalStatus.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${maritalStatus.marital_status_id}, '${maritalStatus.marital_status_name}')">Update</button>
                <button class="btn btn-delete" onclick="deleteMaritalStatus(${maritalStatus.marital_status_id})">Delete</button>
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
      const marital_status_name = document.getElementById('addMaritalStatusName').value;

      fetch('/marital_status/addMaritalStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marital_status_name })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadMaritalStatus();
        window.location.reload(); // 🔄 refresh whole page
      });
    });

    // --- Update Modal ---
    function openUpdateModal(id, marital_status_name) {
      document.getElementById('updateMaritalStatusId').value = id;
      document.getElementById('updateMaritalStatusName').value = marital_status_name;
      document.getElementById('updateModal').style.display = 'block';
    }
    function closeUpdateModal() {
      document.getElementById('updateModal').style.display = 'none';
    }
    
    document.getElementById('updateForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('updateMaritalStatusId').value;
      const marital_status_name = document.getElementById('updateMaritalStatusName').value;

      fetch(`/marital_status/update/${id}`, {
        method: 'POST', // keep POST if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marital_status_name })
      })
      .then(res => res.json())
      .then(result => {
        closeUpdateModal();
        loadMaritalStatus();
        window.location.reload(); // 🔄 refresh whole page
      });
    });

    // --- Delete ---
    function deleteMaritalStatus(id) {
      if (confirm("Are you sure you want to delete this marital status?")) {
        fetch(`/marital_status/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadMaritalStatus();
            window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadMaritalStatus();