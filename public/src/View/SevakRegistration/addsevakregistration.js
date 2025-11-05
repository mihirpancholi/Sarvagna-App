// ----------------- Add Zone Modal -----------------
document.getElementById('sevakForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    // Log formData for debugging
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    fetch('/SevakRegistration/addsevak', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                alert('Sevak registered successfully!');
                // window.location.reload();
                window.location.href = "/SevakRegistration";
            } else {
                alert('Error: ' + result.message);
            }
        });
});
// ----------------- Load Batches -----------------
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
loadBatches('addbatch');

// When Talim Batch changes, regenerate YTK ID
document.getElementById('addbatch').addEventListener('change', function () {
    generateYtkID();
});

// ----------------- Generate YTK ID -----------------
function generateYtkID() {
    const sevak_no = document.getElementById("sevak_no").value;
    const talim_batch_id = document.getElementById("addbatch").value;
    if (!sevak_no || !talim_batch_id) return;

    fetch("/SevakRegistration/generateYtkID", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sevak_no,
            talim_batch_id,
            sevak_id: 0
        })
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("ytk_id").value = data.ytk_id || "";
            if (data.is_sevak_duplicate === "Y") {
                document.getElementById("is_sevak_duplicate").style.display = "block";
                document.getElementById("sevak_no").classList.add("border-danger");
            } else {
                document.getElementById("is_sevak_duplicate").style.display = "none";
                document.getElementById("sevak_no").classList.remove("border-danger");
            }
        });
}


// ----------------- Load Selects -----------------
function loadSelect(url, selectId, options) {
    const {
        textKey,
        valueKey,
        placeholder = '-- Select --',
        selectedValue = null,
        joinWith = ' - '
    } = options;

    fetch(url)
        .then(res => res.json())
        .then(items => {
            const select = document.getElementById(selectId);
            select.innerHTML = `<option value="">${placeholder}</option>`;
            items.forEach(item => {
                const option = document.createElement('option');
                option.value = item[valueKey];
                option.textContent = Array.isArray(textKey) ? textKey.map(k => item[k]).join(joinWith) : item[textKey];
                if (selectedValue && selectedValue == item[valueKey]) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        });
}

loadSelect('/city/list', 'addcity', { textKey: 'city_name', valueKey: 'city_id' });
loadSelect('/city/list', 'per_city', { textKey: 'city_name', valueKey: 'city_id' });
loadSelect('/city/list', 'talim_city', { textKey: 'city_name', valueKey: 'city_id' });
loadSelect('/kshetra/list', 'current_kshetra', { textKey: 'kshetra_name', valueKey: 'kshetra_id' });
loadSelect('/kshetra/list', 'kshetra', { textKey: 'kshetra_name', valueKey: 'kshetra_id' });
loadSelect('/kshetra/list', 'talim_kshetra', { textKey: 'kshetra_name', valueKey: 'kshetra_id' });
loadSelect('/city/list', 'sat_ref_city_id', { textKey: 'city_name', valueKey: 'city_id' });
loadSelect('/degree/list', 'adddegree', { textKey: 'degree', valueKey: 'degree_id' });
loadSelect('/employment/list', 'employment_ids', { textKey: 'employment_name', valueKey: 'employment_id' });
loadSelect('/relationship/list', 'relationship_ids', { textKey: 'relationship_name', valueKey: 'relationship_id' });
loadSelect('/caste/list', 'addcaste', { textKey: 'caste_name', valueKey: 'caste_id' });
loadSelect('/category/list', 'addcategory', { textKey: 'category_name', valueKey: 'category_id' });
loadSelect('/blood_group/list', 'addbloodgroup', { textKey: 'blood_group_name', valueKey: 'blood_group_id' });
loadSelect('/marital_status/list', 'addmaritalstatus', { textKey: 'marital_status_name', valueKey: 'marital_status_id' });
loadSelect('/satsang_activity/list', 'satsang_activity_id', { textKey: 'satsang_activity_name', valueKey: 'satsang_activity_id' });
loadSelect('/grade/list', 'grade_id', { textKey: 'grade_name', valueKey: 'grade_id' });
loadSelect('/talent/list', 'talent_id', { textKey: 'talent_name', valueKey: 'talent_id' });
loadSelect('/gosthigroup/list', 'addgosthi', { textKey: ['group_code', 'group_name'], valueKey: 'group_id' });

function loadCountryCode(selectId) {
    fetch('/country/list')
        .then(res => res.json())
        .then(countries => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select country code --</option>';
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.dialing_code;
                option.textContent = country.country_name + ' - ' + country.dialing_code;
                select.appendChild(option);
            });
        });
}
loadCountryCode('sat_ref_mobile_country_code');
loadCountryCode('family_country_code');
loadCountryCode('mobile1_country_code');
loadCountryCode('mobile2_country_code');
loadCountryCode('whatsapp_country_code');

