  // Fetch Sant Nirdeshak list
        function loadSantNirdeshaks() {
            fetch('/santnirdeshak/list')
                .then(res => res.json())
                .then(data => {
                    const tableBody = document.getElementById('blood-group-table-body');
                    tableBody.innerHTML = '';
                    data.forEach((santnirdeshak, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
              <td>${index + 1}</td>
              <td>${santnirdeshak.sant_nirdeshak_name}</td>
              <td>${santnirdeshak.mobile_no}</td>
              <td>${santnirdeshak.whatapp_no}</td>
              <td>${santnirdeshak.email_id}</td>
              <td>${santnirdeshak.full_name}</td>
              <td>
<button class="btn btn-update" 
  onclick="openUpdateModal(
    ${santnirdeshak.sant_nirdeshak_id}, 
    '${santnirdeshak.sant_nirdeshak_name}', 
    '${santnirdeshak.mobile_no}', 
    '${santnirdeshak.whatapp_no}',  
    '${santnirdeshak.email_id}'
  )">Update</button>
                <button class="btn btn-delete" onclick="deleteSantNirdeshak(${santnirdeshak.sant_nirdeshak_id})">Delete</button>
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
            const sant_nirdeshak_name = document.getElementById('addsant_nirdeshak_name').value;
            const mobile_no = document.getElementById('addmobile_no').value;
            const whatapp_no = document.getElementById('addwhatapp_no').value;
            const email_id = document.getElementById('addemail_id').value;

            fetch('/santnirdeshak/addSantNirdeshak', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sant_nirdeshak_name,
                        mobile_no,
                        whatapp_no,
                        email_id
                    })
                })
                .then(res => res.json())
                .then(result => {
                    closeAddModal();
                    loadSantNirdeshaks();
                    window.location.reload(); // 🔄 refresh whole page

                });
        });

        // --- Update Modal ---
        function openUpdateModal(id, sant_nirdeshak_name, mobile_no, whatapp_no, email_id) {
            document.getElementById('updateSantNirdeshakId').value = id;
            document.getElementById('updateSantNirdeshakName').value = sant_nirdeshak_name;
            document.getElementById('updateMobileNo').value = mobile_no;
            document.getElementById('updateWhatsAppNo').value = whatapp_no;
            document.getElementById('updateEmailId').value = email_id;
            document.getElementById('updateModal').style.display = 'block';
        }

        function closeUpdateModal() {
            document.getElementById('updateModal').style.display = 'none';
        }
        document.getElementById('updateForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('updateSantNirdeshakId').value;
            const sant_nirdeshak_name = document.getElementById('updateSantNirdeshakName').value;
            const mobile_no = document.getElementById('updateMobileNo').value;
            const whatapp_no = document.getElementById('updateWhatsAppNo').value;
            const email_id = document.getElementById('updateEmailId').value;

            fetch(`/santnirdeshak/update/${id}`, {
                    method: 'POST', // keep POST if your backend expects it
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sant_nirdeshak_name,
                        mobile_no,
                        whatapp_no,
                        email_id
                    })
                })
                .then(res => res.json())
                .then(result => {
                    closeUpdateModal();
                    loadSantNirdeshaks();
                    window.location.reload(); // 🔄 refresh whole page

                });
        });

        // --- Delete ---
        function deleteSantNirdeshak(id) {
            if (confirm("Are you sure you want to delete this Sant Nirdeshak?")) {
                fetch(`/santnirdeshak/delete/${id}`, {
                        method: 'DELETE'
                    }) // keep POST if backend expects it
                    .then(res => res.json())
                    .then(result => {
                        alert(result.message);
                        loadSantNirdeshaks();
                        window.location.reload(); // 🔄 refresh whole page

                    });
            }
        }

        // Initial load
        loadSantNirdeshaks();