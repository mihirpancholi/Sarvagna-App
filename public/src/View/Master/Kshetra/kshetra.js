// ----------------- Loaders -----------------
function loadKshetra() {
  fetch('/Kshetra/list')
    .then(res => res.json())
    .then(data => {
      const tableBody = document.getElementById('Kshetra-table-body');
      tableBody.innerHTML = '';
      data.forEach((k, i) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${i + 1}</td>
          <td>${k.kshetra_code}</td>
          <td>${k.kshetra_name}</td>
          <td>${k.zone_name}</td>
          <td>${k.mandir_name}</td>
          <td>${k.sant_nirdeshak_name}</td>
          <td>${k.nirdeshak_name}</td>
          <td>${k.full_name}</td>
          <td>
            <button class="btn btn-update" 
  onclick="openUpdateModal(
    ${k.kshetra_id}, 
    '${k.kshetra_code}', 
    '${k.kshetra_name}', 
    ${k.zone_id}, 
    ${k.mandir_id}, 
    ${k.sant_nirdeshak_id}, 
    ${k.nirdeshak_id}
  )">
  Update
</button>

            <button class="btn btn-delete" onclick="deleteKshetra(${k.kshetra_id})">Delete</button>
          </td>`;
        tableBody.appendChild(row);
      });
    });
}

function LoadZones(selectId, selectedValue = null) {
  fetch('/zone/list')
    .then(res => res.json())
    .then(zones => {
      const select = document.getElementById(selectId);
      select.innerHTML = '<option value="">-- Select Zone --</option>';
      zones.forEach(z => {
        const opt = document.createElement('option');
        opt.value = z.zone_id;
        opt.textContent = z.zone_name;
        if (selectedValue && selectedValue == z.zone_id) opt.selected = true;
        select.appendChild(opt);
      });
    });
}

function LoadSantNirdeshak(selectId, selectedValue = null) {
  fetch('/santnirdeshak/list')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById(selectId);
      select.innerHTML = '<option value="">-- Select Sant Nirdeshak --</option>';
      data.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.sant_nirdeshak_id;
        opt.textContent = d.sant_nirdeshak_name;
        if (selectedValue && selectedValue == d.sant_nirdeshak_id) opt.selected = true;
        select.appendChild(opt);
      });
    });
}

function LoadNirdeshak(selectId, selectedValue = null) {
  fetch('/nirdeshak/list')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById(selectId);
      select.innerHTML = '<option value="">-- Select Nirdeshak --</option>';
      data.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.nirdeshak_id;
        opt.textContent = d.nirdeshak_name;
        if (selectedValue && selectedValue == d.nirdeshak_id) opt.selected = true;
        select.appendChild(opt);
      });
    });
}

function loadMandir(zone_id, selectId, selectedValue = null) {
  fetch(`/common/getmandirbyzone?zone_id=${zone_id}`)
    .then(res => res.json())
    .then(mandirs => {
      const select = document.getElementById(selectId);
      select.innerHTML = '<option value="">-- Select Mandir --</option>';
      mandirs.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.mandir_id;
        opt.textContent = m.mandir_name;
        if (selectedValue && selectedValue == m.mandir_id) opt.selected = true;
        select.appendChild(opt);
      });
    });
}

// ----------------- Add Modal -----------------
function openAddModal() {
  LoadZones('addZone');
  LoadSantNirdeshak('addSantNirdeshak');
  LoadNirdeshak('addNirdeshak');
  document.getElementById('addMandir').innerHTML = '<option value="">-- Select Mandir --</option>';
  document.getElementById('addModal').style.display = 'block';
}

function closeAddModal() {
  document.getElementById('addModal').style.display = 'none';
}

document.getElementById('addZone').addEventListener('change', function() {
  if (this.value) loadMandir(this.value, 'addMandir');
});

// Add Form Submit
document.getElementById('addForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const Kshetra_code = document.getElementById('addKshetraCode').value;
  const Kshetra_name = document.getElementById('addKshetraName').value;
  const zone_id = document.getElementById('addZone').value;
  const mandir_id = document.getElementById('addMandir').value;
  const sant_nirdeshak_id = document.getElementById('addSantNirdeshak').value;
  const nirdeshak_id = document.getElementById('addNirdeshak').value;

  fetch('/Kshetra/addKshetra', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Kshetra_code, Kshetra_name, zone_id, mandir_id, sant_nirdeshak_id, nirdeshak_id })
  }).then(r => r.json())
    .then(() => {
      closeAddModal();
      loadKshetra();
                      window.location.reload(); // 🔄 refresh whole page

      // console.log(Kshetra_code, Kshetra_name, zone_id, mandir_id, sant_nirdeshak_id, nirdeshak_id);
    });
});

// ----------------- Update Modal -----------------
function openUpdateModal(id, Kshetra_code, Kshetra_name, zone_id, mandir_id, sant_nirdeshak_id, nirdeshak_id) {
  document.getElementById('updateKshetraId').value = id;
  document.getElementById('updateKshetraCode').value = Kshetra_code;
  document.getElementById('updateKshetraName').value = Kshetra_name;

  LoadZones('updateZone', zone_id);
  loadMandir(zone_id, 'updateMandir', mandir_id);
  LoadSantNirdeshak('updateSantNirdeshak', sant_nirdeshak_id);
  LoadNirdeshak('updateNirdeshak', nirdeshak_id);

  document.getElementById('updateModal').style.display = 'block';
}

function closeUpdateModal() {
  document.getElementById('updateModal').style.display = 'none';
}

document.getElementById('updateZone').addEventListener('change', function() {
  if (this.value) loadMandir(this.value, 'updateMandir');
});

// Update Form Submit
document.getElementById('updateForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('updateKshetraId').value;
  const Kshetra_code = document.getElementById('updateKshetraCode').value;
  const Kshetra_name = document.getElementById('updateKshetraName').value;
  const zone_id = document.getElementById('updateZone').value;
  const mandir_id = document.getElementById('updateMandir').value;
  const sant_nirdeshak_id = document.getElementById('updateSantNirdeshak').value;
  const nirdeshak_id = document.getElementById('updateNirdeshak').value;

  fetch(`/Kshetra/update/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Kshetra_code, Kshetra_name, zone_id, mandir_id, sant_nirdeshak_id, nirdeshak_id })
  }).then(r => r.json())
    .then(() => {
      closeUpdateModal();
      loadKshetra();
                      window.location.reload(); // 🔄 refresh whole page

    });
});

// ----------------- Delete -----------------
function deleteKshetra(id) {
  if (confirm("Are you sure?")) {
    fetch(`/Kshetra/delete/${id}`, { method: 'DELETE' })
      .then(r => r.json())
      .then(() => loadKshetra());
                      window.location.reload(); // 🔄 refresh whole page

  }
}

// Initial load
loadKshetra();