function getSatsangiSevak(talim_batch_id, selectId, selectedValue = null, callback = null) {
    if (!talim_batch_id) {
        document.getElementById(selectId).innerHTML = '<option value="">-- Select Sevak --</option>';
        return;
    }

    fetch(`/common/getSevakByBatch?batch_id=${talim_batch_id}`)
        .then(res => res.json())
        .then(sevaks => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select Sevak --</option>';

            sevaks.forEach(s => {
                const option = document.createElement('option');
                option.value = s.sevak_id;
                option.textContent = s.first_name + " " + s.last_name;

                if (selectedValue && selectedValue == s.sevak_id) {
                    option.selected = true;
                }

                select.appendChild(option);
            });

            if (typeof callback === "function") callback();
        })
        .catch(err => console.error("Error loading Sevaks:", err));
}


function getinspiredSevak(talim_batch_id, selectId, selectedValue = null, callback = null) {
    if (!talim_batch_id) {
        document.getElementById(selectId).innerHTML = '<option value="">-- Select Sevak --</option>';
        return;
    }

    fetch(`/common/getSevakByBatch?batch_id=${talim_batch_id}`)
        .then(res => res.json())
        .then(sevaks => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select Sevak --</option>';

            sevaks.forEach(s => {
                const option = document.createElement('option');
                option.value = s.sevak_id;
                option.textContent = s.first_name + " " + s.last_name;

                if (selectedValue && selectedValue == s.sevak_id) {
                    option.selected = true;
                }

                select.appendChild(option);
            });

            if (typeof callback === "function") callback();
        })
        .catch(err => console.error("Error loading Sevaks:", err));
}

// ---------------- Load Talim Batch for referees ----------------
loadBatches('satsangi_batch_id');
loadBatches('inpired_batch_id');

document.getElementById('satsangi_batch_id').addEventListener('change', function () {
    const batchId = this.value;
    getSatsangiSevak(batchId, 'satsangi_sevak_id');
});

document.getElementById('inpired_batch_id').addEventListener('change', function () {
    const batchId = this.value;
    getinspiredSevak(batchId, 'inspired_sevak_id');
});



