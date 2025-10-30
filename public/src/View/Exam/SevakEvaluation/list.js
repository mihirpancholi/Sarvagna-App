document.addEventListener('DOMContentLoaded', function () {
    const filterContainer = document.getElementById('filterSevak');
    const searchBtn = document.getElementById('searchBtn');
    const tableBody = document.getElementById('evaluation-table-body');

    // Populate filter dropdowns
    fetch('/SevakEvaluation/filter-options')
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                const { data } = response;
                populateSelect('talim_batch_id', data.talimBatchList, 'talim_batch_id', ['talim_year', 'talim_batch'], 'Talim Batch');
                populateSelect('city_id', data.cityList, 'city_id', 'city_name', 'City');
                populateSelect('grade_id', data.gradeList, 'grade_id', 'grade_name', 'Overall Grade');
                populateSelect('kshetra_id', data.kshetraList, 'kshetra_id', 'kshetra_name', 'Kshetra');
                populateSelect('district_id', data.districtList, 'district_id', 'district_name', 'District');
                populateSelect('degree_id', data.degreeList, 'degree_id', 'degree', 'Degree');
                populateSelect('group_id', data.groupList, 'group_id', 'group_name', 'Goshthi Group');
                populateSelect('mandir', data.mandirList, 'mandir_id', 'mandir_name', 'Mandir');
                populateSelect('zone_id', data.zoneList, 'zone_id', 'zone_name', 'Region');
                populateSelect('satsang_activity_id', data.satsangActivityList, 'satsang_activity_id', 'satsang_activity_name', 'Satsang Activity');
                populateSelect('satsang_designation_id', data.satsangDesignationList, 'satsang_designation_id', 'satsang_designation_name', 'Satsang Designation');
            }
        });

    // Initial data load
    loadTableData();

    // Filter button click
    searchBtn.addEventListener('click', () => {
        const filters = getFilterValues();
        loadTableData(filters);
    });

    // Radio button logic
    window.operation = function (value) {
        if (value === 'Sevak') {
            filterContainer.style.display = 'block';
        } else {
            filterContainer.style.display = 'none';
            loadTableData(); // Reload all data
        }
    };
});

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

function getFilterValues() {
    const form = document.getElementById('filterForm');
    const formData = new FormData(form);
    const filters = {};
    for (let [key, value] of formData.entries()) {
        if (value) filters[key] = value;
    }
    return filters;
}

function loadTableData(filters = {}) {
    const tableBody = document.getElementById('evaluation-table-body');
    tableBody.innerHTML = '<tr><td colspan="12">Loading...</td></tr>';

    fetch('/SevakEvaluation/filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
    })
        .then(res => res.json())
        .then(response => {
            tableBody.innerHTML = '';
            if (response.success && response.data.length > 0) {
                response.data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                            <td>${row.talim_batch || ''}</td>
                            <td>${row.sevak_name || ''}</td>
                            <td>${row.city_name || ''}</td>
                            <td>${createRemarkLink(row, 'satsang')}</td>
                            <td>${createRemarkLink(row, 'seva')}</td>
                            <td>${createRemarkLink(row, 'humanRelations')}</td>
                            <td>${createRemarkLink(row, 'skill')}</td>
                            <td>${createRemarkLink(row, 'education')}</td>
                            <td>${createRemarkLink(row, 'familyEcostatus')}</td>
                            <td>${createRemarkLink(row, 'familySatsang')}</td>
                            <td>${createRemarkLink(row, 'overall')}</td>
                            <td>
                                <a href="/SevakEvaluation/edit/${row.sevak_evaluation_id}">Edit</a> |
                                <a href="#" onclick="deleteEvaluation(${row.sevak_evaluation_id}, event)">Delete</a> |
                                <a href="/SevakEvaluation/print/${row.sevak_evaluation_id}" target="_blank">Print</a>
                            </td>
                        `;
                    tableBody.appendChild(tr);
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="12">No data found.</td></tr>';
            }
        });
}

function createRemarkLink(row, type) {
    const grade = row[`${type}Grade`] || '';
    // Handle the special case for 'education' which maps to 'abhyas_notes'
    const notesKey = (type === 'education')
        ? 'abhyas_notes'
        : type.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`) + '_notes';
    const notes = row[notesKey] || '';
    if (notes) {
        return `${grade} <a href="#" onclick="showRemarkModal('${type}', ${row.sevak_evaluation_id}, event)" class="text-blue-500 hover:underline ml-1">(i)</a>`;
    }
    return grade;
}

function showRemarkModal(type, id, event) {
    event.preventDefault();
    fetch(`/SevakEvaluation/remarks/${type}/${id}`)
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                document.getElementById('remarkModalTitle').textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Remark`;
                document.getElementById('remarkModalBody').textContent = response.remark;
                document.getElementById('remarkModal').style.display = 'block';
            }
        });
}

function closeRemarkModal() {
    document.getElementById('remarkModal').style.display = 'none';
}

function deleteEvaluation(id, event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this evaluation?')) {
        fetch(`/SevakEvaluation/delete/${id}`, {
            method: 'POST'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    loadTableData(getFilterValues()); // Refresh the table
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(err => {
                console.error('Delete Error:', err);
                alert('An error occurred during deletion.');
            });
    }
}