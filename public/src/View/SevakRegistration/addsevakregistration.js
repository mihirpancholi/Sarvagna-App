        // ----------------- Add Zone Modal -----------------
        document.getElementById('sevakForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const sevak_no = document.getElementById('sevak_no').value;
            const talim_batch_id = document.getElementById('addbatch').value;
            const first_name = document.getElementById('first_name').value;
            const middle_name = document.getElementById('middle_name').value;
            const last_name = document.getElementById('last_name').value;
            const birth_date = document.getElementById('birth_date').value;
            const caste_id = document.getElementById('addcaste').value;
            const category_id = document.getElementById('addcategory').value;
            const blood_group_id = document.getElementById('addbloodgroup').value;
            const gender = document.getElementById('addgender').value;
            const marital_status_id = document.getElementById('addmaritalstatus').value;
            const marital_date = document.getElementById('marital_date').value;
            const sevak_photo = document.getElementById('sevak_photo').value;
            const latest_photo = document.getElementById('latest_photo').value;
            const address1 = document.getElementById('address1').value;
            const city_id = document.getElementById('addcity').value;
            const city_area_id = document.getElementById('addcityarea').value;
            const pincode = document.getElementById('addpincode').value;
            const taluka_id = document.getElementById('taluka_id').value;
            const district_id = document.getElementById('district_id').value;
            const state_id = document.getElementById('state_id').value;
            const country_id = document.getElementById('country_id').value;
            const shikhar_mandir_id = document.getElementById('shikhar_mandir_id').value;
            const hari_mandir_id = document.getElementById('hari_mandir_id').value;
            const satsang_mandal_name = document.getElementById('satsang_mandal_name').value;
            const current_kshetra_id = document.getElementById('current_kshetra_id').value;
            const current_sant_nirdeshak_id = document.getElementById('current_sant_nirdeshak_id').value;
            const current_nirdeshak = document.getElementById('current_nirdeshak').value;
            const current_mandir = document.getElementById('current_mandir').value;
            const current_mandir_type = document.getElementById('current_mandir_type').value;
            const is_perm_add = document.getElementById('is_perm_add').value;
            const per_address1 = document.getElementById('per_address1').value;
            const per_city_id = document.getElementById('per_city_id').value;
            const per_city_area_id = document.getElementById('per_city_area_id').value;
            const per_pincode = document.getElementById('per_pincode').value;
            const per_taluka_id = document.getElementById('per_taluka_id').value;
            const per_district_id = document.getElementById('per_district_id').value;
            const per_state_id = document.getElementById('per_state_id').value;
            const per_country_id = document.getElementById('per_country_id').value;
            const is_talim_add = document.getElementById('is_talim_add').value;
            const talim_address1 = document.getElementById('talim_address1').value;
            const talim_city_id = document.getElementById('talim_city_id').value;
            const talim_city_area_id = document.getElementById('talim_city_area_id').value;
            const talim_pincode = document.getElementById('talim_pincode').value;
            const talim_taluka_id = document.getElementById('talim_taluka_id').value;
            const talim_district_id = document.getElementById('talim_district_id').value;
            const talim_state_id = document.getElementById('talim_state_id').value;
            const talim_country_id = document.getElementById('talim_country_id').value;
            const kshetra_id = document.getElementById('kshetra_id').value;
            const sant_nirdeshak = document.getElementById('sant_nirdeshak').value;
            const nirdeshak = document.getElementById('nirdeshak').value;
            const mandir = document.getElementById('mandir').value;
            const mandir_type = document.getElementById('mandir_type').value;
            const talim_kshetra_id = document.getElementById('talim_kshetra_id').value;
            const talim_sant_nirdeshak = document.getElementById('talim_sant_nirdeshak').value;
            const talim_nirdeshak = document.getElementById('talim_nirdeshak').value;
            const talim_mandir = document.getElementById('talim_mandir').value;
            const talim_mandir_type = document.getElementById('talim_mandir_type').value;
            const ytk_sevak_satsangi = document.getElementById('ytk_sevak_satsangi').value;
            const satsangi_batch_id = document.getElementById('satsangi_batch_id').value;
            const satsangi_sevak_id = document.getElementById('satsangi_sevak_id').value;
            const sat_ref_name = document.getElementById('sat_ref_name').value;
            const sat_ref_city_id = document.getElementById('sat_ref_city_id').value;
            const sat_ref_mobile_country_code = document.getElementById('sat_ref_mobile_country_code').value;
            const sat_ref_mobile = document.getElementById('sat_ref_mobile').value;
            const ytk_sevak_inspired = document.getElementById('ytk_sevak_inspired').value;
            const inspired_batch_id = document.getElementById('inspired_batch_id').value;
            const inspired_sevak_id = document.getElementById('inspired_sevak_id').value;
            const ins_by_name = document.getElementById('ins_by_name').value;
            const ins_by_city_id = document.getElementById('ins_by_city_id').value;
            const ins_by_country_code = document.getElementById('ins_by_country_code').value;
            const ins_by_mobile = document.getElementById('ins_by_mobile').value;


            fetch('/sevakregistration/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sevak_no,
                        talim_batch_id,
                        first_name,
                        middle_name,
                        last_name,
                        birth_date,
                        caste_id,
                        category_id,
                        blood_group_id,
                        gender,
                        marital_status_id,
                        marital_date,
                        sevak_photo,
                        latest_photo,
                        address1,
                        city_id,
                        city_area_id,
                        pincode,
                        taluka_id,
                        district_id,
                        state_id,
                        country_id,
                        shikhar_mandir_id,
                        hari_mandir_id,
                        satsang_mandal_name,
                        current_kshetra_id,
                        current_sant_nirdeshak_id,
                        current_nirdeshak,
                        current_mandir,
                        current_mandir_type,
                        is_perm_add,
                        per_address1,
                        per_city_id,
                        per_city_area_id,
                        per_pincode,
                        per_taluka_id,
                        per_district_id,
                        per_state_id,
                        per_country_id,
                        is_talim_add,
                        talim_address1,
                        talim_city_id,
                        talim_city_area_id,
                        talim_pincode,
                        talim_taluka_id,
                        talim_district_id,
                        talim_state_id,
                        talim_country_id,
                        kshetra_id,
                        sant_nirdeshak,
                        nirdeshak,
                        mandir,
                        mandir_type,
                        talim_kshetra_id,
                        talim_sant_nirdeshak,
                        talim_nirdeshak,
                        talim_mandir,
                        talim_mandir_type,
                        ytk_sevak_satsangi,
                        satsangi_batch_id,
                        satsangi_sevak_id,
                        sat_ref_name,
                        sat_ref_city_id,
                        sat_ref_mobile_country_code,
                        sat_ref_mobile,
                        ytk_sevak_inspired,
                        inspired_batch_id,
                        inspired_sevak_id,
                        ins_by_name,
                        ins_by_city_id,
                        ins_by_country_code
                    })
                })
                .then(res => res.json())
                .then(result => {
                    console.log(sevak_no,
                        talim_batch_id,
                        first_name,
                        middle_name,
                        last_name,
                        birth_date,
                        caste_id,
                        category_id,
                        blood_group_id,
                        gender,
                        marital_status_id,
                        marital_date,
                        sevak_photo,
                        latest_photo,
                        address1,
                        city_id,
                        city_area_id,
                        pincode,
                        taluka_id,
                        district_id,
                        state_id,
                        country_id,
                        shikhar_mandir_id,
                        hari_mandir_id,
                        satsang_mandal_name,
                        current_kshetra_id,
                        current_sant_nirdeshak_id,
                        current_nirdeshak,
                        current_mandir,
                        current_mandir_type,
                        is_perm_add,
                        per_address1,
                        per_city_id,
                        per_city_area_id,
                        per_pincode,
                        per_taluka_id,
                        per_district_id,
                        per_state_id,
                        per_country_id,
                        is_talim_add,
                        talim_address1,
                        talim_city_id,
                        talim_city_area_id,
                        talim_pincode,
                        talim_taluka_id,
                        talim_district_id,
                        talim_state_id,
                        talim_country_id,
                        kshetra_id,
                        sant_nirdeshak,
                        nirdeshak,
                        mandir,
                        mandir_type,
                        talim_kshetra_id,
                        talim_sant_nirdeshak,
                        talim_nirdeshak,
                        talim_mandir,
                        talim_mandir_type,
                        ytk_sevak_satsangi,
                        satsangi_batch_id,
                        satsangi_sevak_id,
                        sat_ref_name,
                        sat_ref_city_id,
                        sat_ref_mobile_country_code,
                        sat_ref_mobile,
                        ytk_sevak_inspired,
                        inspired_batch_id,
                        inspired_sevak_id,
                        ins_by_name,
                        ins_by_city_id,
                        ins_by_country_code);
                    // window.location.reload(); // 🔄 refresh whole page

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
        document.getElementById('addbatch').addEventListener('change', function() {
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
        function loadSelect(url, selectId, textKey, valueKey) {
            fetch(url)
                .then(res => res.json())
                .then(items => {
                    const select = document.getElementById(selectId);
                    select.innerHTML = `<option value="">-- Select --</option>`;
                    items.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item[valueKey];
                        option.textContent = item[textKey];
                        select.appendChild(option);
                    });
                });
        }

        loadSelect('/city/list', 'addcity', 'city_name', 'city_id');
        loadSelect('/city/list', 'per_city', 'city_name', 'city_id');
        loadSelect('/city/list', 'talim_city', 'city_name', 'city_id');
        loadSelect('/kshetra/list', 'current_kshetra', 'kshetra_name', 'kshetra_id');
        loadSelect('/kshetra/list', 'kshetra', 'kshetra_name', 'kshetra_id');
        loadSelect('/kshetra/list', 'talim_kshetra', 'kshetra_name', 'kshetra_id');
        loadSelect('/kshetra/list', 'talim_kshetra', 'kshetra_name', 'kshetra_id');
        loadSelect('/city/list', 'sat_ref_city_id', 'city_name', 'city_id');
        loadSelect('/degree/list', 'adddegree', 'degree', 'degree_id');
        loadSelect('/specialization/list', 'addspecialization', 'specialization', 'specialization_id');
        loadSelect('/employment/list', 'employment_ids', 'employment_name', 'employment_id');
        loadSelect('/relationship/list', 'relationship_ids', 'relationship_name', 'relationship_id');
        loadSelect('/caste/list', 'addcaste', 'caste_name', 'caste_id');
        loadSelect('/category/list', 'addcategory', 'category_name', 'category_id');
        loadSelect('/blood_group/list', 'addbloodgroup', 'blood_group_name', 'blood_group_id');
        loadSelect('/marital_status/list', 'addmaritalstatus', 'marital_status_name', 'marital_status_id');
        loadSelect('/satsang_activity/list', 'satsang_activity_id', 'satsang_activity_name', 'satsang_activity_id');
        loadSelect('/grade/list', 'grade_id', 'grade_name', 'grade_id');
        loadSelect('/talent/list', 'talent_id', 'talent_name', 'talent_id');

        function loadSelect1(url, selectId, textFields, valueField, selectedValue = null) {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const select = document.getElementById(selectId);
                    select.innerHTML = '<option value="">-- Select --</option>';

                    data.forEach(item => {
                        const option = document.createElement('option');

                        // if multiple text fields are given → join them with " - "
                        if (Array.isArray(textFields)) {
                            option.textContent = textFields.map(f => item[f]).join(' - ');
                        } else {
                            option.textContent = item[textFields];
                        }

                        option.value = item[valueField];
                        if (selectedValue && selectedValue == item[valueField]) {
                            option.selected = true;
                        }

                        select.appendChild(option);
                    });
                })
                .catch(err => console.error("Error loading select:", err));
        }
        loadSelect1('/gosthigroup/list', 'addgosthi', ['group_code', 'group_name'], 'group_id');

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

        // ---------------- Load Talim Batch for satsangi referee ----------------
        function loadsatsangi_batch_id(selectId, selectedValue = null) {
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
        loadsatsangi_batch_id('satsangi_batch_id');

        document.getElementById('satsangi_batch_id').addEventListener('change', function() {
            const batchId = this.value;
            getSatsangiSevak(batchId, 'satsangi_sevak_id');
        });

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

        // ---------------- Load Talim Batch for inspired referee ----------------
        function loadinpired_batch_id(selectId, selectedValue = null) {
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
        loadinpired_batch_id('inpired_batch_id');

        document.getElementById('inpired_batch_id').addEventListener('change', function() {
            const batchId = this.value;
            getinspiredSevak(batchId, 'inspired_sevak_id');
        });

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
            kshetraSelect.addEventListener('change', function() {
                const kshetra_id = this.value;
                if (!kshetra_id) return;

                fetch(`/common/getkshetradetails?kshetra_id=${kshetra_id}`)
                    .then(res => res.json())
                    .then(data => {
                        if (!data || data.length === 0) return;
                        const k = data[0];

                        document.getElementById(prefix + 'sant_nirdeshak').value = k.sant_nirdeshak_name || "";
                        document.getElementById(prefix + 'sant_nirdeshak_id').value = k.sant_nirdeshak_id || "";

                        document.getElementById(prefix + 'nirdeshak').value = k.nirdeshak_name || "";
                        document.getElementById(prefix + 'nirdeshak_id').value = k.nirdeshak_id || "";

                        document.getElementById(prefix + 'mandir').value = k.mandir_name || "";
                        document.getElementById(prefix + 'mandir_id').value = k.mandir_id || "";

                        document.getElementById(prefix + 'mandir_type').value = k.mandir_type || "";
                    });
            });
        }

        handleKshetraChange('current_kshetra', 'current_');
        handleKshetraChange('kshetra', '');
        handleKshetraChange('talim_kshetra', 'talim_');

        // ----------------- Checkbox Logic -----------------
        $('#is_perm_add').change(function() {
            if (this.checked) {
                $('#permanent_address').hide();
            } else {
                $('#permanent_address').show();
            }
        }).prop('checked', true).trigger('change');

        $('#is_talim_add').change(function() {
            if (this.checked) {
                $('#talim_address').hide();
            } else {
                $('#talim_address').show();
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

            // Reload dropdowns dynamically
            loadSelect('/degree/list', `degree_id_${current_table_row_education}`, 'degree', 'degree_id');
            loadSelect('/specialization/list', `specialization_id_${current_table_row_education}`, 'specialization', 'specialization_id');
        }

        function DeleteEducationRow(r, e) {
            e.preventDefault(); // stop page from jumping
            let i = r.parentNode.parentNode.rowIndex;
            document.getElementById("educationInvoice").deleteRow(i);
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
            loadSelect('/employment/list', `employment_id_${current_table_row_employment}`, 'employment_name', 'employment_id');
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
            loadSelect('/relationship/list', `relationship_id_${current_table_row_family}`, 'relationship_name', 'relationship_id');
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
            loadSelect('/satsang_activity/list', `satsang_activity_id_${current_table_row_satsang}`, 'satsang_activity_name', 'satsang_activity_id');

            // Add event listener for this specific activity dropdown
            document.getElementById(`satsang_activity_id_${current_table_row_satsang}`)
                .addEventListener('change', function() {
                    const satsang_activity_id = this.value;
                    getSatsangDesignation(satsang_activity_id, `satsang_designation_id_${current_table_row_satsang}`);
                });
        }

        function DeleteSatsangRow(r, e) {
            e.preventDefault(); // prevent page jump
            let i = r.parentNode.parentNode.rowIndex;
            document.getElementById("satsangInvoice").deleteRow(i);
        }


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
            loadSelect('/grade/list', `grade_id_${current_table_row_talent}`, 'grade_name', 'grade_id');
            loadSelect('/talent/list', `talent_id_${current_table_row_talent}`, 'talent_name', 'talent_id');

        }

        function DeleteTalentRow(r, e) {
            e.preventDefault(); // prevent page jump
            let i = r.parentNode.parentNode.rowIndex;
            document.getElementById("talentInvoice").deleteRow(i);
        }

        // Load Satsang Sevak for Satsang Activity
        document.getElementById('satsang_activity_id').addEventListener('change', function() {
            const satsang_activity_id = this.value;
            getSatsangDesignation(satsang_activity_id, 'satsangi_sevak_id');
        });

        // Load Satsang Designation for Satsang Activity

        document.getElementById('satsang_activity_id').addEventListener('change', function() {
            const satsang_activity_id = this.value;
            getSatsangDesignation(satsang_activity_id, 'satsang_designation_id');
        });

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

        $(document).ready(function() {
            $('#sameprimaryno').on('change', function() {
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

        $('#addmaritalstatus').on('change', function() {
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

        $(document).ready(function() {
            $("#certified").on("change", function() {
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

            $("#not_complete").on("change", function() {
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

            $("#temporary").on("change", function() {
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
        $(document).ready(function() {
            $('#birth_date').on('change', function() {
                let birthDate = $(this).val();
                if (birthDate) {
                    let birthYear = new Date(birthDate).getFullYear();
                    let currentYear = new Date().getFullYear();

                    // Clear old options
                    $('#satasangi_since').empty();

                    // Fill from birthYear → currentYear
                    for (let y = birthYear; y <= currentYear; y++) {
                        $('#satasangi_since').append(`<option value="${y}">${y}</option>`);
                    }

                    // Set default selected to birthYear
                    $('#satasangi_since').val(birthYear);
                    $('#hidden_satasangi_since').val(birthYear);
                }
            });
        });