// ----------------- City Change -----------------
function handleCityChange(cityId, areaSelectId, pincodeSelectId, prefix = '') {
    if (!cityId) return;

    // Areas
    fetch(`/common/getcityareabycity?city_id=${cityId}`)
        .then(res => res.json())
        .then(cityAreas => {
            const areaSelect = document.getElementById(areaSelectId);
            areaSelect.innerHTML = '<option value="">-- Select City Area --</option>';
            cityAreas.forEach(ca => {
                const option = document.createElement('option');
                option.value = ca.city_area_id;
                option.textContent = ca.area_name;
                areaSelect.appendChild(option);

            });

        });



    // Pincode
    fetch(`/common/getpincodebycity?city_id=${cityId}`)
        .then(res => res.json())
        .then(pincodes => {
            const pincodeSelect = document.getElementById(pincodeSelectId);
            pincodeSelect.innerHTML = '<option value="">-- Select Pincode --</option>';
            pincodes.forEach(pin => {
                const option = document.createElement('option');
                option.value = pin.pin_id;
                option.textContent = pin.pincode;
                pincodeSelect.appendChild(option);
            });
        });

    // Taluka/District/State/Country
    fetch(`/common/getcitydetails?city_id=${cityId}`)
        .then(res => res.json())
        .then(details => {
            if (!details || details.length === 0) return;
            const d = details[0];

            document.getElementById(prefix + 'taluka_name').value = d.taluka_name || "";
            document.getElementById(prefix + 'taluka_id').value = d.taluka_id || "";

            document.getElementById(prefix + 'district_name').value = d.district_name || "";
            document.getElementById(prefix + 'district_id').value = d.district_id || "";

            document.getElementById(prefix + 'state_name').value = d.state_name || "";
            document.getElementById(prefix + 'state_id').value = d.state_id || "";

            document.getElementById(prefix + 'country_name').value = d.country_name || "";
            document.getElementById(prefix + 'country_id').value = d.country_id || "";

            getMandirDiv(cityId);

        });


}

function getMandirDiv(cityId) {
    const shikharMandirId = document.getElementById('shikhar_mandir_id').getAttribute('data-selected') || 0;
    const hariMandirId = document.getElementById('hari_mandir_id').getAttribute('data-selected') || 0;

    fetch(`/SevakRegistration/getMandir`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            city_id: cityId, // ✅ send city_id now
            shikhar_mandir_id: shikharMandirId,
            hari_mandir_id: hariMandirId
        })
    })
        .then(res => res.json())
        .then(obj => {
            if (obj.country_id == 2) {
                document.getElementById('withIndiaDiv').style.display = 'block';
                document.getElementById('withoutIndiaDiv').style.display = 'none';
            } else {
                document.getElementById('withIndiaDiv').style.display = 'none';
                document.getElementById('withoutIndiaDiv').style.display = 'block';
            }

            document.getElementById('shikhar_mandir_id').innerHTML = obj.shikhar_mandir || '';
            document.getElementById('hari_mandir_id').innerHTML = obj.hari_mandir || '';

            // Update chosen/select2 if used
            $('#shikhar_mandir_id').trigger('chosen:updated');
            $('#hari_mandir_id').trigger('chosen:updated');
        })
        .catch(err => console.error('Error fetching mandir data:', err));
}

document.getElementById('addcity').addEventListener('change', () =>
    handleCityChange(document.getElementById('addcity').value, 'addcityarea', 'addpincode', '')
);
document.getElementById('per_city').addEventListener('change', () =>
    handleCityChange(document.getElementById('per_city').value, 'per_city_area', 'per_pincode', 'per_')
);
document.getElementById('talim_city').addEventListener('change', () =>
    handleCityChange(document.getElementById('talim_city').value, 'talim_city_area', 'talim_pincode', 'talim_')
);

// ----------------- Kshetra Change -----------------
function handleKshetraChange(selectId, prefix = '') {
    const kshetraSelect = document.getElementById(selectId);
    kshetraSelect.addEventListener('change', function () {
        const kshetra_id = this.value;
        if (!kshetra_id) return;

        fetch(`/common/getkshetradetails?kshetra_id=${kshetra_id}`)
            .then(res => res.json())
            .then(data => {
                if (!data || data.length === 0) return;
                const k = data[0];

                // Populate the visible readonly field with the name
                document.getElementById(prefix + 'sant_nirdeshak_name').value = k.sant_nirdeshak_name || "";
                // Populate the hidden field with the ID
                document.getElementById(prefix + 'sant_nirdeshak').value = k.sant_nirdeshak_id || "";

                document.getElementById(prefix + 'nirdeshak_name').value = k.nirdeshak_name || "";
                document.getElementById(prefix + 'nirdeshak').value = k.nirdeshak_id || "";

                document.getElementById(prefix + 'mandir_name').value = k.mandir_name || "";
                document.getElementById(prefix + 'mandir').value = k.mandir_id || "";

                document.getElementById(prefix + 'mandir_type').value = k.mandir_type || "";
            });
    });
}

