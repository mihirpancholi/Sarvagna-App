 // Fetch grade list
    function loadGrades() {
      fetch('/grade/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('grade-table-body');
          tableBody.innerHTML = '';
          data.forEach((grade, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${grade.grade_name}</td>
              <td>${grade.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${grade.grade_id}, '${grade.grade_name}')">Update</button>
                <button class="btn btn-delete" onclick="deleteGrade(${grade.grade_id})">Delete</button>
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
      const grade_name = document.getElementById('addGradeName').value;

      fetch('/grade/addGrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade_name })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadGrades();
        window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Update Modal ---
    function openUpdateModal(id, name) {
      document.getElementById('updateGradeId').value = id;
      document.getElementById('updateGradeName').value = name;
      document.getElementById('updateModal').style.display = 'block';
    }
    function closeUpdateModal() {
      document.getElementById('updateModal').style.display = 'none';
    }
    document.getElementById('updateForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('updateGradeId').value;
      const grade_name = document.getElementById('updateGradeName').value;

      fetch(`/grade/update/${id}`, {
        method: 'POST', // keep POST if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade_name })
      })
      .then(res => res.json())
      .then(result => {
        closeUpdateModal();
        loadGrades();
                window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Delete ---
    function deleteGrade(id) {
      if (confirm("Are you sure you want to delete this grade?")) {
        fetch(`/grade/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadGrades();
                    window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadGrades();