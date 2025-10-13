function LoadGosthiSchedule() {
  fetch("/GosthiSchedule/list")
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data)) {
        console.error("Data is not an array:", data);
        return;
      }

      const tableBody = document.getElementById("GosthiSchedule-table-body");
      tableBody.innerHTML = "";

      data.forEach((schedule, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${schedule.gosthi_month || ""}</td>
          <td>${schedule.gosthi_year || ""}</td>
<td>${
          schedule.report_submission_from_date
            ? new Date(
                schedule.report_submission_from_date
              ).toLocaleDateString()
            : ""
        }</td>
          <td>${schedule.full_name || ""}</td>
          <td>
            <button class="btn btn-update" onclick="window.location.href='/GosthiSchedule/update/${
              schedule.group_id
            }'">Update</button>
            <button class="btn btn-delete" onclick="deleteGosthiSchedule(${
              schedule.group_id || 0
            })">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((err) => console.error("Error loading Gosthi Schedule:", err));
}

LoadGosthiSchedule();
