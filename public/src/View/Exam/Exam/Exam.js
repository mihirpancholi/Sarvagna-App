function loadExams() {
    fetch('/exam/list')
        .then(res => res.json())
        .then(data => {
            const tableBody = document.getElementById('Exam-table-body');
            tableBody.innerHTML = '';
            data.forEach((Exam, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
              <td>${index + 1}</td>
              <td>${Exam.exam_type}</td>
              <td>${Exam.exam_name}</td>
              <td>${Exam.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${Exam.exam_id}, '${Exam.exam_type}', '${Exam.exam_name}')">Update</button>
                <button class="btn btn-delete" onclick="deleteExam(${Exam.exam_id})">Delete</button>
              </td>
            `;
                tableBody.appendChild(row);
            });
        });
}

function loadexamtype(selectId, selectedId = null) {
    fetch('/examtype/list')
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select Exam Type --</option>';
            data.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.examtype_id;
                opt.textContent = c.exam_type;
                if (selectedId && selectedId == c.examtype_id) opt.selected = true;
                select.appendChild(opt);
            });
        });
}

// --- Add Modal ---
function openAddModal() {
    loadexamtype('addexamtype');
    document.getElementById('addModal').style.display = 'block';
}
function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
}
document.getElementById('addForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const exam_name = document.getElementById('addExamName').value;
    const examtype_id = document.getElementById('addexamtype').value;

    fetch('/exam/addExam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examtype_id, exam_name })
    })
        .then(res => res.json())
        .then(result => {
            closeAddModal();
            loadExams();
            // console.log(examtype_id, exam_name,);
            window.location.reload();

        });
});


// --- Update Modal ---


function openUpdateModal(id) {
    fetch(`/exam/${id}`)   // ✅ fetch record details from backend
        .then(res => res.json())
        .then(data => {
            document.getElementById('updateExamId').value = data.exam_id;
            document.getElementById('updateExamName').value = data.exam_name;
            loadexamtype('updateexamtype', data.examtype_id);  // ✅ auto-select correct type
            document.getElementById('updateModal').style.display = 'block';
        })
        .catch(err => console.error("Failed to load exam:", err));
}

function closeUpdateModal() {
    document.getElementById('updateModal').style.display = 'none';
}

document.getElementById('updateForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('updateExamId').value;
    const exam_name = document.getElementById('updateExamName').value;
    const examtype_id = document.getElementById('updateexamtype').value;

    fetch(`/exam/update/${id}`, {
        method: 'POST', // or PUT if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examtype_id, exam_name })
    })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                closeUpdateModal();
                loadExams();
                window.location.reload();
                // console.log('Exam updated:', exam_name);
            } else {
                alert(result.message || "Update failed!");
            }
        })
        .catch(err => console.error("Error updating exam:", err));
});


// --- Delete ---
function deleteExam(id) {
    if (confirm("Are you sure you want to delete this Exam?")) {
        fetch(`/exam/delete/${id}`,
            { method: 'DELETE' })
            .then(res => res.json())
            .then(result => {
                alert(result.message);
                loadExams();
                window.location.reload();
            });
    }
}

// Initial load
loadExams();
