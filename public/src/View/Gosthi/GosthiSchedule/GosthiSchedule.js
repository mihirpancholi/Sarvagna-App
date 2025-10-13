function LoadTalimYear(selectId, selectedValue = null) {
  const select = document.getElementById(selectId);
  select.innerHTML = "";

  // Add a blank "Select Year" option first
  const blankOption = document.createElement("option");
  blankOption.value = "";
  blankOption.text = "- Select Year -";
  select.appendChild(blankOption);

  const currentYear = new Date().getFullYear();
  const startYear = currentYear;
  for (let year = startYear; year <= currentYear + 1; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    if (selectedValue && selectedValue == year) {
      option.selected = true;
    }
    select.appendChild(option);
  }
}

LoadTalimYear("gosthi_year");

function getGosthiYearWise() {
  const gosthi_year = document.getElementById("gosthi_year").value;
  // console.log("Selected Year:", gosthi_year);

  // Populate month dropdown with all months first
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthSelect = $("#gosthi_month");
  monthSelect.empty();
  monthSelect.append(
    $("<option>", { value: "", text: "- Select Gosthi Month -" })
  );

  monthNames.forEach((month) => {
    monthSelect.append($("<option>", { value: month, text: month }));
  });

  // Only call backend if year is selected
  if (!gosthi_year) return;

  fetch("/GosthiSchedule/getYearwiseMonth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gosthi_year }), // ✅ sends body correctly
  })
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          $(`#gosthi_month option[value='${item.gosthi_month}']`).remove();
        });
      } else {
        console.error("Unexpected response format:", data);
      }
    })
    .catch((err) => console.error("Error loading months:", err));
}

function LoadGosthiType(selectId, selectedValue = null) {
  fetch("/gosthi_type/list")
    .then((res) => res.json())
    .then((zones) => {
      const select = document.getElementById(selectId);
      select.innerHTML = '<option value="">-- Select  --</option>';
      zones.forEach((z) => {
        const opt = document.createElement("option");
        opt.value = z.gosthi_topic_type_id;
        opt.textContent = z.gosthi_topic_type;
        if (selectedValue && selectedValue == z.zone_id) opt.selected = true;
        select.appendChild(opt);
      });
    });
}

LoadGosthiType("gosthi_topic_type_id");

function getGosthiNumber() {
  const gosthi_topic_type_id = $("#gosthi_topic_type_id").val();
  const gosthi_month = $("#gosthi_month").val();

  if (!gosthi_topic_type_id || !gosthi_month) {
    console.warn("Cannot fetch Gosthi No: missing topic or month");
    return; // stop if required values are missing
  }

  fetch("/GosthiSchedule/getGosthiNo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      gosthi_topic_type_id,
      gosthi_month,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const no = data.gosthi_topic_type_no;
      let maxno = 0;

      $("#GosthiTopicTable > tbody > tr").each(function (i, el) {
        const inputGosthi = $(el).children().get(0);
        const iGos = $(inputGosthi).find("input").val();

        const inputEl = $(el).children().get(1);
        const inno = $(inputEl).find("input").val();

        if (iGos == gosthi_topic_type_id) {
          maxno = inno;
        }
      });

      const count = $("#GosthiTopicTable > tbody > tr").length;
      $("#gosthi_topic_type_no").val(count > 0 ? parseInt(maxno) + 1 : no);
    })
    .catch((err) => console.error("Error fetching Gosthi No:", err));
}

/* Delete item row */
function DeleteTableRow(btn) {
  const row = btn.closest("tr"); // get the parent row
  row.remove(); // remove it from DOM
  clear_input();
}

/* Insert data */
function InsertTableRow() {
  const topicSelect = document.getElementById("gosthi_topic_type_id");
  const gosthi_topic_type_id = topicSelect.value;
  const item_text = topicSelect.options[topicSelect.selectedIndex].text;

  let current_table_row = parseInt($("#current_table_row").val() || 0);
  current_table_row += 1;

  let topic_name = $("#topic_name").val();
  if (!topic_name) topic_name = "";

  if (!gosthi_topic_type_id) {
    alert("Please Select Gosthi Topic Type.");
    return false;
  }

  const tableBody = document.querySelector("#GosthiTopicTable tbody");
  const row = tableBody.insertRow(-1);

  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);

  const topicNo = $("#gosthi_topic_type_no").val();

  cell1.innerHTML = `<input type="hidden" name="gosthi_topic[]" value="${gosthi_topic_type_id}"/>${item_text}-${topicNo}`;
  cell1.className = "text-left";

  cell2.innerHTML = `<input type="hidden"  name="gosthi_topic_type_no[]" value="${topicNo}"/>${topicNo}`;
  cell2.className = "text-left";

  cell3.innerHTML = `<input type="hidden" name="topic_name[]" value="${topic_name}"/>${topic_name}`;
  cell3.className = "text-left";

  cell4.innerHTML = `<button class="btn btn-danger btn-sm" type="button" onclick="DeleteTableRow(this)">
                          Delete
                       </button>`;
  cell4.className = "text-center";

  $("#topic_name").hide(); // hide input if needed
  $("#current_table_row").val(current_table_row);

  clear_input();
  $("#gosthi_topic_type_id").focus();
}

/* Clear input fields */
function clear_input() {
  $("#gosthi_topic_type_id").val("");
  $("#gosthi_topic_type_no").val("");
  $("#topic_name").val("").show();
}

document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("report_submission_from_date").value = today;
});

// Handle form submission
document
  .getElementById("gosthiScheduleForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // prevent default form submit

    // Collect header-level data
    const gosthi_year = document.getElementById("gosthi_year").value;
    const gosthi_month = document.getElementById("gosthi_month").value;
    const report_submission_from_date = document.getElementById(
      "report_submission_from_date"
    ).value;

    // Validate required fields
    if (!gosthi_year || !gosthi_month || !report_submission_from_date) {
      alert("Please fill all required fields.");
      return;
    }

    // Collect table data
    const tableRows = document.querySelectorAll("#GosthiTopicTable tbody tr");
    if (tableRows.length === 0) {
      alert("Please add at least one Gosthi Topic.");
      return;
    }

    const topics = [];
    tableRows.forEach((row) => {
      const topicId = row.querySelector('input[name="gosthi_topic[]"]').value;
      const topicNo = row.querySelector(
        'input[name="gosthi_topic_type_no[]"]'
      ).value;
      const topicName = row.querySelector('input[name="topic_name[]"]').value;

      topics.push({
        gosthi_topic_type_id: topicId,
        gosthi_topic_type_no: topicNo,
        topic_name: topicName,
      });
    });

    // Prepare payload
    const payload = {
      gosthi_year,
      gosthi_month,
      report_submission_from_date,
      topics,
    };

    // Send to backend
    fetch("/GosthiSchedule/addGosthiSchedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          document.getElementById("gosthiScheduleForm").reset();
          document.querySelector("#GosthiTopicTable tbody").innerHTML = "";
          window.location.href = "/GosthiSchedule";
        } else {
          alert(result.message);
        }
      })
      .catch((err) => console.error("Error saving Gosthi Schedule:", err));
  });