handleKshetraChange('current_kshetra', 'current_');
handleKshetraChange('kshetra', '');
handleKshetraChange('talim_kshetra', 'talim_');

// ----------------- Checkbox Logic -----------------
$('#is_perm_add').change(function () {
    if (this.checked) { // If "Same as Current" is checked...
        $('#permanent_address').hide(); // ...hide the fields.
    } else { // If it's unchecked...
        $('#permanent_address').show(); // ...show the fields for manual entry.
    }
}).prop('checked', true).trigger('change');

$('#is_talim_add').change(function () {
    if (this.checked) { // If "Same as Current" is checked...
        $('#talim_address').hide(); // ...hide the fields.
    } else { // If it's unchecked...
        $('#talim_address').show(); // ...show the fields for manual entry.
    }
}).prop('checked', true).trigger('change');

document.addEventListener("DOMContentLoaded", () => {
    const ytkCheckbox = document.getElementById("ytk_sevak_satsangi");
    const ytkFields = document.getElementById("ytk_sevak_fields");
    const refFields = document.getElementById("ref_fields");

    function toggleFields() {
        if (ytkCheckbox.checked) {
            ytkFields.style.display = "block";
            refFields.style.display = "none";
        } else {
            ytkFields.style.display = "none";
            refFields.style.display = "block";
        }
    }
    // Bind change event
    ytkCheckbox.addEventListener("change", toggleFields);
    // Run once on page load (in case editing an existing record)
    toggleFields();
});

document.addEventListener("DOMContentLoaded", () => {
    const ytkCheckbox1 = document.getElementById("ytk_sevak_inspired");
    const ytkFields = document.getElementById("ytk_inspired_fields");
    const refFields = document.getElementById("ins_ref_fields");

    function toggleFields() {
        if (ytkCheckbox1.checked) {
            ytkFields.style.display = "block";
            refFields.style.display = "none";
        } else {
            ytkFields.style.display = "none";
            refFields.style.display = "block";
        }
    }
    // Bind change event
    ytkCheckbox1.addEventListener("change", toggleFields);
    // Run once on page load (in case editing an existing record)
    toggleFields();
});

// ---------------- Education ----------------
function insertEducation() {
    let current_table_row_education = parseInt($('#current_table_row_education').val() || 0);

    current_table_row_education++;
    let table = document.getElementById("educationInvoice").getElementsByTagName('tbody')[0];
    let row = table.insertRow(-1);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.innerHTML = `<select  name="degree_id[]" id="degree_id_${current_table_row_education}" required>
                                <option value="">-- Select Degree --</option>
                            </select>`;
    cell2.innerHTML = `<select  name="specialization_id[]" id="specialization_id_${current_table_row_education}">
                                <option value="">-- Select Specialization --</option>
                            </select>`;
    cell3.innerHTML = `<input type="text" name="edu_remark[]"  >`;
    cell4.innerHTML = `<a href="#" onclick="DeleteEducationRow(this, event)"> Delete</a>
`;

    $('#current_table_row_education').val(current_table_row_education);

    // Load degrees for the new row
    loadSelect('/degree/list', `degree_id_${current_table_row_education}`, { textKey: 'degree', valueKey: 'degree_id' });
}

function DeleteEducationRow(r, e) {
    e.preventDefault(); // stop page from jumping
    let i = r.parentNode.parentNode.rowIndex;
    document.getElementById("educationInvoice").deleteRow(i);
}

// Use event delegation for dynamically added education rows
document.getElementById('educationInvoice').addEventListener('change', function (e) {
    // Check if the changed element is a degree dropdown
    if (e.target && e.target.matches('select[name="degree_id[]"]')) {
        const degreeId = e.target.value;
        const row = e.target.closest('tr');
        const specializationSelect = row.querySelector('select[name="specialization_id[]"]');
        getSpecializationByDegree(degreeId, specializationSelect.id);
    }
});

