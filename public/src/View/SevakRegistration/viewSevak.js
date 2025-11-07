
function LoadGosthiSchedule() {
    fetch("/SevakRegistration/allSevakData") // This endpoint should return an object with a 'data' property that is an array
        .then((res) => res.json())
        .then((data) => {
            if (!data || !Array.isArray(data.data)) { // Check if data.data is an array
                console.error("Data.data is not an array or data is null:", data);
                return;
            }

            const tableBody = document.getElementById("sevak-datatable");
            tableBody.innerHTML = "";

            data.data.forEach((schedule, index) => {
                const row = document.createElement("tr"); // Iterate over data.data
                row.innerHTML = `
          <td>${schedule.ytk_id || ""}</td>
          <td>${schedule.sevak_name || ""}</td>
          <td>${schedule.city_name || ""}</td>
<td>${schedule.area_name || ""}</td>
<td>${schedule.taluka_name || ""}</td>
<td>${schedule.district_name || ""}</td>
<td>${schedule.country_name || ""}</td>
<td>${schedule.kshetra_name || ""}</td>
<td>${schedule.kshetra_code || ""}</td>
<td>${schedule.mandir || ""}</td>
<td>${schedule.contact_mobile1 || ""}</td>
<td>${schedule.contact_mobile2 || ""}</td>
<td>${schedule.contact_phone_1 || ""}</td>
<td>${schedule.contact_phone_2 || ""}</td>
<td>${schedule.contact_res_phone1 || ""}</td>
<td>${schedule.contact_res_phone2 || ""}</td>
<td>${schedule.contact_whatsapp_no || ""}</td>
<td>${schedule.birth_date || ""}</td>
<td>${schedule.employment_name || ""}</td>
<td>${schedule.employment_detail || ""}</td>
<td>${schedule.sevak_education || ""}</td>
<td>${schedule.specialization || ""}</td>
<td>${schedule.caste_name || ""}</td>
<td>${schedule.marriage_date || ""}</td>
<td>${schedule.grade_action || ""}</td>
<td>${schedule.contact_per_mail || ""}</td>
<td>${schedule.contact_bus_mail || ""}</td>
<td>${schedule.sant_nirdeshak || ""}</td>
<td>${schedule.satsang_activity_name || ""}</td>
<td>${schedule.satsang_designation_name || ""}</td>
<td>${schedule.address || ""}</td>

<td><a href="/SevakRegistration/edit/${schedule.sevak_id}" class="btn btn-sm btn-warning">Edit</a></td>
<td><a href="#" onclick="deleteSevakData(${schedule.sevak_id})" class="btn btn-sm btn-danger">Delete</a></td>

        `;
                tableBody.appendChild(row);
            });
        })
        .catch((err) => console.error("Error loading Gosthi Schedule:", err));
}

LoadGosthiSchedule();


// Load all filter dropdowns on page load
function loadBatches(selectId) {
    fetch('/talim_batch/list')
        .then(res => res.json())
        .then(batches => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select Batch --</option>';
            batches.forEach(batch => {
                const option = document.createElement('option');
                option.value = batch.talim_batch_id;
                option.textContent = batch.talim_year + ' - ' + batch.talim_batch;
                select.appendChild(option);
            });
        });
}
loadBatches('talim_batch_id');

