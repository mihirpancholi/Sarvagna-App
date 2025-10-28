const scheduleId = window.location.pathname.split("/").pop(); // Get schedule ID from URL
let editRow = null; // keep track of row being edited

// ------------------ 1️⃣ Load Talim Years ------------------
function LoadTalimYear(selectId, selectedValue = null) {
    const select = document.getElementById(selectId);
    select.innerHTML = "";

    const blankOption = document.createElement("option");
    blankOption.value = "";
    blankOption.text = "- Select Year -";
    select.appendChild(blankOption);

    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 1; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.text = year;
        if (selectedValue && selectedValue == year) option.selected = true;
        select.appendChild(option);
    }
}
LoadTalimYear("gosthi_year");

// ------------------ 2️⃣ Load Gosthi Types ------------------
function LoadGosthiType(selectId, selectedValue = null) {
    fetch("/gosthi_type/list")
        .then(res => res.json())
        .then(types => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select  --</option>';
            types.forEach(t => {
                const opt = document.createElement("option");
                opt.value = t.gosthi_topic_type_id;
                opt.textContent = t.gosthi_topic_type;
                if (selectedValue && selectedValue == t.gosthi_topic_type_id) opt.selected = true;
                select.appendChild(opt);
            });
        });
}
LoadGosthiType("gosthi_topic_type_id");

// ------------------ 3️⃣ Load Yearwise Months ------------------
function getGosthiYearWise(selectedYear = null, selectedMonth = null) {
    const gosthi_year = selectedYear || $("#gosthi_year").val();

    // Populate month dropdown with all months first
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthSelect = $("#gosthi_month");
    monthSelect.empty();
    monthSelect.append($("<option>", { value: "", text: "- Select Gosthi Month -" }));

    monthNames.forEach(month => {
        monthSelect.append($("<option>", { value: month, text: month }));
    });

    if (!gosthi_year) return;

    // Fetch already used months for the selected year
    fetch("/GosthiSchedule/getYearwiseMonth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gosthi_year }),
    })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    // Remove month only if it is NOT the selectedMonth
                    if (item.gosthi_month !== selectedMonth) {
                        monthSelect.find(`option[value='${item.gosthi_month}']`).remove();
                    }
                });
            } else {
                console.error("Unexpected response format:", data);
            }

            // Set the selected month (if any)
            monthSelect.val(selectedMonth || "");
        })
        .catch(err => console.error("Error loading months:", err));
}





// ------------------ 4️⃣ Get Gosthi Number ------------------
function getGosthiNumber() {
    const gosthi_topic_type_id = $("#gosthi_topic_type_id").val();
    const gosthi_month = $("#gosthi_month").val();

    if (!gosthi_topic_type_id || !gosthi_month) return;

    fetch("/GosthiSchedule/getGosthiNo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gosthi_topic_type_id, gosthi_month }),
    })
        .then(res => res.json())
        .then(data => {
            const noFromBackend = data.gosthi_topic_type_no || 1;
            let maxNo = noFromBackend;

            $("#GosthiTopicTable > tbody > tr").each(function () {
                const topicIdInRow = $(this).find('input[name="gosthi_topic[]"]').val();
                const topicNoInRow = parseInt($(this).find('input[name="gosthi_topic_type_no[]"]').val(), 10);
                if (topicIdInRow == gosthi_topic_type_id && topicNoInRow >= maxNo) {
                    maxNo = topicNoInRow + 1;
                }
            });

            $("#gosthi_topic_type_no").val(maxNo);
        })
        .catch(err => console.error("Error fetching Gosthi No:", err));
}

