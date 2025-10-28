function LoadGosthiMemberMapping() {
  fetch("/GroupMemberMapping/list")
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data)) {
        console.error("Data is not an array:", data);
        return;
      }

      const tableBody = document.querySelector("#GosthiMemberMapping-table-body");
      tableBody.innerHTML = "";

      data.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.zone_name || ""}</td>
          <td>
            <a href="#" 
              data-target="#groupSevakDetailModel"
              title="Goshthi Group Sevak Detail"
              onclick="getGroupSevakDetail(${item.group_id})"
              data-toggle="modal">
              ${item.zone_code || ""}${item.zone_no || ""} - ${item.group_name || ""}
            </a>
          </td>
          <td>${item.mandir_name || ""}</td>
          <td>${item.kshetra_name || ""}</td>
          <td>${item.no_of_member || ""}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((err) => console.error("Error loading Gosthi Member Mapping:", err));
}

LoadGosthiMemberMapping();



function getGroupSevakDetail(groupId) {
  fetch(`/GroupMemberMapping/getGroupSevakDetails/${groupId}`)
    .then((res) => res.json())
    .then((members) => {
      const container = document.getElementById("groupSevakDetailTb");
      container.innerHTML = ""; // clear previous content

      if (members.length === 0) {
        container.innerHTML = '<p style="color:red;">No data available in table.</p>';
        return;
      }

      // Create table dynamically
      const table = document.createElement("table");
      table.className = "table table-striped table-bordered";

      // Table header
      table.innerHTML = `
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Ytk Id</th>
            <th>Sevak Name</th>
            <th>City</th>
            <th>Kshetra Name</th>
            <th>All Contact Numbers</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;

      const tbody = table.querySelector("tbody");

      members.forEach((member, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${member.group_name || ""}</td>
          <td>${member.ytk_id || ""}</td>
          <td>${member.sevak_name || ""}</td>
          <td>${member.city_name || ""}</td>
          <td>${member.kshetra_name || ""}</td>
          <td>${member.ContactNo || ""}</td>
        `;
        tbody.appendChild(row);
      });

      container.appendChild(table);

      // Show the modal
      document.getElementById("groupSevakDetailModel").style.display = "block";
    })
    .catch((err) => console.error("Error loading group members:", err));
}

// Simple function to close modal
function closeModal() {
  document.getElementById("groupSevakDetailModel").style.display = "none";
}