// ----------------- Get Specialization by Degree -----------------
function getSpecializationByDegree(degree_id, selectId, selectedValue = null) {
    const select = document.getElementById(selectId);
    if (!degree_id) {
        select.innerHTML = '<option value="">-- Select Specialization --</option>';
        return;
    }

    fetch(`/SevakRegistration/getSpecializationByDegree?degree_id=${degree_id}`)
        .then(res => res.json())
        .then(specializations => {
            select.innerHTML = '<option value="">-- Select Specialization --</option>';
            specializations.forEach(spec => {
                const option = document.createElement('option');
                option.value = spec.specialization_id;
                option.textContent = spec.specialization;
                if (selectedValue && selectedValue == spec.specialization_id) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        })
        .catch(err => console.error("Error loading Specializations:", err));
}

// ---------------- Employment ----------------
function insertEmployment() {
    let current_table_row_employment = parseInt($('#current_table_row_employment').val() || 0);
    current_table_row_employment++;

    let table = document.getElementById("employmentInvoice").getElementsByTagName('tbody')[0];
    let row = table.insertRow(-1);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.innerHTML = `<select  name="employment_id[]" id="employment_id_${current_table_row_employment}">
                          <option value="">Select Employment Type</option>
                       </select>`;
    cell2.innerHTML = `<input type="text"  name="emp_detail[]" >`;
    cell3.innerHTML = `<input type="text"  name="post_designation[]" >`;
    cell4.innerHTML = `<input type="text"  name="emp_remark[]" >`;
    cell5.innerHTML = `<a href="#" onclick="DeleteEmploymentRow(this, event)"> Delete</a>`;

    $('#current_table_row_employment').val(current_table_row_employment);

    // reload employment select
    loadSelect('/employment/list', `employment_id_${current_table_row_employment}`, { textKey: 'employment_name', valueKey: 'employment_id' });
}

function DeleteEmploymentRow(r, e) {
    e.preventDefault();
    let i = r.parentNode.parentNode.rowIndex;
    document.getElementById("employmentInvoice").deleteRow(i);
}

function insertFamily() {
    let current_table_row_family = parseInt($('#current_table_row_family').val() || 0);
    current_table_row_family++;

    let table = document.getElementById("familyInvoice").getElementsByTagName('tbody')[0];
    let row = table.insertRow(-1);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);

    cell1.innerHTML = `<select  name="relationship_id[]" id="relationship_id_${current_table_row_family}">
                          <option value="">Select Relationship</option>
                       </select>`;
    cell2.innerHTML = `<input type="text"  name="family_name[]">`;
    cell3.innerHTML = `<select  name="family_country_code[]" id="family_country_code_${current_table_row_family}">
                          <option value="">---</option>
                       </select>`;
    cell4.innerHTML = `<input type="number"  name="family_mobile[]" maxlength="10" minlength="10" title="Please Enter 10 Digit Mobile No">`;
    cell5.innerHTML = `<input type="email"  name="family_email[]" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">`;
    cell6.innerHTML = `<input type="text"  name="family_occupation[]">`;
    cell7.innerHTML = `<a href="#" onclick="DeleteFamilyRow(this, event)"> Delete</a>`;

    $('#current_table_row_family').val(current_table_row_family);

    // reload relationship + country code
    loadSelect('/relationship/list', `relationship_id_${current_table_row_family}`, { textKey: 'relationship_name', valueKey: 'relationship_id' });
    loadCountryCode(`family_country_code_${current_table_row_family}`);
}

function DeleteFamilyRow(r, e) {
    e.preventDefault();
    let i = r.parentNode.parentNode.rowIndex;
    document.getElementById("familyInvoice").deleteRow(i);
}

// ---------------- Satsang Seva ----------------
function insertSatsang() {
    let current_table_row_satsang = parseInt($('#current_table_row_satsang').val() || 0);
    current_table_row_satsang++;

    let table = document.getElementById("satsangInvoice").getElementsByTagName('tbody')[0];
    let row = table.insertRow(-1);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    // Activity dropdown
    cell1.innerHTML = `<select  name="satsang_activity_id[]" id="satsang_activity_id_${current_table_row_satsang}">
                            <option value="">-- Select Activity --</option>
                       </select>`;

    // Designation dropdown
    cell2.innerHTML = `<select  id="satsang_designation_id_${current_table_row_satsang}" name="satsang_designation_id[]"></select>`;

    // Details input
    cell3.innerHTML = `<input type="text"  name="seva_details[]" >`;

    // Delete link
    cell4.innerHTML = `<a href="#" onclick="DeleteSatsangRow(this, event)"> Delete</a>`;

    $('#current_table_row_satsang').val(current_table_row_satsang);

    // Load activities dynamically
    loadSelect('/satsang_activity/list', `satsang_activity_id_${current_table_row_satsang}`, { textKey: 'satsang_activity_name', valueKey: 'satsang_activity_id' });
}

function DeleteSatsangRow(r, e) {
    e.preventDefault(); // prevent page jump
    let i = r.parentNode.parentNode.rowIndex;
    document.getElementById("satsangInvoice").deleteRow(i);
}

// Use event delegation for dynamically added satsang rows
document.getElementById('satsangInvoice').addEventListener('change', function (e) {
    // Check if the changed element is an activity dropdown
    if (e.target && e.target.matches('select[name="satsang_activity_id[]"]')) {
        const activityId = e.target.value;
        const row = e.target.closest('tr');
        const designationSelect = row.querySelector('select[name="satsang_designation_id[]"]');
        getSatsangDesignation(activityId, designationSelect.id);
    }
});

function InsertTalent() {
    let current_table_row_talent = parseInt($('#current_table_row_talent').val() || 0);
    current_table_row_talent++;

    let table = document.getElementById("talentInvoice").getElementsByTagName('tbody')[0];
    let row = table.insertRow(-1);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    // Activity dropdown
    cell1.innerHTML = `<select  name="talent_id[]" id="talent_id_${current_table_row_talent}">
                                    <option value="">-- Select Activity --</option>
                       </select>`;

    // Designation dropdown
    cell2.innerHTML = `<select  id="grade_id_${current_table_row_talent}" name="grade_id[]">
                <option value="">-- Select Grade --</option>
                </select>`;

    // Details input
    cell3.innerHTML = `<input type="text"  name="talent_detail[]" >`;

    // Delete link
    cell4.innerHTML = `<a href="#" onclick="DeleteTalentRow(this, event)"> Delete</a>`;

    $('#current_table_row_talent').val(current_table_row_talent);
    loadSelect('/grade/list', `grade_id_${current_table_row_talent}`, { textKey: 'grade_name', valueKey: 'grade_id' });
    loadSelect('/talent/list', `talent_id_${current_table_row_talent}`, { textKey: 'talent_name', valueKey: 'talent_id' });

}

function DeleteTalentRow(r, e) {
    e.preventDefault(); // prevent page jump
    let i = r.parentNode.parentNode.rowIndex;
    document.getElementById("talentInvoice").deleteRow(i);
}

function getSatsangDesignation(satsang_activity_id, selectId, selectedValue = null, callback = null) {
    if (!satsang_activity_id) {
        document.getElementById(selectId).innerHTML = '<option value="">-- Select Designation --</option>';
        return;
    }

    fetch(`/common/getSatsangDesignation?satsang_activity_id=${satsang_activity_id}`)
        .then(res => res.json())
        .then(designations => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select Designation --</option>';

            designations.forEach(d => {
                const option = document.createElement('option');
                option.value = d.satsang_designation_id;
                option.textContent = d.satsang_designation_name;

                if (selectedValue && selectedValue == d.satsang_designation_id) {
                    option.selected = true;
                }

                select.appendChild(option);
            });

            if (typeof callback === "function") callback();
        })
        .catch(err => console.error("Error loading Designations:", err));
}

