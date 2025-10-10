  // Fetch relationship list
    function loadRelationship() {
      fetch('/relationship/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('relationship-table-body');
          tableBody.innerHTML = '';
          data.forEach((relationship, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${relationship.relationship_name}</td>
              <td>${relationship.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${relationship.relationship_id}, '${relationship.relationship_name}')">Update</button>
                <button class="btn btn-delete" onclick="deleteRelationship(${relationship.relationship_id})">Delete</button>
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
      const relationship_name = document.getElementById('addRelationshipName').value;

      fetch('/relationship/addRelationship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ relationship_name })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadRelationship();
        window.location.reload(); // 🔄 refresh whole page
      });
    });

    // --- Update Modal ---
    function openUpdateModal(id, relationship_name) {
      document.getElementById('updateRelationshipId').value = id;
      document.getElementById('updateRelationshipName').value = relationship_name;
      document.getElementById('updateModal').style.display = 'block';
    }
    function closeUpdateModal() {
      document.getElementById('updateModal').style.display = 'none';
    }
    
    document.getElementById('updateForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('updateRelationshipId').value;
      const relationship_name = document.getElementById('updateRelationshipName').value;
      // console.log("Form Data →", { id, relationship_name });

      fetch(`/relationship/update/${id}`, {
        method: 'POST', // keep POST if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ relationship_name })
      })
      .then(res => res.json())
      .then(result => {
        closeUpdateModal();
        loadRelationship();
        window.location.reload(); // 🔄 refresh whole page
      });
    });

    // --- Delete ---
    function deleteRelationship(id) {
      if (confirm("Are you sure you want to delete this relationship?")) {
        fetch(`/relationship/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadRelationship();
            window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadRelationship();