  // Fetch specialization list
        function loadSpecialization() {
            fetch('/specialization/list')
                .then(res => res.json())
                .then(data => {
                    const tableBody = document.getElementById('specialization-table-body');
                    tableBody.innerHTML = '';
                    data.forEach((specialization, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
  <td>${index + 1}</td>
  <td>${specialization.degree}</td>
  <td>${specialization.specialization}</td>
  <td>${specialization.full_name}</td>
  <td>
    <button class="btn btn-update" 
      onclick="openUpdateModal(${specialization.specialization_id}, '${specialization.specialization}', ${specialization.degree_id})">
      Update
    </button>
    <button class="btn btn-delete" onclick="deleteSpecialization(${specialization.specialization_id})">Delete</button>
  </td>
`;

                        tableBody.appendChild(row);
                    });
                });
        }

        // Fetch degree list
        function loadDegrees(selectId, selectedValue = null) {
            fetch('/degree/list') // ✅ you must already have /degree/list API
                .then(res => res.json())
                .then(degrees => {
                    const select = document.getElementById(selectId);
                    select.innerHTML = '<option value="">-- Select Degree --</option>';
                    degrees.forEach(degree => {
                        const option = document.createElement('option');
                        option.value = degree.degree_id;
                        option.textContent = degree.degree;
                        if (selectedValue && selectedValue == degree.degree_id) {
                            option.selected = true;
                        }
                        select.appendChild(option);
                    });
                });
        }

        // --- Add Modal ---
        function openAddModal() {
            loadDegrees('addDegree'); // ✅ fill dropdown before opening
            document.getElementById('addModal').style.display = 'block';
        }

        function closeAddModal() {
            document.getElementById('addModal').style.display = 'none';
        }
        document.getElementById('addForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const specialization = document.getElementById('addSpecializationName').value;
            const degree_id = document.getElementById('addDegree').value;


            fetch('/specialization/addSpecialization', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        specialization,
                        degree_id
                    })
                })
                .then(res => res.json())
                .then(result => {
                    closeAddModal();
                    loadSpecialization();
                    window.location.reload(); // 🔄 refresh whole page
                });
        });

        // --- Update Modal ---
        function openUpdateModal(id, specialization, degree_id) {
            document.getElementById('updateSpecializationId').value = id;
            document.getElementById('updateSpecializationName').value = specialization;

            // ✅ Load countries, then pre-select the one for this specialization
            loadDegrees('updateDegree', degree_id);

            document.getElementById('updateModal').style.display = 'block';
        }


        function closeUpdateModal() {
            document.getElementById('updateModal').style.display = 'none';
        }

        document.getElementById('updateForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('updateSpecializationId').value;
            const specialization = document.getElementById('updateSpecializationName').value;
            const degree_id = document.getElementById('updateDegree').value;
            // console.log("Form Data →", { id, specialization });

            fetch(`/specialization/update/${id}`, {
                    method: 'POST', // keep POST if your backend expects it
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        specialization,
                        degree_id
                    })
                })
                .then(res => res.json())
                .then(result => {
                    closeUpdateModal();
                    loadSpecialization();
                    window.location.reload(); // 🔄 refresh whole page
                });
        });

        // --- Delete ---
        function deleteSpecialization(id) {
            if (confirm("Are you sure you want to delete this specialization?")) {
                fetch(`/specialization/delete/${id}`, {
                        method: 'DELETE'
                    }) // keep POST if backend expects it
                    .then(res => res.json())
                    .then(result => {
                        alert(result.message);
                        loadSpecialization();
                        window.location.reload(); // 🔄 refresh whole page

                    });
            }
        }

        // Initial load
        loadSpecialization();