$(document).ready(function () {
    $('#sameprimaryno').on('change', function () {
        if ($(this).is(':checked')) {
            $('#whatsapp_country_code').val($('#mobile1_country_code').val());
            $('#contact_whatsapp_no').val($('#contact_mobile1').val());
        } else {
            $('#whatsapp_country_code').val('');
            $('#contact_whatsapp_no').val('');
        }
    });
});

$('#maritalStatusDate').hide();

$('#addmaritalstatus').on('change', function () {
    const val = $(this).val();

    if (val === "3") { // Engaged
        $('#maritalStatusDate').show();
        $('#marital_date').prop('required', true);
        $('#engagedDate').show();
        $('#marriedDate').hide();
    } else if (val === "2") { // Married
        $('#maritalStatusDate').show();
        $('#marital_date').prop('required', true);
        $('#marriedDate').show();
        $('#engagedDate').hide();
    } else { // Single, Divorced, etc.
        $('#maritalStatusDate, #engagedDate, #marriedDate').hide();
        $('#marital_date').prop('required', false);
    }
});


$("#admitted_div").hide();
$("#certified_div").hide();
$("#not_complete_div").hide();
$("#temporary_div").hide();
$("#expired_div").hide();
$("#sant_in_baps_div").hide();
$('#withoutIndiaDiv').hide();


