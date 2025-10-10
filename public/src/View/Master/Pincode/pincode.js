 // Load Pincodes
  function loadPincode() {
    fetch('/pincode/list')
      .then(res => res.json())
      .then(data => {
        const tableBody = document.getElementById('Pincode-table-body');
        tableBody.innerHTML = '';
        data.forEach((cityArea, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${cityArea.city_name || ''}</td>
            <td>${cityArea.pincode || ''}</td>
            <td>${cityArea.full_name || ''}</td>
            <td>
              <button class="btn btn-update" onclick="openUpdateModal('${cityArea.pin_id}','${cityArea.city_id}','${cityArea.pincode}')">
                Update
              </button>
              <button class="btn btn-delete" onclick="deletePincode(${cityArea.pin_id})">
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
    const pincode = document.getElementById('addPincodeName').value;
    const city_id = document.getElementById('addCity').value;

    fetch('/pincode/addPincode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pincode, city_id })
    })
    .then(res => res.json())
    .then(result => {
      closeAddModal();
      loadPincode();
          window.location.reload(); // 🔄 refresh whole page

    });
  });

  // --- Update Modal ---
  function openUpdateModal(id) {
    fetch(`/pincode/${id}`)   // ✅ fetch record details from backend
      .then(res => res.json())
      .then(data => {
        document.getElementById('updatePincodeId').value = data.pin_id;
        document.getElementById('updatePincodeName').value = data.pincode;
        loadCities('updateCity', data.city_id);  // ✅ auto-select correct city
        document.getElementById('updateModal').style.display = 'block';
      })
      .catch(err => console.error("Failed to load pincode:", err));
  }
  function closeUpdateModal() {
    document.getElementById('updateModal').style.display = 'none';
  }
  document.getElementById('updateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('updatePincodeId').value;
    const pincode = document.getElementById('updatePincodeName').value;
    const city_id = document.getElementById('updateCity').value;

    fetch(`/pincode/update/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city_id, pincode })
    })
    .then(res => res.json())
    .then(result => {
      closeUpdateModal();
      loadPincode();
          window.location.reload(); // 🔄 refresh whole page

    });
  });

  // --- Delete ---
  function deletePincode(id) {
    if (confirm("Are you sure you want to delete this Pincode?")) {
      fetch(`/pincode/delete/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(result => {
          alert(result.message);
          loadPincode();
              window.location.reload(); // 🔄 refresh whole page

        });
    }
  }

  // Initial load
  loadPincode();