    // Fetch category list
    function loadCategory() {
      fetch('/category/list')
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById('category-table-body');
          tableBody.innerHTML = '';
          data.forEach((category, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${category.category_name}</td>
              <td>${category.full_name}</td>
              <td>
                <button class="btn btn-update" onclick="openUpdateModal(${category.category_id}, '${category.category_name}')">Update</button>
                <button class="btn btn-delete" onclick="deleteCategory(${category.category_id})">Delete</button>
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
      const category_name = document.getElementById('addCategoryName').value;

      fetch('/category/addCategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_name })
      })
      .then(res => res.json())
      .then(result => {
        closeAddModal();
        loadCategory();
        window.location.reload(); // 🔄 refresh whole page
      });
    });

    // --- Update Modal ---
    function openUpdateModal(id, category_name) {
      document.getElementById('updateCategoryId').value = id;
      document.getElementById('updateCategoryName').value = category_name;
      document.getElementById('updateModal').style.display = 'block';
    }
    function closeUpdateModal() {
      document.getElementById('updateModal').style.display = 'none';
    }
    
    document.getElementById('updateForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('updateCategoryId').value;
      const category_name = document.getElementById('updateCategoryName').value;
      // console.log("Form Data →", { id, category_name });

      fetch(`/category/update/${id}`, {
        method: 'POST', // keep POST if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_name })
      })
      .then(res => res.json())
      .then(result => {
        closeUpdateModal();
        loadCategory();
        // window.location.reload(); // 🔄 refresh whole page
      });
    });

    // --- Delete ---
    function deleteCategory(id) {
      if (confirm("Are you sure you want to delete this category?")) {
        fetch(`/category/delete/${id}`, { method: 'DELETE' }) // keep POST if backend expects it
          .then(res => res.json())
          .then(result => {
            alert(result.message);
            loadCategory();
            window.location.reload(); // 🔄 refresh whole page

          });
      }
    }

    // Initial load
    loadCategory();