function notCompleteDiv() {
    var checkbox = document.getElementById("not_complete").checked;
    if (checkbox == true) {
        $("#not_complete_div").show();
    } else {
        $("#not_complete_div").hide();
    }
}

function temporaryDiv() {
    var checkbox = document.getElementById("temporary").checked;
    if (checkbox == true) {
        $("#temporary_div").show();
    } else {
        $("#temporary_div").hide();
    }
}

function expiredDiv() {
    var checkbox = document.getElementById("expired").checked;
    if (checkbox == true) {
        $("#expired_div").show();
    } else {
        $("#expired_div").hide();
    }
}

function santInBapsDiv() {
    var checkbox = document.getElementById("sant_in_baps").checked;
    if (checkbox == true) {
        $("#sant_in_baps_div").show();
    } else {
        $("#sant_in_baps_div").hide();
    }
}

$(document).ready(function () {
    $("#certified").on("change", function () {
        if (this.checked) {
            //Disable unwanted checkbox & associative date
            $("#temporary").prop("disabled", true);
            $("#temporary_date").prop("disabled", true);
            $("#not_complete").prop("disabled", true);
            $("#not_complete_date").prop("disabled", true);
            //Enable Other wanted checkbox & associative date
            $("#certified").prop("disabled", false);
            $("#certified_date").prop("disabled", false);
            // $("#admitted").prop("disabled", false);
            // $("#admitted_date").prop("disabled", false);
            $("#expired").prop("disabled", false);
            $("#expired_date").prop("disabled", false);
            $("#sant_in_baps").prop("disabled", false);
            $("#sant_in_baps_date").prop("disabled", false);
        } else {
            $("#temporary").prop("disabled", false);
            $("#temporary_date").prop("disabled", false);
            $("#not_complete").prop("disabled", false);
            $("#not_complete_date").prop("disabled", false);
            $("#certified").prop("disabled", false);
            $("#certified_date").prop("disabled", false);
            // $("#admitted").prop("disabled", false);
            // $("#admitted_date").prop("disabled", false);
            $("#expired").prop("disabled", false);
            $("#expired_date").prop("disabled", false);
            $("#sant_in_baps").prop("disabled", false);
            $("#sant_in_baps_date").prop("disabled", false);
        }
    });

    $("#not_complete").on("change", function () {
        if (this.checked) {
            //Disable unwanted checkbox & associative date
            $("#temporary").prop("disabled", true);
            $("#temporary_date").prop("disabled", true);
            $("#certified").prop("disabled", true);
            $("#certified_date").prop("disabled", true);
            //Enable Other wanted checkbox & associative date
            $("#admitted").prop("disabled", false);
            $("#admitted_date").prop("disabled", false);
            $("#not_complete").prop("disabled", false);
            $("#not_complete_date").prop("disabled", false);
            $("#sant_in_baps").prop("disabled", false);
            $("#sant_in_baps_date").prop("disabled", false);
            $("#expired").prop("disabled", false);
            $("#expired_date").prop("disabled", false);

        } else {
            $("#temporary").prop("disabled", false);
            $("#temporary_date").prop("disabled", false);
            $("#not_complete").prop("disabled", false);
            $("#not_complete_date").prop("disabled", false);
            $("#certified").prop("disabled", false);
            $("#certified_date").prop("disabled", false);
            $("#admitted").prop("disabled", false);
            $("#admitted_date").prop("disabled", false);
            $("#expired").prop("disabled", false);
            $("#expired_date").prop("disabled", false);
            $("#sant_in_baps").prop("disabled", false);
            $("#sant_in_baps_date").prop("disabled", false);
        }
    });

    $("#temporary").on("change", function () {
        if (this.checked) {
            //Disable unwanted checkbox & associative date
            $("#not_complete").prop("disabled", true);
            $("#not_complete_date").prop("disabled", true);
            $("#certified").prop("disabled", true);
            $("#certified_date").prop("disabled", true);
            //Enable Other wanted checkbox & associative date
            $("#temporary").prop("disabled", false);
            $("#temporary_date").prop("disabled", false);
            $("#expired").prop("disabled", false);
            $("#expired_date").prop("disabled", false);
            $("#admitted").prop("disabled", false);
            $("#admitted_date").prop("disabled", false);
            $("#sant_in_baps").prop("disabled", false);
            $("#sant_in_baps_date").prop("disabled", false);
        } else {
            $("#temporary").prop("disabled", false);
            $("#temporary_date").prop("disabled", false);
            $("#not_complete").prop("disabled", false);
            $("#not_complete_date").prop("disabled", false);
            $("#certified").prop("disabled", false);
            $("#certified_date").prop("disabled", false);
            $("#admitted").prop("disabled", false);
            $("#admitted_date").prop("disabled", false);
            $("#expired").prop("disabled", false);
            $("#expired_date").prop("disabled", false);
            $("#sant_in_baps").prop("disabled", false);
            $("#sant_in_baps_date").prop("disabled", false);
        }
    });
});

