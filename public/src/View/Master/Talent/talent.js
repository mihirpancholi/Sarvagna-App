 // Fetch talent list
    function loadTalents() {
      fetch('/talent/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('talent-table-body');
          tableBody.innerHTML = '';
          data.forEach((talent, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${talent.talent_name}</td>
              <td>${talent.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${talent.talent_id}, '${talent.talent_name}')">Update</button>
                <button class="btn btn-delete" onclick="deleteTalent(${talent.talent_id})">Delete</button>
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
      const talent_name = document.getElementById('addTalentName').value;

      fetch('/talent/addTalent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ talent_name })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadTalents();
        window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Update Modal ---
    function openUpdateModal(id, name) {
      document.getElementById('updateTalentId').value = id;
      document.getElementById('updateTalentName').value = name;
      document.getElementById('updateModal').style.display = 'block';
    }
    function closeUpdateModal() {
      document.getElementById('updateModal').style.display = 'none';
    }
    document.getElementById('updateForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('updateTalentId').value;
      const talent_name = document.getElementById('updateTalentName').value;

      fetch(`/talent/update/${id}`, {
        method: 'POST', // keep POST if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ talent_name })
      })
      .then(res => res.json())
      .then(result => {
        closeUpdateModal();
        loadTalents();
                window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Delete ---
    function deleteTalent(id) {
      if (confirm("Are you sure you want to delete this talent?")) {
        fetch(`/talent/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadTalents();
                    window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadTalents();