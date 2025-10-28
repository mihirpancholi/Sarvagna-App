// Load Groups into form select
function LoadGroups(selectId, selectedValue = null) {
    fetch("/Gosthi/groups")
        .then((res) => res.json())
        .then((data) => {
            if (!data.success) return alert("Error loading groups");

            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">-- Select Group --</option>';

            data.data.forEach((g) => {
                const opt = document.createElement("option");
                opt.value = g.group_id;
                opt.textContent = g.group_name;
                if (selectedValue && selectedValue == g.group_id) opt.selected = true;
                select.appendChild(opt);
            });

            // If a group is pre-selected, load the table automatically
            if (selectedValue) LoadReports(selectedValue);
        });
}

// Load reports table filtered by selected group
function LoadReports(groupId) {
    if (!groupId) return; // do nothing if no group selected

    fetch("/Gosthi/tablereport?group_id=" + groupId)
        .then((res) => res.json())
        .then((json) => {
            const tbody = document.getElementById("reportBody");
            tbody.innerHTML = "";

            json.data.forEach((r) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
            <td>${r.group_name || ""}</td>
            <td>${r.sevak_name || ""}</td>
            <td>${r.month || ""}</td>
            <td>${r.scheduled_date || ""}</td>
            <td>${r.from_time || ""}</td>
            <td>${r.to_time || ""}</td>
            <td>${r.location || ""}</td>
            <td>${r.report_status || ""}</td>
          `;
                tbody.appendChild(tr);
            });
        });
}

// When group is selected in form, load table automatically
document.getElementById("group_id").addEventListener("change", (e) => {
    LoadReports(e.target.value);
});

// Form submission
document.getElementById("createGosthiForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const payload = {
        group_id: document.getElementById("group_id").value,
        gosthi_date: document.getElementById("gosthi_date").value,
        from_time: document.getElementById("from_time").value,
        to_time: document.getElementById("to_time").value,
        location: document.getElementById("location").value,
        created_id: 1, // replace with logged in user ID
    };

    fetch("/Gosthi/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
        .then((res) => res.json())
        .then((json) => {
            alert(json.message);
            if (json.success) LoadReports(payload.group_id);
        });
});

// Initialize groups
LoadGroups("group_id");