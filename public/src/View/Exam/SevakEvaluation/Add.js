function loadTalimBatch(selectId, selectedValue = null) {
    fetch('/talim_batch/list')
        .then(res => res.json())
        .then(batches => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select Batch --</option>';

            batches.forEach(batch => {
                const option = document.createElement('option');
                option.value = batch.talim_batch_id;
                option.textContent = `${batch.talim_year} - ${batch.talim_batch}`;
                if (selectedValue && selectedValue == batch.talim_batch_id) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        })
        .catch(err => console.error("Error loading Talim Batch:", err));
}

function loadGrade(selectId, selectedValue = null) {
    fetch('/grade/list')
        .then(res => res.json())
        .then(grades => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select Grade --</option>';

            grades.forEach(grade => {
                const option = document.createElement('option');
                option.value = grade.grade_id;
                option.textContent = grade.grade_name;
                if (selectedValue && selectedValue == grade.grade_id) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        })
        .catch(err => console.error("Error loading Grades:", err));
}

loadTalimBatch('talim_batch_id');
loadGrade('satsang_grade_id');
loadGrade('seva_grade_id');
loadGrade('human_relations_grade_id');
loadGrade('skill_grade_id');
loadGrade('abhyas_grade_id');
loadGrade('family_ecostatus_grade_id');
loadGrade('family_satsang_grade_id');
loadGrade('overall_grade_id');


// ✅ When Talim Batch changes → update Sevak list
document.getElementById('talim_batch_id').addEventListener('change', function () {
    const batchId = this.value;
    getSevakByBatch(batchId, 'sevak_id');
});

// ✅ Fetch sevak list by batch
function getSevakByBatch(talim_batch_id, selectId, selectedValue = null, callback = null) {
    const select = document.getElementById(selectId);

    if (!talim_batch_id) {
        select.innerHTML = '<option value="">-- Select Sevak --</option>';
        return;
    }

    fetch(`/common/getSevakByBatch?batch_id=${talim_batch_id}`)
        .then(res => res.json())
        .then(sevaks => {
            select.innerHTML = '<option value="">-- Select Sevak --</option>';
            sevaks.forEach(s => {
                const option = document.createElement('option');
                option.value = s.sevak_id;
                option.textContent = `${s.first_name} ${s.last_name}`;
                if (selectedValue && selectedValue == s.sevak_id) {
                    option.selected = true;
                }
                select.appendChild(option);
            });

            if (typeof callback === 'function') callback();
        })
        .catch(err => console.error("Error loading Sevaks:", err));
}

// Handle form submission
document.getElementById('addForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        talim_batch_id: document.getElementById('talim_batch_id').value,
        sevak_id: document.getElementById('sevak_id').value,
        satsang_grade_id: document.getElementById('satsang_grade_id').value,
        satsang_notes: document.getElementById('satsang_notes').value,
        seva_grade_id: document.getElementById('seva_grade_id').value,
        seva_notes: document.getElementById('seva_notes').value,
        human_relations_grade_id: document.getElementById('human_relations_grade_id').value,
        human_relations_notes: document.getElementById('human_relations_notes').value,
        skill_grade_id: document.getElementById('skill_grade_id').value,
        skill_notes: document.getElementById('skill_notes').value,
        abhyas_grade_id: document.getElementById('abhyas_grade_id').value,
        abhyas_notes: document.getElementById('abhyas_notes').value,
        family_ecostatus_grade_id: document.getElementById('family_ecostatus_grade_id').value,
        family_ecostatus_notes: document.getElementById('family_ecostatus_notes').value,
        family_satsang_grade_id: document.getElementById('family_satsang_grade_id').value,
        family_satsang_notes: document.getElementById('family_satsang_notes').value,
        overall_grade_id: document.getElementById('overall_grade_id').value,
        overall_notes: document.getElementById('overall_notes').value,
        remarks: document.getElementById('remarks').value,
    };

    fetch('/SevakEvaluation/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                document.getElementById('addForm').reset();
                window.location.href = '/SevakEvaluation';
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(err => {
            console.error('Submission Error:', err);
            alert('An error occurred during submission.');
        });
});

