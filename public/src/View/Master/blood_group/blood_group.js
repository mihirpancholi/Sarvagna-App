    // Fetch blood group list
    function loadBloodGroups() {
      fetch('/blood_group/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('blood-group-table-body');
          tableBody.innerHTML = '';
          data.forEach((blood_group, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${blood_group.blood_group_name}</td>
              <td>${blood_group.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${blood_group.id}, '${blood_group.blood_group_name}')">Update</button>
                <button class="btn btn-delete" onclick="deleteBloodGroup(${blood_group.id})">Delete</button>
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
      const blood_group_name = document.getElementById('blood_group_name').value;

      fetch('/blood_group/addBloodGroup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blood_group_name })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadBloodGroups();
                window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Update Modal ---
    function openUpdateModal(id, name) {
      document.getElementById('updateBloodGroupId').value = id;
      document.getElementById('updateBloodGroupName').value = name;
      document.getElementById('updateModal').style.display = 'block';
    }
    function closeUpdateModal() {
      document.getElementById('updateModal').style.display = 'none';
    }
    document.getElementById('updateForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('updateBloodGroupId').value;
      const blood_group_name = document.getElementById('updateBloodGroupName').value;

      fetch(`/blood_group/update/${id}`, {
        method: 'POST', // keep POST if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blood_group_name })
      })
      .then(res => res.json())
      .then(result => {
        closeUpdateModal();
        loadBloodGroups();
                window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Delete ---
    function deleteBloodGroup(id) {
      if (confirm("Are you sure you want to delete this blood group?")) {
        fetch(`/blood_group/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadBloodGroups();
                    window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadBloodGroups();
