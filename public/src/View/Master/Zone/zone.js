    // Fetch zone list
    function loadZones() {
      fetch('/zone/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('zone-table-body');
          tableBody.innerHTML = '';
          data.forEach((zone, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${zone.zone_name}</td>
              <td>${zone.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${zone.zone_id}, '${zone.zone_name}')">Update</button>
                <button class="btn btn-delete" onclick="deleteZone(${zone.zone_id})">Delete</button>
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
      const zone_name = document.getElementById('addZoneName').value;

      fetch('/zone/addZone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zone_name })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadZones();
        // console.log(zone_name);
        window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Update Modal ---
    function openUpdateModal(id, name) {
      document.getElementById('updateZoneId').value = id;
      document.getElementById('updateZoneName').value = name;
      document.getElementById('updateModal').style.display = 'block';
    }
    function closeUpdateModal() {
      document.getElementById('updateModal').style.display = 'none';
    }
    document.getElementById('updateForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('updateZoneId').value;
      const zone_name = document.getElementById('updateZoneName').value;

      fetch(`/zone/update/${id}`, {
        method: 'POST', // keep POST if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zone_name })
      })
      .then(res => res.json())
      .then(result => {
        closeUpdateModal();
        loadZones();
                window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Delete ---
    function deleteZone(id) {
      if (confirm("Are you sure you want to delete this zone?")) {
        fetch(`/zone/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadZones();
                    window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadZones();
 