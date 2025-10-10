        // =================== LOAD FUNCTIONS ===================

        // Load city table
        function loadCity() {
            fetch('/city/list')
                .then(res => res.json())
                .then(data => {
                    const tbody = document.getElementById('city-table-body');
                    tbody.innerHTML = '';
                    data.forEach((city, index) => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
          <td>${index+1}</td>
          <td>${city.city_name || ''}</td>
          <td>${city.taluka_name || ''}</td>
          <td>${city.district_name || ''}</td>
          <td>${city.state_name || ''}</td>
          <td>${city.country_name || ''}</td>
          <td>
            <button class="btn btn-update" 
              onclick="openUpdateModal(${city.city_id}, ${city.country_id}, ${city.state_id}, ${city.district_id}, ${city.taluka_id}, '${city.city_name}')">Update</button>
            <button class="btn btn-delete" onclick="deleteCity(${city.city_id})">Delete</button>
          </td>`;
                        tbody.appendChild(tr);
                    });
                });
        }

        function loadCountries(selectId, selectedValue = null, callback = null) {
            fetch('/country/list')
                .then(res => res.json())
                .then(countries => {
                    const select = document.getElementById(selectId);
                    select.innerHTML = '<option value="">-- Select Country --</option>';
                    countries.forEach(c => {
                        const opt = document.createElement('option');
                        opt.value = c.country_id;
                        opt.textContent = c.country_name;
                        if (selectedValue && selectedValue == c.country_id) opt.selected = true;
                        select.appendChild(opt);
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
                        const opt = document.createElement('option');
                        opt.value = d.district_id;
                        opt.textContent = d.district_name;
                        if (selectedValue && selectedValue == d.district_id) opt.selected = true;
                        select.appendChild(opt);
                    });
                    if (callback) callback();
                });
        }

        function loadTaluka(district_id, selectId, selectedValue = null, callback = null) {
            fetch(`/common/gettalukabyid?district_id=${district_id}`)
                .then(res => res.json())
                .then(talukas => {
                    const select = document.getElementById(selectId);
                    select.innerHTML = '<option value="">-- Select Taluka --</option>';
                    talukas.forEach(t => {
                        const opt = document.createElement('option');
                        opt.value = t.taluka_id;
                        opt.textContent = t.taluka_name;
                        if (selectedValue && selectedValue == t.taluka_id) opt.selected = true;
                        select.appendChild(opt);
                    });
                    if (callback) callback();
                });
        }

        // =================== MODALS ===================

        function openAddModal() {
            document.getElementById('addCityName').value = '';
            loadCountries('addCountry');
            document.getElementById('addStateName').innerHTML = '<option value="">-- Select State --</option>';
            document.getElementById('addDistrictName').innerHTML = '<option value="">-- Select District --</option>';
            document.getElementById('addTalukaName').innerHTML = '<option value="">-- Select Taluka --</option>';
            document.getElementById('addModal').style.display = 'block';
        }

        function closeAddModal() {
            document.getElementById('addModal').style.display = 'none';
        }

        function openUpdateModal(city_id, country_id, state_id, district_id, taluka_id, city_name) {
            document.getElementById('updateCityId').value = city_id;
            document.getElementById('updateCityName').value = city_name;

            loadCountries('updateCountry', country_id, () => {
                loadStates(country_id, 'updateStateName', state_id, () => {
                    loadDistricts(state_id, 'updateDistrictName', district_id, () => {
                        loadTaluka(district_id, 'updateTalukaName', taluka_id);
                    });
                });
            });

            document.getElementById('updateModal').style.display = 'block';
        }

        function closeUpdateModal() {
            document.getElementById('updateModal').style.display = 'none';
        }

        // =================== CASCADING DROPDOWNS ===================

        document.addEventListener('DOMContentLoaded', () => {
            // Add form cascading
            const addCountry = document.getElementById('addCountry');
            const addState = document.getElementById('addStateName');
            const addDistrict = document.getElementById('addDistrictName');
            const addTaluka = document.getElementById('addTalukaName');

            addCountry.addEventListener('change', () => {
                addState.innerHTML = '<option value="">-- Select State --</option>';
                addDistrict.innerHTML = '<option value="">-- Select District --</option>';
                addTaluka.innerHTML = '<option value="">-- Select Taluka --</option>';
                if (addCountry.value) loadStates(addCountry.value, 'addStateName');
            });

            addState.addEventListener('change', () => {
                addDistrict.innerHTML = '<option value="">-- Select District --</option>';
                addTaluka.innerHTML = '<option value="">-- Select Taluka --</option>';
                if (addState.value) loadDistricts(addState.value, 'addDistrictName');
            });

            addDistrict.addEventListener('change', () => {
                addTaluka.innerHTML = '<option value="">-- Select Taluka --</option>';
                if (addDistrict.value) loadTaluka(addDistrict.value, 'addTalukaName');
            });

            // Update form cascading
            const updateCountry = document.getElementById('updateCountry');
            const updateState = document.getElementById('updateStateName');
            const updateDistrict = document.getElementById('updateDistrictName');
            const updateTaluka = document.getElementById('updateTalukaName');

            updateCountry.addEventListener('change', () => {
                updateState.innerHTML = '<option value="">-- Select State --</option>';
                updateDistrict.innerHTML = '<option value="">-- Select District --</option>';
                updateTaluka.innerHTML = '<option value="">-- Select Taluka --</option>';
                if (updateCountry.value) loadStates(updateCountry.value, 'updateStateName');
            });

            updateState.addEventListener('change', () => {
                updateDistrict.innerHTML = '<option value="">-- Select District --</option>';
                updateTaluka.innerHTML = '<option value="">-- Select Taluka --</option>';
                if (updateState.value) loadDistricts(updateState.value, 'updateDistrictName');
            });

            updateDistrict.addEventListener('change', () => {
                updateTaluka.innerHTML = '<option value="">-- Select Taluka --</option>';
                if (updateDistrict.value) loadTaluka(updateDistrict.value, 'updateTalukaName');
            });
        });

        // =================== FORM SUBMISSIONS ===================

        // Add city
        document.getElementById('addForm').addEventListener('submit', e => {
            e.preventDefault();
            const state_id = document.getElementById('addStateName').value;
            const country_id = document.getElementById('addCountry').value;
            const district_id = document.getElementById('addDistrictName').value;
            const taluka_id = document.getElementById('addTalukaName').value;
            const city_name = document.getElementById('addCityName').value;

            fetch('/city/addCity', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        state_id,
                        country_id,
                        district_id,
                        taluka_id,
                        city_name
                    })
                })
                .then(res => res.json())
                .then(() => {
                    closeAddModal();
                    loadCity();
                    // console.log(state_id,country_id,district_id, taluka_id, city_name );
                    window.location.reload(); // 🔄 refresh whole page

                });
        });

        // Update city
        document.getElementById('updateForm').addEventListener('submit', e => {
            e.preventDefault();
            const city_id = document.getElementById('updateCityId').value;
            const state_id = document.getElementById('updateCountry').value;
            const country_id = document.getElementById('updateStateName').value;
            const district_id = document.getElementById('updateDistrictName').value;
            const taluka_id = document.getElementById('updateTalukaName').value;
            const city_name = document.getElementById('updateCityName').value;

            fetch(`/city/update/${city_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        state_id,
                        country_id,
                        district_id,
                        taluka_id,
                        city_name
                    })
                })
                .then(res => res.json())
                .then(() => {
                    closeUpdateModal();
                    loadCity();
                    // console.log(state_id,country_id,district_id, taluka_id, city_name );
                    window.location.reload(); // 🔄 refresh whole page

                });
        });

        // Delete city
        function deleteCity(id) {
            if (confirm('Are you sure you want to delete this city?')) {
                fetch(`/city/delete/${id}`, {
                        method: 'DELETE'
                    })
                    .then(res => res.json())
                    .then(() => loadCity());
                window.location.reload(); // 🔄 refresh whole page

            }
        }

        // Initial load
        loadCity();
