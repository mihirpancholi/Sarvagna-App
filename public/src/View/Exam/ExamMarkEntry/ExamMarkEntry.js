// -------------------- Load Exam Schedule Table --------------------
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function LoadExamMarks() {
    fetch('/ExamMarkEntry/list')
        .then(res => res.json())
        .then(data => {
            const tableBody = document.getElementById('ExamMarks-table-body');
            tableBody.innerHTML = '';
            data.forEach((exam, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${index + 1}</td>
          <td>${exam.exam_type}</td>
          <td>${exam.exam_name}</td>
          <td>${exam.exam_date}</td>
          <td>${exam.total_marks}</td>
          <td>${exam.present_count}</td>
          <td>${exam.absent_count}</td>
          <td>
            <a href="./ExamMarkEntry/edit?exam_id=${exam.exam_id}&examtype_id=${exam.examtype_id}" class="btn btn-update" style="text-decoration: none;">
   Update
</a>

          </td>
          <td>
            <button class="btn btn-delete" onclick="deleteSchedule(${exam.delete})">Delete</button>
          </td>
          `;
                tableBody.appendChild(row);
            });
        });
}


// Fetch data and render in a div
fetch('/ExamMarkEntry/data')
    .then(res => res.json())
    .then(response => {
        const div = document.getElementById('indexData');
        if (response.success && response.data.length > 0) {
            let html = '';
            response.data.forEach(row => {
                html += `<p><strong>Batch:</strong> ${row.batch} — <strong>Sevak Count:</strong> ${row.sevakCount}</p>`;
            });
            div.innerHTML = html;
        } else {
            div.textContent = 'No data available.';
        }
    })
    .catch(err => {
        console.error(err);
        document.getElementById('indexData').textContent = 'Error loading data.';
    });

// -------------------- INITIAL LOAD --------------------
LoadExamMarks();
