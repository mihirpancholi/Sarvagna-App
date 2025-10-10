    // Fetch country list
    function loadDegree() {
      fetch('/degree/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('country-table-body');
          tableBody.innerHTML = '';
          data.forEach((degree, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${degree.degree}</td>
              <td>${degree.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${degree.degree_id}, '${degree.degree}')">Update</button>
                <button class="btn btn-delete" onclick="deleteDegree(${degree.degree_id})">Delete</button>
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
      const degree = document.getElementById('addDegreeName').value;

      fetch('/degree/addDegree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ degree })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadDegree();
        window.location.reload(); // 🔄 refresh whole page
      });
    });

    // --- Update Modal ---
    function openUpdateModal(id, degree) {
      document.getElementById('updateDegreeId').value = id;
      document.getElementById('updateDegreeName').value = degree;
      document.getElementById('updateModal').style.display = 'block';
    }
    function closeUpdateModal() {
      document.getElementById('updateModal').style.display = 'none';
    }
    
    document.getElementById('updateForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('updateDegreeId').value;
      const degree = document.getElementById('updateDegreeName').value;

      fetch(`/degree/update/${id}`, {
        method: 'POST', // keep POST if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ degree })
      })
      .then(res => res.json())
      .then(result => {
        closeUpdateModal();
        loadDegree();
        window.location.reload(); // 🔄 refresh whole page
      });
    });

    // --- Delete ---
    function deleteDegree(id) {
      if (confirm("Are you sure you want to delete this degree?")) {
        fetch(`/degree/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadDegree();
            window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadDegree();
