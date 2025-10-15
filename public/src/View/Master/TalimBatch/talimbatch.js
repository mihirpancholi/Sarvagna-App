 // Populate year dropdowns
  function populateYearDropdown(selectId) {
    var select = document.getElementById(selectId);
    select.innerHTML = '';
    var currentYear = new Date().getFullYear();
    for (var year = 2007; year <= currentYear + 1; year++) {
      var option = document.createElement('option');
      option.value = year;
      option.text = year;
      select.appendChild(option);
    }
  }
  populateYearDropdown('addTalimYear');
  populateYearDropdown('updateTalimYear');

  // --- Modals ---
  function openAddModal(){ document.getElementById('addModal').style.display='block'; }
  function closeAddModal(){ document.getElementById('addModal').style.display='none'; }
  function closeUpdateModal(){ document.getElementById('updateModal').style.display='none'; }

  // --- Load Talim Batches ---
  function loadTalimBatches() {
    fetch('/talim_batch/list')
      .then(res => res.json())
      .then(batches => {
        var tableBody = document.getElementById('talim_batchTableBody');
        tableBody.innerHTML = '';
        batches.forEach((batch, index) => {
          var row = document.createElement('tr');
          row.innerHTML = `
            <td>${index+1}</td>
            <td>${batch.talim_year}</td>
            <td>${batch.talim_batch === "F" ? "First" : "Second"}</td>
            <td>${formatDate(batch.start_date)}</td>
            <td>${formatDate(batch.end_date)}</td>
            <td>${batch.is_active}</td>
            <td>
              <button class="btn btn-update" onclick="openUpdateModal(${batch.talim_batch_id}, '${batch.talim_year}', '${batch.talim_batch}', '${batch.start_date}', '${batch.end_date}', '${batch.is_active}')">Update</button>
              <button class="btn btn-delete" onclick="deleteTalimBatch(${batch.talim_batch_id})">Delete</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      });
  }

  // --- Add Talim Batch ---
  document.getElementById('addForm').addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      talim_year: document.getElementById('addTalimYear').value,
      talim_batch: document.getElementById('addTalimBatchName').value,
      start_date: document.getElementById('addStartDate').value,
      end_date: document.getElementById('addEndDate').value,
      is_active: document.getElementById('addIsActive').value
    };
    fetch('/talim_batch/addTalim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
      closeAddModal();
      loadTalimBatches();
      window.location.reload();
    });
  });

  // --- Helper to format dates ---
  function formatDate(dateStr) {
    if (!dateStr) return "";
    return dateStr.split("T")[0].split(" ")[0]; // handles "YYYY-MM-DD" and "YYYY-MM-DD HH:mm:ss"
  }

  // --- Open Update Modal ---
  function openUpdateModal(id, year, batch, start, end, active) {
    document.getElementById('updateBatchId').value = id;
    document.getElementById('updateTalimYear').value = year;

    // Fix mismatch between DB values and dropdown options
    if (batch === "First") batch = "F";
    if (batch === "Second") batch = "S";
    document.getElementById('updateTalimBatchName').value = batch;

    document.getElementById('updateStartDate').value = formatDate(start);
    document.getElementById('updateEndDate').value = formatDate(end);
    document.getElementById('updateIsActive').value = active;

    document.getElementById('updateModal').style.display = 'block';
  }

  // --- Update Talim Batch ---
  document.getElementById('updateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('updateBatchId').value;
    const talim_year = document.getElementById('updateTalimYear').value;
    const talim_batch = document.getElementById('updateTalimBatchName').value;
    const start_date = document.getElementById('updateStartDate').value;
    const end_date = document.getElementById('updateEndDate').value;
    const is_active = document.getElementById('updateIsActive').value;

    fetch(`/talim_batch/update/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ talim_year, talim_batch, start_date, end_date, is_active })
    })
    .then(res => res.json())
    .then(() => {
      closeUpdateModal();
      loadTalimBatches();
      window.location.reload();
    });
  });

  // --- Delete Talim Batch ---
  function deleteTalimBatch(batchId){
    if(confirm("Are you sure you want to delete this batch?")){
      fetch('/talim_batch/delete/' + batchId, { method:'DELETE' })
        .then(res => res.json())
        .then(result => {
          if(result.success){ loadTalimBatches(); }
          else { alert(result.message); }
        });
    }
  }

  // Initial load
  loadTalimBatches();