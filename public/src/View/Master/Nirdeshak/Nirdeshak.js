// Fetch  Nirdeshak list
    function loadNirdeshaks() {
      fetch('/nirdeshak/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('blood-group-table-body');
          tableBody.innerHTML = '';
          data.forEach((Nirdeshak, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${Nirdeshak.nirdeshak_name}</td>
              <td>${Nirdeshak.mobile_no}</td>
              <td>${Nirdeshak.whatapp_no}</td>
              <td>${Nirdeshak.email_id}</td>
              <td>${Nirdeshak.full_name}</td>
              <td>
<button class="btn btn-update" 
  onclick="openUpdateModal(
    ${Nirdeshak.nirdeshak_id}, 
    '${Nirdeshak.nirdeshak_name}', 
    '${Nirdeshak.mobile_no}', 
    '${Nirdeshak.whatapp_no}',  
    '${Nirdeshak.email_id}'
  )">Update</button>
                <button class="btn btn-delete" onclick="deleteNirdeshak(${Nirdeshak.nirdeshak_id})">Delete</button>
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
      const nirdeshak_name = document.getElementById('add_nirdeshak_name').value;
      const mobile_no = document.getElementById('addmobile_no').value;
      const whatapp_no = document.getElementById('addwhatapp_no').value;
      const email_id = document.getElementById('addemail_id').value;

      fetch('/nirdeshak/addNirdeshak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nirdeshak_name, mobile_no, whatapp_no, email_id })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadNirdeshaks();
        window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Update Modal ---
function openUpdateModal(id, nirdeshak_name, mobile_no, whatapp_no, email_id) {
  document.getElementById('updateNirdeshakId').value = id;
  document.getElementById('updateNirdeshakName').value = nirdeshak_name;
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
      const id = document.getElementById('updateNirdeshakId').value;
      const nirdeshak_name = document.getElementById('updateNirdeshakName').value;
      const mobile_no = document.getElementById('updateMobileNo').value;
      const whatapp_no = document.getElementById('updateWhatsAppNo').value;
      const email_id = document.getElementById('updateEmailId').value;

      fetch(`/nirdeshak/update/${id}`, {
        method: 'POST', // keep POST if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nirdeshak_name, mobile_no, whatapp_no, email_id })
      })
      .then(res => res.json())
      .then(result => {
        closeUpdateModal();
        loadNirdeshaks();
        // console.log(nirdeshak_name, mobile_no, whatapp_no, email_id);
        window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Delete ---
    function deleteNirdeshak(id) {
      if (confirm("Are you sure you want to delete this  Nirdeshak?")) {
        fetch(`/nirdeshak/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadNirdeshaks();
            window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadNirdeshaks();