function loadExamTypes() {
    fetch('/examtype/list')
        .then(res => res.json())
        .then(data => {
            const tableBody = document.getElementById('ExamType-table-body');
            tableBody.innerHTML = '';
            data.forEach((ExamType, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
              <td>${index + 1}</td>
              <td>${ExamType.exam_type}</td>
              <td>${ExamType.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${ExamType.examtype_id}, '${ExamType.exam_type}')">Update</button>
                <button class="btn btn-delete" onclick="deleteExamType(${ExamType.examtype_id})">Delete</button>
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
document.getElementById('addForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const exam_type = document.getElementById('addExamTypeName').value;

    fetch('/examtype/addExamType', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam_type })
    })
        .then(res => res.json())
        .then(result => {
            closeAddModal();
            loadExamTypes();
            // console.log(exam_type);
            window.location.reload();

        });
});

// --- Update Modal ---
function openUpdateModal(id, name) {
    document.getElementById('updateExamTypeId').value = id;
    document.getElementById('updateExamTypeName').value = name;
    document.getElementById('updateModal').style.display = 'block';
}
function closeUpdateModal() {
    document.getElementById('updateModal').style.display = 'none';
}
document.getElementById('updateForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('updateExamTypeId').value;
    const exam_type = document.getElementById('updateExamTypeName').value;

    fetch(`/examtype/update/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam_type })
    })
        .then(res => res.json())
        .then(result => {
            closeUpdateModal();
            loadExamTypes();
            // console.log(exam_type);
            window.location.reload();

        });
});

// --- Delete ---
function deleteExamType(id) {
    if (confirm("Are you sure you want to delete this ExamType?")) {
        fetch(`/examtype/delete/${id}`,
            { method: 'DELETE' })
            .then(res => res.json())
            .then(result => {
                alert(result.message);
                loadExamTypes();
                window.location.reload();
            });
    }
}

// Initial load
loadExamTypes();
