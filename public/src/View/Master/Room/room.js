   // Fetch room list
    function loadRoom() {
      fetch('/room/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('room-table-body');
          tableBody.innerHTML = '';
          data.forEach((room, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${room.room_no}</td>
              <td>${room.no_of_occupancy}</td>
              <td>${room.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${room.room_id}, '${room.room_no}', ${room.no_of_occupancy})">Update</button>
                <button class="btn btn-delete" onclick="deleteRoom(${room.room_id})">Delete</button>
              </td>
            `;
            tableBody.appendChild(row);
          });
        });
    }

    // --- Add Modal ---
    function openAddModal() {
      document.getElementById('addModal').style.display = 'block';
    }
    function closeAddModal() {
      document.getElementById('addModal').style.display = 'none';
    }
    document.getElementById('addForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const room_no = document.getElementById('addRoomName').value;
      const no_of_occupancy = document.getElementById('addRoomOccupancy').value;

      fetch('/room/addRoom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_no, no_of_occupancy })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadRoom();
        window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Update Modal ---
    function openUpdateModal(id, name, occupancy) {
      document.getElementById('updateRoomId').value = id;
      document.getElementById('updateRoomName').value = name;
      document.getElementById('updateRoomOccupancy').value = occupancy;
      document.getElementById('updateModal').style.display = 'block';
    }
    function closeUpdateModal() {
      document.getElementById('updateModal').style.display = 'none';
    }
    document.getElementById('updateForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('updateRoomId').value;
      const room_no = document.getElementById('updateRoomName').value;
      const no_of_occupancy = document.getElementById('updateRoomOccupancy').value;

      fetch(`/room/update/${id}`, {
        method: 'POST', // keep POST if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_no, no_of_occupancy })
      })
      .then(res => res.json())
      .then(result => {
        closeUpdateModal();
        loadRoom();
        window.location.reload(); // 🔄 refresh whole page

      });
    });

    // --- Delete ---
    function deleteRoom(id) {
      if (confirm("Are you sure you want to delete this room?")) {
        fetch(`/room/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadRoom();
                    window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadRoom();