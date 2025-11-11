// ----------------- Add/Update Form Submission -----------------
document.getElementById('sevakForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const sevakId = getSevakIdFromUrl();

    let url = '/SevakRegistration/addsevak'; // Default to add

    if (sevakId) {
        url = '/SevakRegistration/updatesevak'; // URL for updates
        formData.append('sevak_id', sevakId);
    }

    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                alert(sevakId ? 'Sevak updated successfully!' : 'Sevak registered successfully!');
                window.location.href = "/SevakRegistration";
            } else {
                alert('Error: ' + (result.message || 'Unknown error'));
            }
        })
        .catch(err => {
            alert('A network error occurred: ' + err.message);
        });
});

loadSelect('/degree/list', 'adddegree', { textKey: 'degree', valueKey: 'degree_id' });
loadSelect('/employment/list', 'employment_ids', { textKey: 'employment_name', valueKey: 'employment_id' });
loadSelect('/relationship/list', 'relationship_ids', { textKey: 'relationship_name', valueKey: 'relationship_id' });
loadSelect('/satsang_activity/list', 'satsang_activity_id', { textKey: 'satsang_activity_name', valueKey: 'satsang_activity_id' });
loadSelect('/grade/list', 'grade_id', { textKey: 'grade_name', valueKey: 'grade_id' });
loadSelect('/talent/list', 'talent_id', { textKey: 'talent_name', valueKey: 'talent_id' });

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
loadCountryCode('ins_by_country_code');
loadCountryCode('mobile1_country_code');
loadCountryCode('mobile2_country_code');
loadCountryCode('whatsapp_country_code');

// ----------------- GET ID FROM URL (Using your .pop() method) -----------------
function getSevakIdFromUrl() {
    const pathSegments = window.location.pathname.split('/');
    const id = pathSegments.pop() || pathSegments.pop();
    return !isNaN(id) && id.trim() !== '' ? id : null;
}

// ----------------- Load Batches -----------------
function loadBatches(selectId, selectedValue = null) {
    fetch('/talim_batch/list')
        .then(res => res.json())
        .then(batches => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select Batch --</option>';
            batches.forEach(batch => {
                const option = document.createElement('option');
                option.value = batch.talim_batch_id;
                option.textContent = batch.talim_year + ' - ' + batch.talim_batch;
                if (selectedValue && selectedValue == batch.talim_batch_id) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        });
}

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

// ----------------- Generate YTK ID -----------------
function generateYtkID() {
    const sevak_no = document.getElementById("sevak_no").value;
    const talim_batch_id = document.getElementById("addbatch").value;
    if (!sevak_no || !talim_batch_id) return;

    const sevak_id = getSevakIdFromUrl() || 0;

    fetch("/SevakRegistration/generateYtkID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            sevak_no,
            talim_batch_id,
            sevak_id: sevak_id
        })
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("ytk_id").value = data.ytk_id || "";
            document.getElementById("is_sevak_duplicate").style.display = (data.is_sevak_duplicate === "Y") ? "block" : "none";
        });
}


// ----------------- Load Selects (Helper Function) -----------------
function loadSelect(url, selectId, options, callback = null) {
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

            if (typeof callback === 'function') {
                callback();
            }
        })
        .catch(err => console.error(`Failed to load select ${selectId}:`, err));
}

// ----------------- Load Country Code (Helper Function) -----------------
function loadCountryCode(selectId, selectedValue = null) {
    fetch('/country/list')
        .then(res => res.json())
        .then(countries => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select country code --</option>';
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.dialing_code;
                option.textContent = country.country_name + ' - ' + country.dialing_code;
                if (selectedValue && selectedValue == country.dialing_code) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        })
        .catch(err => console.error(`Failed to load country codes ${selectId}:`, err));
}

// ----------------- Load Sevak by Batch (Helper Function) -----------------
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

// ----------------- City Change Handler -----------------
function handleCityChange(cityId, areaSelectId, pincodeSelectId, prefix = '') {
    if (!cityId) return;

    fetch(`/common/getcityareabycity?city_id=${cityId}`)
        .then(res => res.json())
        .then(cityAreas => {
            const areaSelect = document.getElementById(areaSelectId);
            areaSelect.innerHTML = '<option value="">-- Select City Area --</option>';
            cityAreas.forEach(ca => {
                areaSelect.appendChild(new Option(ca.area_name, ca.city_area_id));
            });
        });

    fetch(`/common/getpincodebycity?city_id=${cityId}`)
        .then(res => res.json())
        .then(pincodes => {
            const pincodeSelect = document.getElementById(pincodeSelectId);
            pincodeSelect.innerHTML = '<option value="">-- Select Pincode --</option>';
            pincodes.forEach(pin => {
                pincodeSelect.appendChild(new Option(pin.pincode, pin.pin_id));
            });
        });

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
            getMandirDiv(cityId, d.country_id);
        });
}

