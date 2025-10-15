  // Fetch GosthiType list
    function loadGosthiTypes() {
      fetch('/gosthi_type/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('GosthiType-table-body');
          tableBody.innerHTML = '';
          data.forEach((GosthiType, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${GosthiType.gosthi_topic_type}</td>
              <td>${GosthiType.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${GosthiType.gosthi_topic_type_id}, '${GosthiType.gosthi_topic_type}')">Update</button>
                <button class="btn btn-delete" onclick="deleteGosthiType(${GosthiType.gosthi_topic_type_id})">Delete</button>
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
      const gosthi_topic_type = document.getElementById('addGosthiTypeName').value;

      fetch('/gosthi_type/addGosthiType', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gosthi_topic_type })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadGosthiTypes();
        window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Update Modal ---
    function openUpdateModal(id, name) {
      document.getElementById('updateGosthiTypeId').value = id;
      document.getElementById('updateGosthiTypeName').value = name;
      document.getElementById('updateModal').style.display = 'block';
    }
    function closeUpdateModal() {
      document.getElementById('updateModal').style.display = 'none';
    }
    document.getElementById('updateForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('updateGosthiTypeId').value;
      const gosthi_topic_type = document.getElementById('updateGosthiTypeName').value;

      fetch(`/gosthi_type/update/${id}`, {
        method: 'POST', // keep POST if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gosthi_topic_type })
      })
      .then(res => res.json())
      .then(result => {
        closeUpdateModal();
        loadGosthiTypes();
                window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Delete ---
    function deleteGosthiType(id) {
      if (confirm("Are you sure you want to delete this Gosthi Type?")) {
        fetch(`/gosthi_type/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadGosthiTypes();
                    window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadGosthiTypes();