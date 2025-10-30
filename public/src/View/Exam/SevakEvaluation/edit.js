document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('editForm');
    const pathParts = window.location.pathname.split('/');
    const evaluationId = pathParts[pathParts.length - 1];

    if (!evaluationId) {
        alert('No evaluation ID found!');
        window.location.href = '/SevakEvaluation';
        return;
    }

    // --- Helper to populate a select dropdown ---
    function populateSelect(selectId, data, valueField, textField, defaultOptionText) {
        const select = document.getElementById(selectId);
        select.innerHTML = `<option value="">-- Select ${defaultOptionText} --</option>`;
        data.forEach(item => {
            let text;
            if (Array.isArray(textField)) {
                text = `${item[textField[0]]}-${item[textField[1]]}`;
            } else {
                text = item[textField];
            }
            select.innerHTML += `<option value="${item[valueField]}">${text}</option>`;
        });
    }

    // --- Fetch all necessary data in parallel ---
    try {
        const [evalResponse, optionsResponse] = await Promise.all([
            fetch(`/SevakEvaluation/api/evaluation/${evaluationId}`),
            fetch('/SevakEvaluation/filter-options')
        ]);

        const evalResult = await evalResponse.json();
        const optionsResult = await optionsResponse.json();

        if (!evalResult.success) {
            throw new Error(evalResult.message || 'Failed to load evaluation data.');
        }
        if (!optionsResult.success) {
            throw new Error('Failed to load form options.');
        }

        const evaluationData = evalResult.data;
        const optionsData = optionsResult.data;

        // --- Populate Dropdowns ---
        populateSelect('talim_batch_id', optionsData.talimBatchList, 'talim_batch_id', ['talim_year', 'talim_batch'], 'Talim Batch');

        const gradeFields = [
            'satsang_grade_id', 'seva_grade_id', 'human_relations_grade_id', 'skill_grade_id',
            'abhyas_grade_id', 'family_ecostatus_grade_id', 'family_satsang_grade_id', 'overall_grade_id'
        ];
        gradeFields.forEach(field => {
            populateSelect(field, optionsData.gradeList, 'grade_id', 'grade_name', 'Grade');
        });

        // --- Populate Form Fields with existing data ---
        document.getElementById('sevak_evaluation_id').value = evaluationData.sevak_evaluation_id;
        document.getElementById('talim_batch_id').value = evaluationData.talim_batch_id;

        // Fetch and populate the sevak dropdown, including the current sevak
        const sevakResponse = await fetch('/SevakEvaluation/api/sevaks-by-batch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                talim_batch_id: evaluationData.talim_batch_id,
                evaluation_id: evaluationId
            })
        });
        const sevaks = await sevakResponse.json();
        const sevakSelect = document.getElementById('sevak_id');
        sevakSelect.innerHTML = '<option value="">-- Select Sevak --</option>';
        sevaks.forEach(sevak => {
            sevakSelect.innerHTML += `<option value="${sevak.sevak_id}">${sevak.ytk_id} - ${sevak.first_name} ${sevak.last_name}</option>`;
        });

        // Set all the values from the fetched evaluation
        for (const key in evaluationData) {
            const element = document.getElementById(key);
            if (element) {
                element.value = evaluationData[key];
            }
        }

    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Initialization Error:', error);
    }

    // --- Handle Form Submission ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`/SevakEvaluation/edit/${evaluationId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);
                window.location.href = '/SevakEvaluation'; // Redirect to list page
            } else {
                alert('Error: ' + (result.message || 'An unknown error occurred.'));
            }
        } catch (err) {
            console.error('Update Error:', err);
            alert('An error occurred while updating the evaluation.');
        }
    });

    // --- Dynamic Sevak Dropdown on Batch Change ---
    document.getElementById('talim_batch_id').addEventListener('change', async function () {
        const batchId = this.value;
        const sevakSelect = document.getElementById('sevak_id');
        sevakSelect.innerHTML = '<option value="">Loading...</option>';
        sevakSelect.disabled = true;

        if (!batchId) {
            sevakSelect.innerHTML = '<option value="">-- Select Sevak --</option>';
            return;
        }

        const sevakResponse = await fetch('/SevakEvaluation/api/sevaks-by-batch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ talim_batch_id: batchId, evaluation_id: evaluationId })
        });
        const sevaks = await sevakResponse.json();
        sevakSelect.innerHTML = '<option value="">-- Select Sevak --</option>';
        sevaks.forEach(sevak => {
            sevakSelect.innerHTML += `<option value="${sevak.sevak_id}">${sevak.ytk_id} - ${sevak.first_name} ${sevak.last_name}</option>`;
        });
        sevakSelect.disabled = false;
    });
});