// ----------------- Mandir Div Handler -----------------
function getMandirDiv(cityId, country_id) {
    if (country_id == 2) { // 2 = India
        document.getElementById('withIndiaDiv').style.display = 'block';
        document.getElementById('withoutIndiaDiv').style.display = 'none';
    } else {
        document.getElementById('withIndiaDiv').style.display = 'none';
        document.getElementById('withoutIndiaDiv').style.display = 'block';
    }

    const shikharMandirId = document.getElementById('shikhar_mandir_id').getAttribute('data-selected') || 0;
    const hariMandirId = document.getElementById('hari_mandir_id').getAttribute('data-selected') || 0;

    fetch(`/SevakRegistration/getMandir`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            city_id: cityId,
            shikhar_mandir_id: shikharMandirId,
            hari_mandir_id: hariMandirId
        })
    })
        .then(res => res.json())
        .then(obj => {
            document.getElementById('shikhar_mandir_id').innerHTML = obj.shikhar_mandir || '';
            document.getElementById('hari_mandir_id').innerHTML = obj.hari_mandir || '';
            $('#shikhar_mandir_id').trigger('chosen:updated');
            $('#hari_mandir_id').trigger('chosen:updated');
        })
        .catch(err => console.error('Error fetching mandir data:', err));
}

// ----------------- Kshetra Change Handler -----------------
function handleKshetraChange(selectId, prefix = '') {
    document.getElementById(selectId).addEventListener('change', function () {
        const kshetra_id = this.value;
        if (!kshetra_id) return;
        fetch(`/common/getkshetradetails?kshetra_id=${kshetra_id}`)
            .then(res => res.json())
            .then(data => {
                if (!data || data.length === 0) return;
                const k = data[0];
                document.getElementById(prefix + 'sant_nirdeshak_name').value = k.sant_nirdeshak_name || "";
                document.getElementById(prefix + 'sant_nirdeshak').value = k.sant_nirdeshak_id || "";
                document.getElementById(prefix + 'nirdeshak_name').value = k.nirdeshak_name || "";
                document.getElementById(prefix + 'nirdeshak').value = k.nirdeshak_id || "";
                document.getElementById(prefix + 'mandir_name').value = k.mandir_name || "";
                document.getElementById(prefix + 'mandir').value = k.mandir_id || "";
                document.getElementById(prefix + 'mandir_type').value = k.mandir_type || "";
            });
    });
}

// ----------------- Dynamic Table Row Functions -----------------
function insertEducation() {
    let rowCount = document.querySelectorAll("#educationInvoice tbody tr").length;
    let table = document.getElementById("educationInvoice").getElementsByTagName('tbody')[0];
    let row = table.insertRow(-1);
    row.insertCell(0).innerHTML = `<select  name="degree_id[]" id="degree_id_${rowCount}" required></select>`;
    row.insertCell(1).innerHTML = `<select  name="specialization_id[]" id="specialization_id_${rowCount}"></select>`;
    row.insertCell(2).innerHTML = `<input type="text" name="edu_remark[]"  >`;
    row.insertCell(3).innerHTML = `<a href="#" onclick="DeleteTableRow(this, event)"> Delete</a>`;
    loadSelect('/degree/list', `degree_id_${rowCount}`, { textKey: 'degree', valueKey: 'degree_id' });
}

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
                const option = new Option(spec.specialization, spec.specialization_id);
                if (selectedValue && selectedValue == spec.specialization_id) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        })
        .catch(err => console.error("Error loading Specializations:", err));
}

function insertEmployment() {
    let rowCount = document.querySelectorAll("#employmentInvoice tbody tr").length;
    let table = document.getElementById("employmentInvoice").getElementsByTagName('tbody')[0];
    let row = table.insertRow(-1);
    row.insertCell(0).innerHTML = `<select  name="employment_id[]" id="employment_id_${rowCount}"></select>`;
    row.insertCell(1).innerHTML = `<input type="text"  name="emp_detail[]" >`;
    row.insertCell(2).innerHTML = `<input type="text"  name="post_designation[]" >`;
    row.insertCell(3).innerHTML = `<input type="text"  name="emp_remark[]" >`;
    row.insertCell(4).innerHTML = `<a href="#" onclick="DeleteTableRow(this, event)"> Delete</a>`;
    loadSelect('/employment/list', `employment_id_${rowCount}`, { textKey: 'employment_name', valueKey: 'employment_id' });
}

function insertFamily() {
    let rowCount = document.querySelectorAll("#familyInvoice tbody tr").length;
    let table = document.getElementById("familyInvoice").getElementsByTagName('tbody')[0];
    let row = table.insertRow(-1);
    row.insertCell(0).innerHTML = `<select  name="relationship_id[]" id="relationship_id_${rowCount}"></select>`;
    row.insertCell(1).innerHTML = `<input type="text"  name="family_name[]">`;
    row.insertCell(2).innerHTML = `<select  name="family_country_code[]" id="family_country_code_${rowCount}"></select>`;
    row.insertCell(3).innerHTML = `<input type="number"  name="family_mobile[]" title="Please Enter 10 Digit Mobile No">`;
    row.insertCell(4).innerHTML = `<input type="email"  name="family_email[]">`;
    row.insertCell(5).innerHTML = `<input type="text"  name="family_occupation[]">`;
    row.insertCell(6).innerHTML = `<a href="#" onclick="DeleteTableRow(this, event)"> Delete</a>`;
    loadSelect('/relationship/list', `relationship_id_${rowCount}`, { textKey: 'relationship_name', valueKey: 'relationship_id' });
    loadCountryCode(`family_country_code_${rowCount}`);
}

