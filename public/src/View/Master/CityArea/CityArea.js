  // Load CityAreas
  function loadCityArea() {
    fetch('/CityArea/list')
      .then(res => res.json())
      .then(data => {
        const tableBody = document.getElementById('CityArea-table-body');
        tableBody.innerHTML = '';
        data.forEach((cityArea, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${cityArea.city_name || ''}</td>
            <td>${cityArea.area_name || ''}</td>
            <td>${cityArea.full_name || ''}</td>
            <td>
              <button class="btn btn-update" onclick="openUpdateModal(${cityArea.city_area_id})">
                Update
              </button>
              <button class="btn btn-delete" onclick="deleteCityArea(${cityArea.city_area_id})">
                Delete
              </button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      });
  }

  // Load cities for dropdown
  function loadCities(selectId, selectedId = null) {
    fetch('/City/list')
      .then(res => res.json())
      .then(data => {
        const select = document.getElementById(selectId);
        select.innerHTML = '<option value="">-- Select City --</option>';
        data.forEach(c => {
          const opt = document.createElement('option');
          opt.value = c.city_id;
          opt.textContent = c.city_name;
          if (selectedId && selectedId == c.city_id) opt.selected = true;
          select.appendChild(opt);
        });
      });
  }

  // --- Add Modal ---
  function openAddModal() {
    loadCities('addCity');
    document.getElementById('addModal').style.display = 'block';
  }
  function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
  }
  document.getElementById('addForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const area_name = document.getElementById('addCityAreaName').value;
    const city_id = document.getElementById('addCity').value;

    fetch('/CityArea/addCityArea', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ area_name, city_id })
    })
    .then(res => res.json())
    .then(result => {
      closeAddModal();
      loadCityArea();
          window.location.reload(); // 🔄 refresh whole page

    });
  });

  // --- Update Modal ---
  function openUpdateModal(id) {
    fetch(`/CityArea/${id}`)   // ✅ fetch record details from backend
      .then(res => res.json())
      .then(data => {
        document.getElementById('updateCityAreaId').value = data.city_area_id;
        document.getElementById('updateCityAreaName').value = data.area_name;
        loadCities('updateCity', data.city_id);  // ✅ auto-select correct city
        document.getElementById('updateModal').style.display = 'block';
      })
      .catch(err => console.error("Failed to load city area:", err));
  }
  function closeUpdateModal() {
    document.getElementById('updateModal').style.display = 'none';
  }
  document.getElementById('updateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('updateCityAreaId').value;
    const area_name = document.getElementById('updateCityAreaName').value;
    const city_id = document.getElementById('updateCity').value;

    fetch(`/CityArea/update/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city_id, area_name })
    })
    .then(res => res.json())
    .then(result => {
      closeUpdateModal();
      loadCityArea();
          window.location.reload(); // 🔄 refresh whole page

    });
  });

  // --- Delete ---
  function deleteCityArea(id) {
    if (confirm("Are you sure you want to delete this CityArea?")) {
      fetch(`/CityArea/delete/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(result => {
          alert(result.message);
          loadCityArea();
              window.location.reload(); // 🔄 refresh whole page

        });
    }
  }

  // Initial load
  loadCityArea();
