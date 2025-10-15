    // Fetch district list
    function loadDistrict() {
      fetch('/district/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('district-table-body');
          tableBody.innerHTML = '';
          data.forEach((district, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
  <td>${index + 1}</td>
  <td>${district.country_name}</td>
  <td>${district.state_name}</td>
   <td>${district.district_name}</td>
  <td>${district.full_name}</td>
  <td>
    <button class="btn btn-update" 
onclick="openUpdateModal(${district.district_id},  ${district.country_id}, ${district.state_id}, '${district.district_name}')">
      Update
    </button>
    <button class="btn btn-delete" onclick="deleteDistrict(${district.district_id})">Delete</button>
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

    // Fetch state list
function loadStates(country_id, selectId, selectedValue = null, callback = null) {
  fetch(`/common/getstatebyid?country_id=${country_id}`)
    .then(res => res.json())
    .then(states => {
      const select = document.getElementById(selectId);
      select.innerHTML = '<option value="">-- Select State --</option>';
      states.forEach(s => {
        const option = document.createElement('option');
        option.value = s.state_id;
        option.textContent = s.state_name;
        if (selectedValue && selectedValue == s.state_id) option.selected = true;
        select.appendChild(option);
      });

      if (callback) callback(); // ✅ call next step
    });
}

// Add Modal
document.getElementById('addCountry').addEventListener('change', function() {
  if (this.value) {
    loadStates(this.value, 'addState');   // ✅ correct order
  } else {
    document.getElementById('addState').innerHTML = '<option value="">-- Select State --</option>';
  }
});

// Update Modal
document.getElementById('updateCountry').addEventListener('change', function() {
  if (this.value) {
    loadStates(this.value, 'updateState');   // ✅ correct order
  } else {
    document.getElementById('updateState').innerHTML = '<option value="">-- Select State --</option>';
  }
});

// Add Modal → cascade states correctly
document.getElementById('addCountry').addEventListener('change', function() {
  if (this.value) {
    loadStates(this.value, 'addState');
  } else {
    document.getElementById('addState').innerHTML = '<option value="">-- Select State --</option>';
  }
});

// Update Modal → cascade states correctly
document.getElementById('updateCountry').addEventListener('change', function() {
  if (this.value) {
    loadStates(this.value, 'updateState');
  } else {
    document.getElementById('updateState').innerHTML = '<option value="">-- Select State --</option>';
  }
});

// Open Add Modal
function openAddModal() {
  loadCountries('addCountry');
  document.getElementById('addState').innerHTML = '<option value="">-- Select State --</option>'; 
  document.getElementById('addDistrictName').value = '';
  document.getElementById('addModal').style.display = 'block';
}

// Open Update Modal
function openUpdateModal(id, country_id, state_id, district_name) {
  document.getElementById('updateDistrictId').value = id;
  document.getElementById('updateDistrictName').value = district_name;

  loadCountries('updateCountry', country_id, () => {
    loadStates(country_id, 'updateState', state_id);
  });

  document.getElementById('updateModal').style.display = 'block';
}

// Add Modal
document.getElementById('addCountry').addEventListener('change', function() {
  loadStates('addState', null, this.value);
});

// Update Modal
document.getElementById('updateCountry').addEventListener('change', function() {
  loadStates('updateState', null, this.value);
});


    // --- Add Modal ---
function openAddModal() {
  loadCountries('addCountry');
  loadStates('addState'); // will reload once country is picked
  document.getElementById('addModal').style.display = 'block';
}
    function closeAddModal() {
      document.getElementById('addModal').style.display = 'none';
    }
    document.getElementById('addForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const state_id = document.getElementById('addState').value;
      const district_name = document.getElementById('addDistrictName').value;
      const country_id = document.getElementById('addCountry').value;


      fetch('/district/addDistrict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state_id, country_id, district_name })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadDistrict();
        window.location.reload(); // 🔄 refresh whole page
      });
    });

// Open edit modal
function openUpdateModal(id, country_id, state_id, district_name) {
  document.getElementById('updateDistrictId').value = id;
  document.getElementById('updateDistrictName').value = district_name;

  loadCountries('updateCountry', country_id); 
  loadStates('updateState', state_id);        

  document.getElementById('updateModal').style.display = 'block';
}

    function closeUpdateModal() {
      document.getElementById('updateModal').style.display = 'none';
    }
    
    document.getElementById('updateForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('updateDistrictId').value;
      const state_id = document.getElementById('updateState').value;
      const country_id = document.getElementById('updateCountry').value;
      const district_name = document.getElementById('updateDistrictName').value;

      fetch(`/district/update/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state_id, country_id, district_name })
      })
      .then(res => res.json())
      .then(result => {
        closeUpdateModal();
        loadDistrict();
        window.location.reload();
      });
    });

    // --- Delete ---
    function deleteDistrict(id) {
      if (confirm("Are you sure you want to delete this district?")) {
        fetch(`/district/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadDistrict();
            window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadDistrict();
