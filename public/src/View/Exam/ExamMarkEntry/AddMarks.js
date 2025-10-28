// ✅ Load exam types
function loadExamTypes(selectId, selectedId = null) {
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
        })
        .catch(err => console.error('Error loading exam types:', err));
}

// ✅ Load exams by type
function loadExam(examtype_id, selectId, selectedValue = null) {
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

// ✅ Load students and total marks
function loadStudentData(exam_id, examtype_id) {
    if (!exam_id || !examtype_id) {
        document.getElementById('tb').innerHTML = '';
        document.getElementById('total_marks').textContent = '';
        return;
    }

    // Load student table
    fetch('/ExamMarkEntry/getStudentData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam_id, examtype_id })
    })
        .then(res => res.text())
        .then(html => {
            document.getElementById('tb').innerHTML = html;
        })
        .catch(err => console.error('Error loading student data:', err));

    // Load total marks
    fetch('/ExamMarkEntry/GetExamMarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam_id })
    })
        .then(res => res.json())
        .then(result => {
            document.getElementById('total_marks').textContent = result.success
                ? 'Total Marks: ' + (result.total_marks || '')
                : '';
        })
        .catch(err => console.error('Error fetching exam marks:', err));
}

// ✅ Initialize
loadExamTypes('examtype_id');

document.getElementById('examtype_id').addEventListener('change', function () {
    if (this.value) {
        loadExam(this.value, 'exam_id');
        document.getElementById('tb').innerHTML = '';
        document.getElementById('total_marks').textContent = '';
    }
});

document.getElementById('exam_id').addEventListener('change', function () {
    const examtype_id = document.getElementById('examtype_id').value;
    loadStudentData(this.value, examtype_id);
});

function changemark(sevakId) {
    const checkbox = document.getElementById(`attendance_${sevakId}`);
    const marksInput = document.getElementById(`marks_${sevakId}`);
    // Find the remarks input associated with the same sevakId
    const remarksInput = document.querySelector(`tr:has(#attendance_${sevakId}) input[name="remarks[]"]`);

    if (!checkbox || !marksInput) return; // Safety check

    if (!checkbox.checked) {
        marksInput.value = '';
        marksInput.disabled = true;
        if (remarksInput) remarksInput.disabled = true;
    } else {
        marksInput.disabled = false;
        if (remarksInput) remarksInput.disabled = false;
    }
}

document.getElementById('examMarkForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const examtype_id = document.getElementById('examtype_id').value;
    const exam_id = document.getElementById('exam_id').value;

    const ytk_ids = Array.from(document.querySelectorAll('input[name="ytk_id[]"]')).map(i => i.value);
    const student_names = Array.from(document.querySelectorAll('input[name="student_name[]"]')).map(i => i.value);
    const sevak_ids = Array.from(document.querySelectorAll('input[name="sevak_id[]"]')).map(i => i.value);
    const marks = Array.from(document.querySelectorAll('input[name="marks[]"]')).map(i => i.value || 0); // Use 0 if empty
    const remarks = Array.from(document.querySelectorAll('input[name="remarks[]"]')).map(i => i.value);

    const attendance = sevak_ids.map(id => {
        const cb = document.getElementById(`attendance_${id}`);
        return cb && cb.checked ? 'on' : 'off';
    });

    const payload = {
        examtype_id,
        exam_id,
        ytk_id: ytk_ids,
        student_name: student_names,
        sevak_id: sevak_ids,
        marks,
        remarks,
        attendance
    };

    try {
        const res = await fetch('/ExamMarkEntry/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (result.success) {
            alert(result.message);
            // window.location.reload();
            window.location.href = '/ExamMarkEntry/';
        } else {
            alert(result.message || 'Failed to save marks');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Error adding exam marks');
    }
});
