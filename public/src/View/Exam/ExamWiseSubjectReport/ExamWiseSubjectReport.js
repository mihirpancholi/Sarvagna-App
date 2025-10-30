document.addEventListener('DOMContentLoaded', () => {
    const talimBatchSelect = document.getElementById('talim_batch_id');
    const examTypeSelect = document.getElementById('examtype_id');
    const examSelect = document.getElementById('exam_id');

    // Populate initial dropdowns
    fetch('/ExamWiseSubjectReport/initial-data')
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                populateSelect(talimBatchSelect, result.data.talimBatches, 'talim_batch_id', 'batch', 'Select Talim Batch');
                populateSelect(examTypeSelect, result.data.examTypes, 'examtype_id', 'exam_type', 'Select Exam Type');
            }
        });

    // Event listeners to update Exam Name dropdown
    talimBatchSelect.addEventListener('change', updateExamNames);
    examTypeSelect.addEventListener('change', updateExamNames);

    // Event listeners for report generation
    document.getElementById('generatePdfBtn').addEventListener('click', () => generateReport('pdf'));
    document.getElementById('generateExcelBtn').addEventListener('click', () => generateReport('excel'));

    function populateSelect(selectElement, data, valueField, textField, defaultText) {
        selectElement.innerHTML = `<option value="">-- ${defaultText} --</option>`;
        data.forEach(item => {
            selectElement.innerHTML += `<option value="${item[valueField]}">${item[textField]}</option>`;
        });
    }

    function updateExamNames() {
        const talimBatchId = talimBatchSelect.value;
        const examTypeId = examTypeSelect.value;

        if (talimBatchId && examTypeId) {
            fetch('/ExamWiseSubjectReport/exam-names', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ talimbatch_id: talimBatchId, examtype_id: examTypeId })
            })
                .then(res => res.json())
                .then(result => {
                    if (result.success) {
                        populateSelect(examSelect, result.data, 'exam_id', 'exam_name', 'Select Exam Name');
                    }
                });
        }
    }

    async function generateReport(format) {
        const talimBatchId = talimBatchSelect.value;
        const examTypeId = examTypeSelect.value;
        const examId = examSelect.value;

        if (!talimBatchId || !examTypeId || !examId) {
            alert('Please select all filters.');
            return;
        }

        const response = await fetch('/ExamWiseSubjectReport/generate-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ talim_batch_id: talimBatchId, examtype_id: examTypeId, exam_id: examId })
        });

        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            return;
        }

        const reportData = result.data;
        const reportHeader = reportData[0]; // Use first row for header info

        if (format === 'pdf') {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFontSize(16);
            doc.text('Exam Wise Subject Report', 14, 22);
            doc.setFontSize(11);
            doc.text(`Exam: ${reportHeader.exam_name}`, 14, 30);
            doc.text(`Date: ${reportHeader.exam_date}`, 14, 36);
            doc.text(`Total Marks: ${reportHeader.total_marks}`, 14, 42);

            const body = reportData.map((row, index) => [
                index + 1,
                row.ytk_id,
                `${row.sevak_name} (${row.city_name})`,
                row.attandance,
                row.marks
            ]);

            doc.autoTable({
                head: [['Sr.No', 'YTK ID', 'Student Name', 'A/P', 'Marks']],
                body: body,
                startY: 50,
            });

            doc.save('ExamWiseSubjectReport.pdf');

        } else if (format === 'excel') {
            const header = [
                "Sr.No", "YTK ID", "Student Name", "City", "Attendance", "Marks"
            ];
            const body = reportData.map((row, index) => ({
                "Sr.No": index + 1,
                "YTK ID": row.ytk_id,
                "Student Name": row.sevak_name,
                "City": row.city_name,
                "Attendance": row.attandance,
                "Marks": row.marks
            }));

            const worksheet = XLSX.utils.json_to_sheet(body, { header });
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
            XLSX.writeFile(workbook, "ExamWiseSubjectReport.xlsx");
        }
    }
});