// -------------------- Load Exam Schedule Table --------------------
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function LoadExamSchedule() {
    fetch('/ExamSchedule/list')
        .then(res => res.json())
        .then(data => {
            const tableBody = document.getElementById('ExamSchedule-table-body');
            tableBody.innerHTML = '';
            data.forEach((exam, index) => {
                const row = document.createElement('tr');

                let fileColumn = '-';
                if (exam.upload_exam_paper) {
                    fileColumn = `<a href="/${exam.upload_exam_paper}" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style="color: #2196F3; cursor: pointer; text-decoration: underline;"
                                    title="View exam paper">
                                    📄 
                                  </a>`;
                }

                row.innerHTML = `
          <td>${index + 1}</td>
          <td>${exam.exam_type}</td>
          <td>${exam.exam_name}</td>
          <td>${exam.exam_date}</td>
          <td>${exam.total_marks}</td>
    <td>${formatDate(exam.mark_entry_start_date)} to ${formatDate(exam.mark_entry_end_date)}</td>
          <td>${fileColumn}</td>
          <td>${exam.full_name || '-'}</td>
          <td>
            <button class="btn btn-update"
                onclick="openUpdateModal(${exam.exam_schedule_id})">
              Update
            </button>
            <button class="btn btn-delete" onclick="deleteSchedule(${exam.exam_schedule_id})">Delete</button>
          </td>`;
                tableBody.appendChild(row);
            });
        });
}

// -------------------- Load Exam Type Dropdown --------------------
function LoadExamType(selectId, selectedValue = null) {
    fetch('/examtype/list')
        .then(res => res.json())
        .then(types => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select Exam Type --</option>';
            types.forEach(t => {
                const opt = document.createElement('option');
                opt.value = t.examtype_id;
                opt.textContent = t.exam_type;
                if (selectedValue && selectedValue == t.examtype_id) opt.selected = true;
                select.appendChild(opt);
            });
        });
}

// -------------------- Load Exam Dropdown --------------------
function LoadExam(examtype_id, selectId, selectedValue = null) {
    if (!examtype_id) {
        document.getElementById(selectId).innerHTML = '<option value="">-- Select Exam --</option>';
        return;
    }

    fetch(`/common/getexambyTypeid?examtype_id=${examtype_id}`)
        .then(res => res.json())
        .then(exams => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select Exam --</option>';
            exams.forEach(e => {
                const opt = document.createElement('option');
                opt.value = e.exam_id;
                opt.textContent = e.exam_name;
                if (selectedValue && selectedValue == e.exam_id) opt.selected = true;
                select.appendChild(opt);
            });
        });
}

// -------------------- ADD MODAL --------------------
function openAddModal() {
    LoadExamType('addExamType');
    document.getElementById('addModal').style.display = 'block';
}

function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
}

document.getElementById('addExamType').addEventListener('change', function () {
    LoadExam(this.value, 'addExam');
});

document.getElementById('addForm').addEventListener('submit', e => {
    e.preventDefault();

    // Use FormData instead of JSON for file upload
    const formData = new FormData();
    formData.append('examtype_id', document.getElementById('addExamType').value);
    formData.append('exam_id', document.getElementById('addExam').value);
    formData.append('exam_date', document.getElementById('addExamDate').value);
    formData.append('total_marks', document.getElementById('addTotalMarks').value);
    formData.append('mark_entry_start_date', document.getElementById('addStartDate').value);
    formData.append('mark_entry_end_date', document.getElementById('addEndDate').value);

    // Append the actual file
    const fileInput = document.getElementById('addExamFile');
    if (fileInput.files[0]) {
        formData.append('exam_paper', fileInput.files[0]);
    }

    fetch('/ExamSchedule/addExamSchedule', {
        method: 'POST',
        // DON'T set Content-Type header - let browser set it with boundary
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            // alert(result.message || 'Added successfully');
            closeAddModal();
            LoadExamSchedule();
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding exam schedule');
        });
});


// -------------------- UPDATE MODAL --------------------
function openUpdateModal(id) {
    // Fetch the complete exam schedule data
    fetch(`/ExamSchedule/${id}`)
        .then(res => res.json())
        .then(exam => {
            // Set the hidden ID field
            document.getElementById('updateScheduleId').value = exam.exam_schedule_id;

            // Set date fields
            document.getElementById('updateTotalMarks').value = exam.total_marks;

            document.getElementById('updateExamDate').value = formatDateForInput(exam.exam_date);
            document.getElementById('updateStartDate').value = formatDateForInput(exam.mark_entry_start_date);
            document.getElementById('updateEndDate').value = formatDateForInput(exam.mark_entry_end_date);

            // Load exam type dropdown with selected value
            LoadExamType('updateExamType', exam.examtype_id);

            // Wait a bit for exam type to load, then load exam dropdown
            setTimeout(() => {
                LoadExam(exam.examtype_id, 'updateExam', exam.exam_id);
            }, 300);

            // Show the modal
            document.getElementById('updateModal').style.display = 'block';
        })
        .catch(err => {
            console.error('Error fetching exam schedule:', err);
            alert('Error loading exam schedule data');
        });
}

function formatDateForInput(dateStr) {
    if (!dateStr) return '';

    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function closeUpdateModal() {
    document.getElementById('updateModal').style.display = 'none';
    // Clear file input
    document.getElementById('updateExamFile').value = '';
}

document.getElementById('updateExamType').addEventListener('change', function () {
    LoadExam(this.value, 'updateExam');
});

document.getElementById('updateForm').addEventListener('submit', e => {
    e.preventDefault();

    const id = document.getElementById('updateScheduleId').value;

    const formData = new FormData();
    formData.append('examtype_id', document.getElementById('updateExamType').value);
    formData.append('exam_id', document.getElementById('updateExam').value);
    formData.append('exam_date', document.getElementById('updateExamDate').value);
    formData.append('total_marks', document.getElementById('updateTotalMarks').value);
    formData.append('mark_entry_start_date', document.getElementById('updateStartDate').value);
    formData.append('mark_entry_end_date', document.getElementById('updateEndDate').value);

    const fileInput = document.getElementById('updateExamFile');
    if (fileInput.files[0]) {
        formData.append('exam_paper', fileInput.files[0]);
    }

    fetch(`/ExamSchedule/update/${id}`, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            // alert(result.message || 'Updated successfully');
            closeUpdateModal();
            LoadExamSchedule();
            window.location.reload();
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Error updating schedule');
        });
});


// -------------------- DELETE --------------------
function deleteSchedule(id) {
    if (confirm('Are you sure you want to delete this schedule?')) {
        fetch(`/ExamSchedule/delete/${id}`,
            { method: 'DELETE' })
            .then(res => res.json())
            .then(result => {
                alert(result.message || 'Deleted successfully');
                LoadExamSchedule();
                window.location.reload();
            });
    }
}

// -------------------- INITIAL LOAD --------------------
LoadExamSchedule();