loadSelect('/degree/list', 'degree_id', { textKey: 'degree', valueKey: 'degree_id', placeholder: '--Select Degree--' });
loadSelect('/city/list', 'city_id', { textKey: 'city_name', valueKey: 'city_id', placeholder: '--Select City--' });
loadSelect('/district/list', 'district_id', { textKey: 'district_name', valueKey: 'district_id', placeholder: '--Select District--' });
loadSelect('/grade/list', 'grade_id', { textKey: 'grade_name', valueKey: 'grade_id', placeholder: '--Select Grade--' });
loadSelect('/marital_status/list', 'marital_status_id', { textKey: 'marital_status_name', valueKey: 'marital_status_id', placeholder: '--Marital Status--' });
loadSelect('/mandir/list', 'mandir', { textKey: 'mandir_name', valueKey: 'mandir_name', placeholder: '--Select Mandir--' });
loadSelect('/zone/list', 'zone_id', { textKey: 'zone_name', valueKey: 'zone_id', placeholder: '--Select Region--' });
loadSelect('/employment/list', 'employment_id', { textKey: 'employment_name', valueKey: 'employment_id', placeholder: '--Select Occupation--' });
loadSelect('/satsang_activity/list', 'satsang_activity_id', { textKey: 'satsang_activity_name', valueKey: 'satsang_activity_id', placeholder: '--Select Satsang Activity--' });
loadSelect('/satsang_designation/list', 'satsang_designation_id', { textKey: 'satsang_designation_name', valueKey: 'satsang_designation_id', placeholder: '--Select Satsang Designation--' });
loadSelect('/kshetra/list', 'kshetra_id', { textKey: 'kshetra_name', valueKey: 'kshetra_id', placeholder: '--Select Kshetra--' });
loadSelect('/specialization/list', 'specialization_id', { textKey: 'specialization', valueKey: 'specialization_id', placeholder: '--Select Specialization--' });
loadSelect('/gosthigroup/list', 'group_id', { textKey: 'group_name', valueKey: 'group_id', placeholder: '--Select Goshthi Group--' });
// Simplified status dropdown
const statusSelect = document.getElementById('status');
statusSelect.innerHTML = `
        <option value="">--Select Status--</option>
        <option value="Certified">Certified</option>
        <option value="Not Complete">Not Complete</option>
        <option value="Temporary">Temporary</option>
        <option value="Expired">Expired</option>
        <option value="Sant in BAPS">Sant in BAPS</option>
    `;

// Search button click handler
document.getElementById('searchBtn').addEventListener('click', function () {
    load_data_search();
});

function operation(radio_val) {
    if (radio_val === 'AllSevak') {
        jQuery('#filterSevak').hide();
        jQuery('#allSevakListTb').show();
        jQuery('#searchingListTb').hide();
    } else if (radio_val === 'Sevak') {
        jQuery('#filterSevak').show();
        jQuery('#allSevakListTb').hide();
        $('#searchingListTb').show();
    }
}

function load_data_search() {
    const form = document.getElementById('filterForm');
    const formData = new FormData(form);

    fetch("/SevakRegistration/sevakFilterData", {
        method: 'POST',
        body: new URLSearchParams(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            const searchContainer = document.getElementById("searchingListTb");
            if (!searchContainer) {
                console.error("Could not find the table body for the search results.");
                return;
            }
            searchContainer.innerHTML = html;
            if (typeof $('#sevakSearch-datatable').DataTable === 'function') {
                $('#sevakSearch-datatable').DataTable();
            }
        })
        .catch(error => console.error('Error during search:', error));
}
function getSevakId(sevak_id) {
    fetch(`/SevakRegistration/OverAllRemark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sevak_id })
    }).then(res => res.text()).then(data => {
        document.getElementById('gradeRemarktb').innerHTML = data;
    });
}

function getSevakPassword(sevak_id) {
    fetch(`/SevakRegistration/checkSevakPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sevak_id })
    }).then(res => res.text()).then(data => {
        document.getElementById('sevakPasswordtb').innerHTML = data;
    });
}

function getCurrentSevakDetail(sevak_id) {
    fetch(`/SevakRegistration/CurrentSevakDetail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sevak_id })
    }).then(res => res.text()).then(data => {
        document.getElementById('sevakDetailtb').innerHTML = data;
    });
}

function deleteSevakData(sevak_id) {
    if (confirm("Are you sure you want to delete?")) {
        fetch(`/SevakRegistration/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sevak_id })
        }).then(res => res.json()).then(response => {
            if (response.success) {
                alert('Sevak deleted successfully.');
                window.location.reload();
            } else {
                alert('Error deleting sevak.');
            }
        });
    }
}

function loadSelect(url, selectId, options) {
    const {
        textKey,
        valueKey,
        placeholder = '-- Select --'
    } = options;

    fetch(url)
        .then(res => res.json())
        .then(items => {
            const select = document.getElementById(selectId);
            select.innerHTML = `<option value="">${placeholder}</option>`;
            items.forEach(item => {
                const option = document.createElement('option');
                option.value = item[valueKey];
                option.textContent = item[textKey];
                select.appendChild(option);
            });
        });
}