function insertSatsang() {
    let rowCount = document.querySelectorAll("#satsangInvoice tbody tr").length;
    let table = document.getElementById("satsangInvoice").getElementsByTagName('tbody')[0];
    let row = table.insertRow(-1);
    row.insertCell(0).innerHTML = `<select  name="satsang_activity_id[]" id="satsang_activity_id_${rowCount}"></select>`;
    row.insertCell(1).innerHTML = `<select  id="satsang_designation_id_${rowCount}" name="satsang_designation_id[]"></select>`;
    row.insertCell(2).innerHTML = `<input type="text"  name="seva_details[]" >`;
    row.insertCell(3).innerHTML = `<a href="#" onclick="DeleteTableRow(this, event)"> Delete</a>`;
    loadSelect('/satsang_activity/list', `satsang_activity_id_${rowCount}`, { textKey: 'satsang_activity_name', valueKey: 'satsang_activity_id' });
}

function InsertTalent() {
    let rowCount = document.querySelectorAll("#talentInvoice tbody tr").length;
    let table = document.getElementById("talentInvoice").getElementsByTagName('tbody')[0];
    let row = table.insertRow(-1);
    row.insertCell(0).innerHTML = `<select  name="talent_id[]" id="talent_id_${rowCount}"></select>`;
    row.insertCell(1).innerHTML = `<select  id="grade_id_${rowCount}" name="grade_id[]"></select>`;
    row.insertCell(2).innerHTML = `<input type="text"  name="talent_detail[]" >`;
    row.insertCell(3).innerHTML = `<a href="#" onclick="DeleteTableRow(this, event)"> Delete</a>`;
    loadSelect('/grade/list', `grade_id_${rowCount}`, { textKey: 'grade_name', valueKey: 'grade_id' });
    loadSelect('/talent/list', `talent_id_${rowCount}`, { textKey: 'talent_name', valueKey: 'talent_id' });
}

// Generic Delete Row
function DeleteTableRow(r, e) {
    e.preventDefault();
    let row = r.closest('tr');
    row.remove();
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
                const option = new Option(d.satsang_designation_name, d.satsang_designation_id);
                if (selectedValue && selectedValue == d.satsang_designation_id) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            if (typeof callback === "function") callback();
        })
        .catch(err => console.error("Error loading Designations:", err));
}

// ----------------- Satasangi Since Logic -----------------
function birthdateWiseSatsangiSinceChange() {
    const birthDate = $('#birth_date').val();
    const satsangSelect = $('#satasangi_since');
    satsangSelect.empty();
    satsangSelect.append('<option value="">-- Select Year --</option>');

    if (!birthDate) return;

    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();

    for (let year = birthYear; year <= currentYear; year++) {
        satsangSelect.append(`<option value="${year}">${year}</option>`);
    }

    const preSelectedYear = $('#hidden_satasangi_since').val();
    if (preSelectedYear) {
        satsangSelect.val(preSelectedYear);
    }
}

// ---------------- Sevak Status Toggles ----------------
function notCompleteDiv() {
    $("#not_complete_div").toggle(document.getElementById("not_complete").checked);
}
function temporaryDiv() {
    $("#temporary_div").toggle(document.getElementById("temporary").checked);
}
function expiredDiv() {
    $("#expired_div").toggle(document.getElementById("expired").checked);
}
function santInBapsDiv() {
    $("#sant_in_baps_div").toggle(document.getElementById("sant_in_baps").checked);
}


