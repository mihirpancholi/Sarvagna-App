  // Fetch mandir list
    function loadMandirs() {
      fetch('/mandir/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('mandir-table-body');
          tableBody.innerHTML = '';
          data.forEach((mandir, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${mandir.zone_name}</td>
              <td>${mandir.country_name}</td>
              <td>${mandir.mandir_type}</td>
              <td>${mandir.mandir_name}</td>
              <td>${mandir.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${mandir.mandir_id}, ${mandir.zone_id}, ${mandir.country_id}, '${mandir.mandir_type}', '${mandir.mandir_name}')">Update</button>
                <button class="btn btn-delete" onclick="deleteMandir(${mandir.mandir_id})">Delete</button>
              </td>
            `;
            tableBody.appendChild(row);
          });
        });
    }

        // Fetch country list
function loadCountries(selectId, selectedValue = null) {
  fetch('/country/list') // ✅ you must already have /country/list API
    .then(res => res.json())
    .then(countries => {
      const select = document.getElementById(selectId);
      select.innerHTML = '<option value="">-- Select Country --</option>';
      countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.country_id;
        option.textContent = country.country_name;
        if (selectedValue && selectedValue == country.country_id) {
          option.selected = true;
        }
        select.appendChild(option);
      });
    });
}

function loadZone(selectId, selectedValue = null) {
  fetch('/zone/list') // ✅ you must already have /country/list API
    .then(res => res.json())
    .then(zones => {
      const select = document.getElementById(selectId);
      select.innerHTML = '<option value="">-- Select Zone --</option>';
      zones.forEach(zone => {
        const option = document.createElement('option');
        option.value = zone.zone_id;
        option.textContent = zone.zone_name;
        if (selectedValue && selectedValue == zone.zone_id) {
          option.selected = true;
        }
        select.appendChild(option);
      });
    });
}

    // --- Add Modal ---
    function openAddModal() {
      loadCountries('addCountry'); 
      loadZone('addZone');
      document.getElementById('addModal').style.display = 'block';
    }
    function closeAddModal() {
      document.getElementById('addModal').style.display = 'none';
    }
    document.getElementById('addForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const mandir_name = document.getElementById('addMandirName').value;
      const country_id = document.getElementById('addCountry').value;
      const zone_id = document.getElementById('addZone').value;
      const mandir_type = document.querySelector('select[name="addMandirType"]').value;

      fetch('/mandir/addMandir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zone_id, country_id, mandir_type, mandir_name })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadMandirs();
                window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Update Modal ---
    function openUpdateModal(id, zone_id, country_id, mandir_type, mandir_name) {
  document.getElementById('updateMandirId').value = id;
  document.getElementById('updateMandirName').value = mandir_name;

  // Load dropdowns with selected values
  loadCountries('updateCountry', country_id);
  loadZone('updateZone', zone_id);

  // Set mandir type
  document.getElementById('updateMandirType').value = mandir_type;

  document.getElementById('updateModal').style.display = 'block';
}

    function closeUpdateModal() {
      document.getElementById('updateModal').style.display = 'none';
    }
    
    document.getElementById('updateForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('updateMandirId').value;
  const mandir_name = document.getElementById('updateMandirName').value;
  const zone_id = document.getElementById('updateZone').value;
  const country_id = document.getElementById('updateCountry').value;
  const mandir_type = document.getElementById('updateMandirType').value;

  fetch(`/mandir/update/${id}`, {
    method: 'POST', // or PUT if your backend expects
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mandir_name, zone_id, country_id, mandir_type })
  })
  .then(res => res.json())
  .then(result => {
    closeUpdateModal();
    loadMandirs();
    window.location.reload(); // 🔄 refresh
  });
});


    // --- Delete ---
    function deleteMandir(id) {
      if (confirm("Are you sure you want to delete this mandir?")) {
        fetch(`/mandir/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadMandirs();
                    window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadMandirs();