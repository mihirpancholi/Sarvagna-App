document.addEventListener('DOMContentLoaded', function () {
    fetch('/MyBatchmate/list')
        .then(response => response.json())
        .then(result => {
            if (!result.success) {
                throw new Error(result.message || 'Failed to load data.');
            }

            const batchmates = result.data;
            const tableBody = document.getElementById('batchmate-table-body');
            const batchNameSpan = document.getElementById('talim-batch-name');
            tableBody.innerHTML = ''; // Clear existing rows

            if (batchmates.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="7">No batchmates found.</td></tr>';
                return;
            }

            // Set batch name
            batchNameSpan.textContent = batchmates[0].batch;

            batchmates.forEach((row, index) => {
                const birthDate = row.birth_date && row.birth_date !== '1970-01-01'
                    ? new Date(row.birth_date).toLocaleDateString('en-GB')
                    : '';
                const marriageDate = row.marriage_date && row.marriage_date !== '1970-01-01'
                    ? new Date(row.marriage_date).toLocaleDateString('en-GB')
                    : '';

                const contactParts = [row.contact_mobile1, row.contact_whatsapp_no].filter(Boolean);
                const contactNo = contactParts.join(', ');

                const tr = `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${row.ytk_id || ''}</td>
                                <td>${row.sevak_name || ''}</td>
                                <td>${row.city_name || ''}</td>
                                <td>${birthDate}</td>
                                <td>${marriageDate}</td>
                                <td>${contactNo}</td>
                            </tr>`;
                tableBody.innerHTML += tr;
            });
        })
        .catch(error => {
            console.error('Error fetching batchmates:', error);
            document.getElementById('batchmate-table-body').innerHTML = `<tr><td colspan="7">Error loading data: ${error.message}</td></tr>`;
        });
});