// ----------------- MAIN SCRIPT EXECUTION -----------------
$(document).ready(function () {

    // --- Init Listeners ---
    $('#birth_date').on('change', birthdateWiseSatsangiSinceChange);
    $('#addcity').on('change', () => handleCityChange($('#addcity').val(), 'addcityarea', 'addpincode', ''));
    $('#per_city').on('change', () => handleCityChange($('#per_city').val(), 'per_city_area', 'per_pincode', 'per_'));
    $('#talim_city').on('change', () => handleCityChange($('#talim_city').val(), 'talim_city_area', 'talim_pincode', 'talim_'));
    handleKshetraChange('current_kshetra', 'current_');
    handleKshetraChange('kshetra', '');
    handleKshetraChange('talim_kshetra', 'talim_');

    document.getElementById('educationInvoice').addEventListener('change', function (e) {
        if (e.target && e.target.matches('select[name="degree_id[]"]')) {
            const degreeId = e.target.value;
            const row = e.target.closest('tr');
            const specializationSelect = row.querySelector('select[name="specialization_id[]"]');
            getSpecializationByDegree(degreeId, specializationSelect.id);
        }
    });
    document.getElementById('satsangInvoice').addEventListener('change', function (e) {
        if (e.target && e.target.matches('select[name="satsang_activity_id[]"]')) {
            const activityId = e.target.value;
            const row = e.target.closest('tr');
            const designationSelect = row.querySelector('select[name="satsang_designation_id[]"]');
            getSatsangDesignation(activityId, designationSelect.id);
        }
    });

    $('#sameprimaryno').on('change', function () {
        if ($(this).is(':checked')) {
            $('#whatsapp_country_code').val($('#mobile1_country_code').val());
            $('#contact_whatsapp_no').val($('#contact_mobile1').val());
        } else {
            $('#whatsapp_country_code').val('');
            $('#contact_whatsapp_no').val('');
        }
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
        } else {
            $('#maritalStatusDate, #engagedDate, #marriedDate').hide();
            $('#marital_date').prop('required', false);
        }
    });

    $("#admitted_div, #certified_div, #not_complete_div, #temporary_div, #expired_div, #sant_in_baps_div, #withoutIndiaDiv").hide();

    // YTK Sevak Satsangi
    document.getElementById("ytk_sevak_satsangi").addEventListener("change", function () {
        const isChecked = this.checked;
        document.getElementById("ytk_sevak_fields").style.display = isChecked ? "block" : "none";
        document.getElementById("ref_fields").style.display = isChecked ? "none" : "block";
    });

    // YTK Sevak Inspired
    document.getElementById("ytk_sevak_inspired").addEventListener("change", function () {
        const isChecked = this.checked;
        document.getElementById("ytk_inspired_fields").style.display = isChecked ? "block" : "none";
        document.getElementById("ins_ref_fields").style.display = isChecked ? "none" : "block";
    });

    // --- Load Initial Dropdowns for Referees ---
    loadBatches('satsangi_batch_id');
    loadBatches('inpired_batch_id');
    document.getElementById('satsangi_batch_id').addEventListener('change', function () {
        getSatsangiSevak(this.value, 'satsangi_sevak_id');
    });
    document.getElementById('inpired_batch_id').addEventListener('change', function () {
        getinspiredSevak(this.value, 'inspired_sevak_id');
    });

    // --- CHECK FOR EDIT OR NEW ---
    const sevakId = getSevakIdFromUrl();
    console.log("Sevak ID from URL:", sevakId);

    if (sevakId) {
        // ==================
        // --- EDIT MODE ---
        // ==================
        console.log("Starting EDIT mode. Fetching data for sevak ID:", sevakId);
        document.querySelector('h2').textContent = 'Edit Sevak Registration';

        fetch(`/SevakRegistration/getSevakForEdit/${sevakId}`)
            .then(res => {
                if (!res.ok) {
                    alert(`Error fetching data: ${res.statusText}.`);
                    throw new Error(`Fetch failed with status ${res.status}`);
                }
                return res.json();
            })
            .then(response => {
                console.log("Raw server response:", response);

                // --- 1. UNWRAP THE RESPONSE ---
                if (!response.success) {
                    alert("Server returned an error: " + (response.message || "Unknown error"));
                    return;
                }

                // --- 2. GET THE DATA (HANDLE ARRAY OR OBJECT) ---
                let sevakData = response.data;
                if (Array.isArray(sevakData)) {
                    if (sevakData.length === 0) {
                        alert("Sevak not found (empty array returned).");
                        return;
                    }
                    sevakData = sevakData[0]; // Get the FIRST sevak from the array
                }

                if (!sevakData) {
                    alert("Sevak not found or data is empty.");
                    return;
                }

                // --- 3. *** EXTRACT NESTED DATA (THE FIX) *** ---
                const data = sevakData.sevakInfo || {}; // Main sevak info
                const educationData = sevakData.educations || [];
                const employmentData = sevakData.employments || [];
                const familyData = sevakData.families || []; // From your log
                const talentData = sevakData.sevakTalents || []; // From your log
                const satsangSevaData = sevakData.satsangs || []; // From your log

                console.log("Populating with sevakInfo:", data);

                // --- 4. POPULATE THE FORM ---
                document.getElementById('sevak_no').value = data.sevak_no || '';
                document.getElementById('ytk_id').value = data.ytk_id || '';
                document.getElementById('first_name').value = data.first_name || '';
                document.getElementById('last_name').value = data.last_name || '';
                document.getElementById('middle_name').value = data.middle_name || '';
                document.getElementById('birth_date').value = data.birth_date ? new Date(data.birth_date).toISOString().split('T')[0] : '';

                document.getElementById('hidden_satasangi_since').value = data.satasangi_since || '';
                birthdateWiseSatsangiSinceChange();

                loadBatches('addbatch', data.talim_batch_id);
                loadSelect('/caste/list', 'addcaste', { textKey: 'caste_name', valueKey: 'caste_id', selectedValue: data.caste_id });
                loadSelect('/category/list', 'addcategory', { textKey: 'category_name', valueKey: 'category_id', selectedValue: data.category_id });
                loadSelect('/blood_group/list', 'addbloodgroup', { textKey: 'blood_group_name', valueKey: 'blood_group_id', selectedValue: data.blood_group_id });
                document.getElementById('addgender').value = data.gender || '';

                loadSelect('/marital_status/list', 'addmaritalstatus', { textKey: 'marital_status_name', valueKey: 'marital_status_id', selectedValue: data.marital_status_id }, () => {
                    const maritalVal = $('#addmaritalstatus').val();
                    if (maritalVal === "2" || maritalVal === "3") {
                        $('#maritalStatusDate').show();
                        document.getElementById('marital_date').value = data.marital_date ? new Date(data.marital_date).toISOString().split('T')[0] : '';
                        if (maritalVal === "2") {
                            $('#marriedDate').show();
                            $('#engagedDate').hide();
                        } else {
                            $('#engagedDate').show();
                            $('#marriedDate').hide();
                        }
                    }
                });

                // Current Address
                document.getElementById('address').value = data.address1 || '';
                loadSelect('/city/list', 'addcity', { textKey: 'city_name', valueKey: 'city_id', selectedValue: data.city_id }, () => {
                    if (data.city_id) {
                        handleCityChange(data.city_id, 'addcityarea', 'addpincode', '');
                        setTimeout(() => {
                            document.getElementById('addcityarea').value = data.city_area_id || '';
                            document.getElementById('addpincode').value = data.pincode || '';
                        }, 1200);
                    }
                });

                // Mandir Section
                if (data.country_id == 2) {
                    loadSelect('/kshetra/list', 'current_kshetra', { textKey: 'kshetra_name', valueKey: 'kshetra_id', selectedValue: data.current_kshetra_id }, () => {
                        if (data.current_kshetra_id) {
                            fetch(`/common/getkshetradetails?kshetra_id=${data.current_kshetra_id}`)
                                .then(res => res.json()).then(kData => {
                                    if (kData && kData.length > 0) {
                                        const k = kData[0];
                                        document.getElementById('current_sant_nirdeshak_name').value = k.sant_nirdeshak_name || "";
                                        document.getElementById('current_sant_nirdeshak').value = k.sant_nirdeshak_id || "";
                                        document.getElementById('current_nirdeshak_name').value = k.nirdeshak_name || "";
                                        document.getElementById('current_nirdeshak').value = k.nirdeshak_id || "";
                                        document.getElementById('current_mandir_name').value = k.mandir_name || "";
                                        document.getElementById('current_mandir').value = k.mandir_id || "";
                                        document.getElementById('current_mandir_type').value = k.mandir_type || "";
                                    }
                                });
                        }
                    });
                } else if (data.country_id) {
                    setTimeout(() => {
                        document.getElementById('shikhar_mandir_id').value = data.shikhar_mandir_id || '';
                        document.getElementById('hari_mandir_id').value = data.hari_mandir_id || '';
                    }, 1500);
                    document.getElementById('satsang_mandal_name').value = data.satsang_mandal_name || '';
                }

                // Permanent Address
                if (data.is_perm_add === 'Y') {
                    document.getElementById('is_perm_add').checked = true;
                } else {
                    document.getElementById('is_perm_add').checked = false;
                    document.getElementById('per_address').value = data.per_address1 || '';
                    loadSelect('/city/list', 'per_city', { textKey: 'city_name', valueKey: 'city_id', selectedValue: data.per_city_id }, () => {
                        if (data.per_city_id) {
                            handleCityChange(data.per_city_id, 'per_city_area', 'per_pincode', 'per_');
                            setTimeout(() => {
                                document.getElementById('per_city_area').value = data.per_city_area_id || '';
                                document.getElementById('per_pincode').value = data.per_pincode || '';
                            }, 1200);
                        }
                    });
                }
                $('#permanent_address').toggle(!document.getElementById('is_perm_add').checked);

                // Talim Address
                if (data.is_talim_add === 'Y') {
                    document.getElementById('is_talim_add').checked = true;
                } else {
                    document.getElementById('is_talim_add').checked = false;
                    document.getElementById('talim_address_input').value = data.talim_address1 || '';
                    loadSelect('/city/list', 'talim_city', { textKey: 'city_name', valueKey: 'city_id', selectedValue: data.talim_city_id }, () => {
                        if (data.talim_city_id) {
                            handleCityChange(data.talim_city_id, 'talim_city_area', 'talim_pincode', 'talim_');
                            setTimeout(() => {
                                document.getElementById('talim_city_area').value = data.talim_city_area_id || '';
                                document.getElementById('talim_pincode').value = data.talim_pincode || '';
                            }, 1200);
                        }
                    });
                }
                $('#talim_address').toggle(!document.getElementById('is_talim_add').checked);

                // Kshetra Details
                loadSelect('/kshetra/list', 'kshetra', { textKey: 'kshetra_name', valueKey: 'kshetra_id', selectedValue: data.kshetra_id }, () => {
                    if (data.kshetra_id) {
                        fetch(`/common/getkshetradetails?kshetra_id=${data.kshetra_id}`)
                            .then(res => res.json()).then(kData => {
                                if (kData && kData.length > 0) {
                                    const k = kData[0];
                                    document.getElementById('sant_nirdeshak_name').value = k.sant_nirdeshak_name || "";
                                    document.getElementById('sant_nirdeshak').value = k.sant_nirdeshak_id || "";
                                    document.getElementById('nirdeshak_name').value = k.nirdeshak_name || "";
                                    document.getElementById('nirdeshak').value = k.nirdeshak_id || "";
                                    document.getElementById('mandir_name').value = k.mandir_name || "";
                                    document.getElementById('mandir').value = k.mandir_id || "";
                                    document.getElementById('mandir_type').value = k.mandir_type || "";
                                }
                            });
                    }
                });
                loadSelect('/kshetra/list', 'talim_kshetra', { textKey: 'kshetra_name', valueKey: 'kshetra_id', selectedValue: data.talim_kshetra_id }, () => {
                    if (data.talim_kshetra_id) {
                        fetch(`/common/getkshetradetails?kshetra_id=${data.talim_kshetra_id}`)
                            .then(res => res.json()).then(kData => {
                                if (kData && kData.length > 0) {
                                    const k = kData[0];
                                    document.getElementById('talim_sant_nirdeshak_name').value = k.sant_nirdeshak_name || "";
                                    document.getElementById('talim_sant_nirdeshak').value = k.sant_nirdeshak_id || "";
                                    document.getElementById('talim_nirdeshak_name').value = k.nirdeshak_name || "";
                                    document.getElementById('talim_nirdeshak').value = k.nirdeshak_id || "";
                                    document.getElementById('talim_mandir_name').value = k.mandir_name || "";
                                    document.getElementById('talim_mandir').value = k.mandir_id || "";
                                    document.getElementById('talim_mandir_type').value = k.mandir_type || "";
                                }
                            });
                    }
                });

                // Satsangi Referee
                if (data.ytk_sevak_satsangi === 'Y') {
                    document.getElementById('ytk_sevak_satsangi').checked = true;
                    loadBatches('satsangi_batch_id', data.satsangi_batch_id);
                    if (data.satsangi_batch_id) {
                        getSatsangiSevak(data.satsangi_batch_id, 'satsangi_sevak_id', data.satsangi_sevak_id);
                    }
                } else {
                    document.getElementById('ytk_sevak_satsangi').checked = false;
                    document.getElementById('sat_ref_name').value = data.sat_ref_name || '';
                    loadSelect('/city/list', 'sat_ref_city_id', { textKey: 'city_name', valueKey: 'city_id', selectedValue: data.sat_ref_city_id });
                    loadCountryCode('sat_ref_mobile_country_code', data.sat_ref_mobile_country_code);
                    document.getElementById('sat_ref_mobile').value = data.sat_ref_mobile || '';
                }
                document.getElementById("ytk_sevak_satsangi").dispatchEvent(new Event('change'));

                // Inspired By
                if (data.ytk_sevak_inspired === 'Y') {
                    document.getElementById('ytk_sevak_inspired').checked = true;
                    loadBatches('inpired_batch_id', data.inpired_batch_id);
                    if (data.inpired_batch_id) {
                        getinspiredSevak(data.inpired_batch_id, 'inspired_sevak_id', data.inspired_sevak_id);
                    }
                } else {
                    document.getElementById('ytk_sevak_inspired').checked = false;
                    document.getElementById('ins_by_name').value = data.ins_by_name || '';
                    loadSelect('/city/list', 'ins_by_city_id', { textKey: 'city_name', valueKey: 'city_id', selectedValue: data.ins_by_city_id });
                    loadCountryCode('ins_by_country_code', data.ins_by_country_code);
                    document.getElementById('ins_by_mobile').value = data.ins_by_mobile || '';
                }
                document.getElementById("ytk_sevak_inspired").dispatchEvent(new Event('change'));

                // --- DYNAMIC TABLE POPULATION ---
                const educationTableBody = document.querySelector("#educationInvoice tbody");
                educationTableBody.innerHTML = '';
                if (educationData.length > 0) {
                    educationData.forEach((edu, index) => {
                        insertEducation();
                        const row = educationTableBody.rows[index];
                        const degreeSelect = row.querySelector(`select[name="degree_id[]"]`);
                        const specializationSelect = row.querySelector(`select[name="specialization_id[]"]`);
                        row.querySelector(`input[name="edu_remark[]"]`).value = edu.edu_remark || '';
                        loadSelect('/degree/list', degreeSelect.id, { textKey: 'degree', valueKey: 'degree_id', selectedValue: edu.degree_id }, () => {
                            if (edu.degree_id) {
                                getSpecializationByDegree(edu.degree_id, specializationSelect.id, edu.specialization_id);
                            }
                        });
                    });
                } else {
                    insertEducation();
                }

                const employmentTableBody = document.querySelector("#employmentInvoice tbody");
                employmentTableBody.innerHTML = '';
                if (employmentData.length > 0) {
                    employmentData.forEach((emp, index) => {
                        insertEmployment();
                        const row = employmentTableBody.rows[index];
                        loadSelect('/employment/list', row.querySelector(`select[name="employment_id[]"]`).id, { textKey: 'employment_name', valueKey: 'employment_id', selectedValue: emp.employment_id });
                        row.querySelector(`input[name="emp_detail[]"]`).value = emp.emp_detail || '';
                        row.querySelector(`input[name="post_designation[]"]`).value = emp.post_designation || '';
                        row.querySelector(`input[name="emp_remark[]"]`).value = emp.emp_remark || '';
                    });
                } else {
                    insertEmployment();
                }

                const familyTableBody = document.querySelector("#familyInvoice tbody");
                familyTableBody.innerHTML = '';
                if (familyData.length > 0) {
                    familyData.forEach((fam, index) => {
                        insertFamily();
                        const row = familyTableBody.rows[index];
                        loadSelect('/relationship/list', row.querySelector(`select[name="relationship_id[]"]`).id, { textKey: 'relationship_name', valueKey: 'relationship_id', selectedValue: fam.relationship_id });
                        row.querySelector(`input[name="family_name[]"]`).value = fam.family_name || '';
                        loadCountryCode(row.querySelector(`select[name="family_country_code[]"]`).id, fam.family_country_code);
                        row.querySelector(`input[name="family_mobile[]"]`).value = fam.family_mobile || '';
                        row.querySelector(`input[name="family_email[]"]`).value = fam.family_email || '';
                        row.querySelector(`input[name="family_occupation[]"]`).value = fam.family_occupation || '';
                    });
                } else {
                    insertFamily();
                }

                const satsangTableBody = document.querySelector("#satsangInvoice tbody");
                satsangTableBody.innerHTML = '';
                if (satsangSevaData.length > 0) {
                    satsangSevaData.forEach((seva, index) => {
                        insertSatsang();
                        const row = satsangTableBody.rows[index];
                        const activitySelect = row.querySelector(`select[name="satsang_activity_id[]"]`);
                        const designationSelect = row.querySelector(`select[name="satsang_designation_id[]"]`);
                        row.querySelector(`input[name="seva_details[]"]`).value = seva.seva_details || '';

                        loadSelect('/satsang_activity/list', activitySelect.id, { textKey: 'satsang_activity_name', valueKey: 'satsang_activity_id', selectedValue: seva.satsang_activity_id }, () => {
                            if (seva.satsang_activity_id) {
                                getSatsangDesignation(seva.satsang_activity_id, designationSelect.id, seva.satsang_designation_id);
                            }
                        });
                    });
                } else {
                    insertSatsang();
                }

                const talentTableBody = document.querySelector("#talentInvoice tbody");
                talentTableBody.innerHTML = '';
                if (talentData.length > 0) {
                    talentData.forEach((tal, index) => {
                        InsertTalent();
                        const row = talentTableBody.rows[index];
                        loadSelect('/talent/list', row.querySelector(`select[name="talent_id[]"]`).id, { textKey: 'talent_name', valueKey: 'talent_id', selectedValue: tal.talent_id });
                        loadSelect('/grade/list', row.querySelector(`select[name="grade_id[]"]`).id, { textKey: 'grade_name', valueKey: 'grade_id', selectedValue: tal.grade_id });
                        row.querySelector(`input[name="talent_detail[]"]`).value = tal.talent_detail || '';
                    });
                } else {
                    InsertTalent();
                }

                // Contact
                loadCountryCode('mobile1_country_code', data.mobile1_country_code);
                document.getElementById('contact_mobile1').value = data.contact_mobile1 || '';
                loadCountryCode('mobile2_country_code', data.mobile2_country_code);
                document.getElementById('contact_mobile2').value = data.contact_mobile2 || '';
                document.getElementById('contact_phone_1').value = data.contact_phone_1 || '';
                document.getElementById('contact_phone_2').value = data.contact_phone_2 || '';
                document.getElementById('contact_res_phone1').value = data.contact_res_phone1 || '';
                document.getElementById('contact_res_phone2').value = data.contact_res_phone2 || '';
                document.getElementById('contact_per_mail').value = data.contact_per_mail || '';
                document.getElementById('contact_bus_mail').value = data.contact_bus_mail || '';

                if (data.contact_whatsapp_no && data.contact_whatsapp_no === data.contact_mobile1 && data.whatsapp_country_code === data.mobile1_country_code) {
                    document.getElementById('sameprimaryno').checked = true;
                } else {
                    document.getElementById('sameprimaryno').checked = false;
                }
                loadCountryCode('whatsapp_country_code', data.whatsapp_country_code);
                document.getElementById('contact_whatsapp_no').value = data.contact_whatsapp_no || '';

                // Satsang Network
                document.getElementById('satsang_remark').value = data.satsang_remark || '';
                // Corrected line
                loadSelect('/gosthigroup/list', 'addgosthi', { textKey: ['group_code', 'group_name'], valueKey: 'group_id', selectedValue: sevakData.current_gosthi_group_id });
                document.querySelector('select[name="gosthi_group_status"]').value = data.gosthi_group_status || 'N';
                document.getElementById('goshthi_status_remark').value = data.goshthi_status_remark || '';

                document.getElementById('other_achievement').value = data.other_achievement || '';
                document.getElementById('achievement_remarks').value = data.achievement_remarks || '';

                // Sevak Status
                // Sevak Status
                document.getElementById('certified').checked = data.certified_status === 'Y';
                document.getElementById('not_complete').checked = data.not_complete_status === 'Y';
                if (data.not_complete_status === 'Y') {
                    notCompleteDiv();
                    document.getElementById('not_complete_date').value = data.not_complete_date ? new Date(data.not_complete_date).toISOString().split('T')[0] : '';
                    document.getElementById('not_complete_remark').value = data.not_complete_remark || '';
                }
                document.getElementById('temporary').checked = data.temporary_status === 'Y';
                if (data.temporary_status === 'Y') {
                    temporaryDiv();
                    document.getElementById('temporary_date').value = data.temporary_date ? new Date(data.temporary_date).toISOString().split('T')[0] : '';
                    document.getElementById('temporary_remark').value = data.temporary_remark || '';
                }
                document.getElementById('expired').checked = data.expired_status === 'Y';
                if (data.expired_status === 'Y') {
                    expiredDiv();
                    document.getElementById('expired_date').value = data.expired_date ? new Date(data.expired_date).toISOString().split('T')[0] : '';
                    document.getElementById('expired_remark').value = data.expired_remark || '';
                }
                document.getElementById('sant_in_baps').checked = data.sant_in_baps_status === 'Y';
                if (data.sant_in_baps_status === 'Y') {
                    santInBapsDiv();
                    document.getElementById('name_of_parshad').value = data.name_of_parshad || '';
                    document.getElementById('parshad_date').value = data.parshad_date ? new Date(data.parshad_date).toISOString().split('T')[0] : '';
                    document.getElementById('name_of_sant').value = data.name_of_sant || '';
                    document.getElementById('sant_in_baps_date').value = data.sant_in_baps_date ? new Date(data.sant_in_baps_date).toISOString().split('T')[0] : '';
                }

                // Role and Login Active
                document.getElementById('role_id').value = data.role_id || '2';
                document.getElementById('login_active').value = data.login_active || 'Y';

                console.log("--- Form population complete ---");

            })
            .catch(error => {
                console.error('Error fetching or parsing Sevak data:', error);
                alert("A critical error occurred. Check Console (F12) for details.");
            });
    } else {
        // ==================
        // --- NEW MODE ---
        // ==================
        console.log("No sevakId found. Starting NEW registration mode.");
        document.querySelector('h2').textContent = 'Add Sevak Registration';

        // --- Load Dropdowns for New Form ---
        loadBatches('addbatch');
        loadSelect('/caste/list', 'addcaste', { textKey: 'caste_name', valueKey: 'caste_id' });
        loadSelect('/category/list', 'addcategory', { textKey: 'category_name', valueKey: 'category_id' });
        loadSelect('/blood_group/list', 'addbloodgroup', { textKey: 'blood_group_name', valueKey: 'blood_group_id' });
        loadSelect('/marital_status/list', 'addmaritalstatus', { textKey: 'marital_status_name', valueKey: 'marital_status_id' });

        loadCountryCode('ins_by_country_code');
        loadCountryCode('mobile1_country_code');
        loadCountryCode('mobile2_country_code');
        loadCountryCode('whatsapp_country_code');
        loadSelect('/city/list', 'addcity', { textKey: 'city_name', valueKey: 'city_id' });
        loadSelect('/city/list', 'per_city', { textKey: 'city_name', valueKey: 'city_id' });
        loadSelect('/city/list', 'talim_city', { textKey: 'city_name', valueKey: 'city_id' });
        loadSelect('/city/list', 'sat_ref_city_id', { textKey: 'city_name', valueKey: 'city_id' });
        loadSelect('/city/list', 'ins_by_city_id', { textKey: 'city_name', valueKey: 'city_id' });
        loadSelect('/kshetra/list', 'current_kshetra', { textKey: 'kshetra_name', valueKey: 'kshetra_id' });
        loadSelect('/kshetra/list', 'kshetra', { textKey: 'kshetra_name', valueKey: 'kshetra_id' });
        loadSelect('/kshetra/list', 'talim_kshetra', { textKey: 'kshetra_name', valueKey: 'kshetra_id' });

        birthdateWiseSatsangiSinceChange();
        document.getElementById("ytk_sevak_satsangi").dispatchEvent(new Event('change'));
        document.getElementById("ytk_sevak_inspired").dispatchEvent(new Event('change'));

        // Add one blank row for each dynamic table
        insertEducation();
        insertEmployment();
        insertFamily();
        insertSatsang();
        InsertTalent();
    }
}); // End of $(document).ready