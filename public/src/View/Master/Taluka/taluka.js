// Load Taluka table
function loadTaluka() {
  fetch('/taluka/list')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('taluka-table-body');
      tbody.innerHTML = '';
      data.forEach((taluka, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${index+1}</td>
                    <td>${taluka.taluka_name}</td>
                              <td>${taluka.district_name}</td>

          <td>${taluka.state_name}</td>

          <td>${taluka.country_name}</td>
          <td>
            <button class="btn btn-update" onclick="openUpdateModal(${taluka.taluka_id}, ${taluka.country_id}, ${taluka.state_id}, ${taluka.district_id}, '${taluka.taluka_name}')">Update</button>
            <button class="btn btn-delete" onclick="deleteTaluka(${taluka.taluka_id})">Delete</button>
          </td>`;
        tbody.appendChild(tr);
      });
    });
}

// Load countries
function loadCountries(selectId, selectedValue = null, callback = null) {
  fetch('/country/list')
    .then(res => res.json())
    .then(countries => {
      const select = document.getElementById(selectId);
      select.innerHTML = '<option value="">-- Select Country --</option>';
      countries.forEach(c => {
        const option = document.createElement('option');
        option.value = c.country_id;
        option.textContent = c.country_name;
        if (selectedValue && selectedValue == c.country_id) option.selected = true;
        select.appendChild(option);
      });
      if (callback) callback();
    });
}


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

function loadDistricts(state_id, selectId, selectedValue = null, callback = null) {
  fetch(`/common/getdistrictbyid?state_id=${state_id}`)
    .then(res => res.json())
    .then(districts => {
      const select = document.getElementById(selectId);
      select.innerHTML = '<option value="">-- Select District --</option>';
      districts.forEach(d => {
        const option = document.createElement('option');
        option.value = d.district_id;
        option.textContent = d.district_name;
        if (selectedValue && selectedValue == d.district_id) option.selected = true;
        select.appendChild(option);
      });
      if (callback) callback(); // ✅ optional chaining
    });
}



    

// Add Modal
function openAddModal() {
  document.getElementById('addTalukaName').value = '';
  loadCountries('addCountry');
  document.getElementById('addStateName').innerHTML = '<option value="">-- Select State --</option>';
  document.getElementById('addDistrictName').innerHTML = '<option value="">-- Select District --</option>';
  document.getElementById('addModal').style.display = 'block';
}
function closeAddModal() { document.getElementById('addModal').style.display = 'none'; }

// Update Modal
function openUpdateModal(taluka_id, country_id, state_id, district_id, taluka_name) {
  document.getElementById('updateTalukaId').value = taluka_id;
  document.getElementById('updateTalukaName').value = taluka_name;

  loadCountries('updateCountry', country_id, () => {
    loadStates(country_id, 'updateStateName', state_id, () => {
      loadDistricts(state_id, 'updateDistrictName', district_id);
    });
  });

  document.getElementById('updateModal').style.display = 'block';
}

function closeUpdateModal() { document.getElementById('updateModal').style.display = 'none'; }

// Add cascading functionality
document.addEventListener('DOMContentLoaded', () => {
  const addCountry = document.getElementById('addCountry');
  const addState = document.getElementById('addStateName');
  const addDistrict = document.getElementById('addDistrictName');

  addCountry.addEventListener('change', () => {
    addState.innerHTML = '<option value="">-- Select State --</option>';
    addDistrict.innerHTML = '<option value="">-- Select District --</option>';
    if (addCountry.value) loadStates(addCountry.value, 'addStateName');
  });

  addState.addEventListener('change', () => {
    addDistrict.innerHTML = '<option value="">-- Select District --</option>';
    if (addState.value) loadDistricts(addState.value, 'addDistrictName');
  });

  // Update modal cascading
  const updateCountry = document.getElementById('updateCountry');
  const updateState = document.getElementById('updateStateName');
  const updateDistrict = document.getElementById('updateDistrictName');

  updateCountry.addEventListener('change', () => {
    updateState.innerHTML = '<option value="">-- Select State --</option>';
    updateDistrict.innerHTML = '<option value="">-- Select District --</option>';
    if (updateCountry.value) loadStates(updateCountry.value, 'updateStateName');
  });

  updateState.addEventListener('change', () => {
    updateDistrict.innerHTML = '<option value="">-- Select District --</option>';
    if (updateState.value) loadDistricts(updateState.value, 'updateDistrictName');
  });
});

// Form submissions
document.getElementById('addForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = {
    country_id: document.getElementById('addCountry').value,
    state_id: document.getElementById('addStateName').value,
    district_id: document.getElementById('addDistrictName').value,
    taluka_name: document.getElementById('addTalukaName').value
  };
  fetch('/taluka/addTaluka', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(() => {
    closeAddModal();
    loadTaluka();
            window.location.reload(); // 🔄 refresh whole page

  });
});

document.getElementById('updateForm').addEventListener('submit', e => {
  e.preventDefault();
  const taluka_id = document.getElementById('updateTalukaId').value;
  const data = {
    country_id: document.getElementById('updateCountry').value,
    state_id: document.getElementById('updateStateName').value,
    district_id: document.getElementById('updateDistrictName').value,
    taluka_name: document.getElementById('updateTalukaName').value
  };
  fetch(`/taluka/update/${taluka_id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(() => {
    closeUpdateModal();
    loadTaluka();
            window.location.reload(); // 🔄 refresh whole page

  });
});

// Delete Taluka
function deleteTaluka(id) {
  if (confirm('Are you sure you want to delete this taluka?')) {
    fetch(`/taluka/delete/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => loadTaluka());
              window.location.reload(); // 🔄 refresh whole page

  }
}

// Initial load
loadTaluka();