// ------------------ 5️⃣ Insert or Edit Table Row ------------------
function InsertTableRow() {
    const topicSelect = document.getElementById("gosthi_topic_type_id");
    const topicId = topicSelect.value;
    const topicText = topicSelect.options[topicSelect.selectedIndex].text;
    const topicNo = $("#gosthi_topic_type_no").val();
    const topicName = $("#topic_name").val() || "";

    if (!topicId) return alert("Please select Gosthi Topic Type.");

    if (editRow) {
        // Update existing row
        editRow.cells[0].innerHTML = `<input type="hidden" name="gosthi_topic[]" value="${topicId}"/>${topicText}-${topicNo}`;
        editRow.cells[1].innerHTML = `<input type="hidden" name="gosthi_topic_type_no[]" value="${topicNo}"/>${topicNo}`;
        editRow.cells[2].innerHTML = `<input type="hidden" name="topic_name[]" value="${topicName}"/>${topicName}`;
        editRow = null;
    } else {
        // Insert new row
        const tableBody = document.querySelector("#GosthiTopicTable tbody");
        const row = tableBody.insertRow(-1);

        row.insertCell(0).innerHTML = `<input type="hidden" name="gosthi_topic[]" value="${topicId}"/>${topicText}-${topicNo}`;
        row.insertCell(1).innerHTML = `<input type="hidden" name="gosthi_topic_type_no[]" value="${topicNo}"/>${topicNo}`;
        row.insertCell(2).innerHTML = `<input type="hidden" name="topic_name[]" value="${topicName}"/>${topicName}`;
        row.insertCell(3).innerHTML = `<button class="btn btn-danger btn-sm" type="button" onclick="DeleteTableRow(this)">Delete</button>`;
    }

    clear_input();
}

// ------------------ 6️⃣ Delete Table Row ------------------
function DeleteTableRow(btn) {
    const row = btn.closest("tr");
    row.remove();
    clear_input();
}

// ------------------ 7️⃣ Clear Input Fields ------------------
function clear_input() {
    $("#gosthi_topic_type_id").val("");
    $("#gosthi_topic_type_no").val("");
    $("#topic_name").val("").show();
    editRow = null;
}

// ------------------ 8️⃣ Load Existing Schedule ------------------
fetch(`/GosthiSchedule/${scheduleId}`)
    .then(res => res.json())
    .then(data => {
        if (!data) return alert("Schedule not found");

        LoadTalimYear("gosthi_year", data.gosthi_year);

        // Load months and select the month from DB
        getGosthiYearWise(data.gosthi_year, data.gosthi_month);

        $("#report_submission_from_date").val(
            new Date(data.report_submission_from_date).toISOString().split("T")[0]
        );

        // Populate table
        data.topics.forEach(topic => {
            const tableBody = document.querySelector("#GosthiTopicTable tbody");
            const row = tableBody.insertRow(-1);

            row.insertCell(0).innerHTML = `<input type="hidden" name="gosthi_topic[]" value="${topic.gosthi_topic_type_id}"/>${topic.gosthi_topic_type}-${topic.gosthi_topic_type_no}`;
            row.insertCell(1).innerHTML = `<input type="hidden" name="gosthi_topic_type_no[]" value="${topic.gosthi_topic_type_no}"/>${topic.gosthi_topic_type_no}`;
            row.insertCell(2).innerHTML = `<input type="hidden" name="topic_name[]" value="${topic.topic_name}"/>${topic.topic_name}`;
            row.insertCell(3).innerHTML = `<button class="btn btn-danger btn-sm" type="button" onclick="DeleteTableRow(this)">Delete</button>`;

            row.onclick = () => {
                $("#gosthi_topic_type_id").val(topic.gosthi_topic_type_id);
                $("#gosthi_topic_type_no").val(topic.gosthi_topic_type_no);
                $("#topic_name").val(topic.topic_name).show();
                editRow = row;
                getGosthiNumber();
            };
        });
    });

// ------------------ 9️⃣ Handle Form Submission ------------------
document.getElementById("gosthiScheduleForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const gosthi_year = $("#gosthi_year").val();
    const gosthi_month = $("#gosthi_month").val();
    const report_submission_from_date = $("#report_submission_from_date").val();

    if (!gosthi_year || !gosthi_month || !report_submission_from_date) {
        return alert("Please fill all required fields.");
    }

    const tableRows = document.querySelectorAll("#GosthiTopicTable tbody tr");
    if (tableRows.length === 0) return alert("Add at least one topic.");

    const topics = [];
    tableRows.forEach(row => {
        topics.push({
            gosthi_topic_type_id: row.querySelector('input[name="gosthi_topic[]"]').value,
            gosthi_topic_type_no: row.querySelector('input[name="gosthi_topic_type_no[]"]').value,
            topic_name: row.querySelector('input[name="topic_name[]"]').value,
        });
    });

    fetch(`/GosthiSchedule/Postupdate/${scheduleId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gosthi_year, gosthi_month, report_submission_from_date, topics }),
    })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                window.location.href = "/GosthiSchedule";
            } else {
                alert(result.message);
            }
        })
        .catch(err => console.error("Error updating schedule:", err));
});
