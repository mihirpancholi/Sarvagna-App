   // Fetch state list
        function loadState() {
            fetch('/state/list')
                .then(res => res.json())
                .then(data => {
                    const tableBody = document.getElementById('state-table-body');
                    tableBody.innerHTML = '';
                    data.forEach((state, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
  <td>${index + 1}</td>
  <td>${state.country_name}</td>
  <td>${state.state_name}</td>
  <td>${state.full_name}</td>
  <td>
    <button class="btn btn-update" 
      onclick="openUpdateModal(${state.state_id}, '${state.state_name}', ${state.country_id})">
      Update
    </button>
    <button class="btn btn-delete" onclick="deleteState(${state.state_id})">Delete</button>
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

        // --- Add Modal ---
        function openAddModal() {
            loadCountries('addCountry'); // ✅ fill dropdown before opening
            document.getElementById('addModal').style.display = 'block';
        }

        function closeAddModal() {
            document.getElementById('addModal').style.display = 'none';
        }
        document.getElementById('addForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const state_name = document.getElementById('addStateName').value;
            const country_id = document.getElementById('addCountry').value;


            fetch('/state/addState', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        state_name,
                        country_id
                    })
                })
                .then(res => res.json())
                .then(result => {
                    closeAddModal();
                    loadState();
                    window.location.reload(); // 🔄 refresh whole page
                });
        });

        // --- Update Modal ---
        function openUpdateModal(id, state_name, country_id) {
            document.getElementById('updateStateId').value = id;
            document.getElementById('updateStateName').value = state_name;

            // ✅ Load countries, then pre-select the one for this state
            loadCountries('updateCountry', country_id);

            document.getElementById('updateModal').style.display = 'block';
        }


        function closeUpdateModal() {
            document.getElementById('updateModal').style.display = 'none';
        }

        document.getElementById('updateForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('updateStateId').value;
            const state_name = document.getElementById('updateStateName').value;
            const country_id = document.getElementById('updateCountry').value;
            // console.log("Form Data →", { id, state_name });

            fetch(`/state/update/${id}`, {
                    method: 'POST', // keep POST if your backend expects it
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        state_name,
                        country_id
                    })
                })
                .then(res => res.json())
                .then(result => {
                    closeUpdateModal();
                    loadState();
                    window.location.reload(); // 🔄 refresh whole page
                });
        });

        // --- Delete ---
        function deleteState(id) {
            if (confirm("Are you sure you want to delete this state?")) {
                fetch(`/state/delete/${id}`, {
                        method: 'DELETE'
                    }) // keep POST if backend expects it
                    .then(res => res.json())
                    .then(result => {
                        alert(result.message);
                        loadState();
                        window.location.reload(); // 🔄 refresh whole page

                    });
            }
        }

        // Initial load
        loadState();