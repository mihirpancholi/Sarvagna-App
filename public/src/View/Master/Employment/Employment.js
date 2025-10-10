 // Fetch employment list
    function loadEmployment() {
      fetch('/employment/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('employment-table-body');
          tableBody.innerHTML = '';
          data.forEach((employment, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${employment.employment_name}</td>
              <td>${employment.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${employment.employment_id}, '${employment.employment_name}')">Update</button>
                <button class="btn btn-delete" onclick="deleteEmployment(${employment.employment_id})">Delete</button>
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
      const employment_name = document.getElementById('addEmploymentName').value;

      fetch('/employment/addEmployment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employment_name })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadEmployment();
        window.location.reload(); // 🔄 refresh whole page
      });
    });

    // --- Update Modal ---
    function openUpdateModal(id, employment_name) {
      document.getElementById('updateEmploymentId').value = id;
      document.getElementById('updateEmploymentName').value = employment_name;
      document.getElementById('updateModal').style.display = 'block';
    }
    function closeUpdateModal() {
      document.getElementById('updateModal').style.display = 'none';
    }
    
    document.getElementById('updateForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('updateEmploymentId').value;
      const employment_name = document.getElementById('updateEmploymentName').value;

      fetch(`/employment/update/${id}`, {
        method: 'POST', // keep POST if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employment_name })
      })
      .then(res => res.json())
      .then(result => {
        closeUpdateModal();
        loadEmployment();
        window.location.reload(); // 🔄 refresh whole page
      });
    });

    // --- Delete ---
    function deleteEmployment(id) {
      if (confirm("Are you sure you want to delete this employment?")) {
        fetch(`/employment/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadEmployment();
            window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadEmployment();