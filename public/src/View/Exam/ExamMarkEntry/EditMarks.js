// ✅ Get parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const exam_id_param = urlParams.get('exam_id');
const examtype_id_param = urlParams.get('examtype_id');

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

            // ✅ If examtype_id is available in URL, auto-load exams
            if (examtype_id_param) {
                loadExam(examtype_id_param, 'exam_id', exam_id_param);
            }
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

            // ✅ If exam_id is already available in URL, auto-load students
            if (exam_id_param && examtype_id_param) {
                loadStudentData(exam_id_param, examtype_id_param);
            }
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
loadExamTypes('examtype_id', examtype_id_param);

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
    const remarksInput = document.querySelector(`[name="remarks[]"][id="remarks_${sevakId}"]`);

    if (!checkbox || !marksInput) return;

    if (!checkbox.checked) {
        marksInput.value = '';
        marksInput.disabled = true;
        if (remarksInput) remarksInput.disabled = true;
    } else {
        marksInput.disabled = false;
        if (remarksInput) remarksInput.disabled = false;
    }
}

// ✅ Submit form
document.getElementById('editexamMarkForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const examtype_id = document.getElementById('examtype_id').value;
    const exam_id = document.getElementById('exam_id').value;

    const sevak_ids = Array.from(document.querySelectorAll('input[name="sevak_id[]"]')).map(i => i.value);
    const marks = Array.from(document.querySelectorAll('input[name="marks[]"]')).map(i => i.value || 0);
    const remarks = Array.from(document.querySelectorAll('input[name="remarks[]"]')).map(i => i.value);

    const attendance = sevak_ids.map(id => {
        const cb = document.getElementById(`attendance_${id}`);
        return cb && cb.checked ? 'on' : 'off';
    });

    const payload = {
        examtype_id,
        exam_id,
        sevak_id: sevak_ids,
        marks,
        remarks,
        attendance
    };

    try {
        const res = await fetch('/ExamMarkEntry/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (result.success) {
            alert(result.message);
            window.location.href = '/ExamMarkEntry/'; // Redirect after save
        } else {
            alert(result.message || 'Failed to save marks');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Error adding exam marks');
    }
});