function toggleStatus(status) {
    console.log(status);
    if (status == 'Admitted') {
        $("#Admitted").prop("disabled", false);
        $("#Certified").prop("disabled", false);
        $("#NotComplete").prop("disabled", true);
        $("#Expired").prop("disabled", false);
        $("#Temporary").prop("disabled", true);
        $("#SantinBAPS").prop("disabled", false);
    } else if (status == '') {

    } else if (status == '') {

    } else {
        $("#Admitted").prop("disabled", true);
        $("#Certified").prop("disabled", true);
        $("#NotComplete").prop("disabled", true);
        $("#Expired").prop("disabled", true);
        $("#Temporary").prop("disabled", true);
        $("#SantinBAPS").prop("disabled", true);
    }
    $('#status').trigger("chosen:updated");
}

// ----------------- Satasangi Since Logic -----------------
function birthdateWiseSatsangiSinceChange() {
    const birthDate = $('#birth_date').val();
    if (!birthDate) return;

    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const satsangSelect = $('#satasangi_since');

    satsangSelect.empty();

    for (let year = birthYear; year <= currentYear; year++) {
        satsangSelect.append(`<option value="${year}">${year}</option>`);
    }

    // If there's a pre-selected value (for editing), try to set it
    const preSelectedYear = $('#hidden_satasangi_since').val();
    if (preSelectedYear) {
        satsangSelect.val(preSelectedYear);
    }
}

// Attach the event listener
$('#birth_date').on('change', birthdateWiseSatsangiSinceChange);

// Trigger on page load to populate if a birth date is already set
$(document).ready(function () {
    birthdateWiseSatsangiSinceChange();
});
