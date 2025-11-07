const path = require("path");
const { jsPDF } = require("jspdf");
require('jspdf-autotable');
const XLSX = require("xlsx");
const Model = require("../model/SevakReportsModel.js");
const multer = require('multer');
const viewsPath = path.join(__dirname, "..", "view");

// sevak register report
exports.sevakRegisterReport = (req, res) => {
    res.sendFile(path.join(viewsPath, "SevakRegistration", "report", "sevakregisterreport.html"));
};

exports.sevakRegisterReportData = async (req, res) => {
    try {
        // Fetch data using the model
        const rows = await Model.getSevakRegisteredList();
        res.json(rows);
    } catch (err) {
        console.error("Error fetching report:", err);
        res.status(500).json({ message: "Error fetching report" });
    }
};

exports.registerdSevakPdfReport = async (req, res) => {
    try {
        const sevakList = await Model.getSevakRegisteredList();

        const doc = new jsPDF();
        const tableColumn = ["YTK Id", "Sevak Name", "City", "Role", "Status", "Active/Inactive"];
        const tableRows = [];

        sevakList.forEach(sevak => {
            const sevakData = [
                sevak.ytk_id,

                sevak.sevak_name,
                sevak.city_name,
                sevak.role,
                sevak.status,
                sevak.statusRegister,
            ];
            tableRows.push(sevakData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });
        doc.text("Registered Sevak List", 14, 15);

        const pdfBuffer = doc.output('arraybuffer');

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=RegisteredSevakReport.pdf');
        res.send(Buffer.from(pdfBuffer));

    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating PDF report');
    }
};

exports.registerdSevakExcelReport = async (req, res) => {
    try {
        const sevakList = await Model.getSevakRegisteredList();

        const worksheet = XLSX.utils.json_to_sheet(sevakList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sevaks");

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=RegisteredSevakReport.xlsx');
        res.send(excelBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating Excel report');
    }
};


// santnirdeshak report
exports.SantNirdeshakReport = (req, res) => {
    res.sendFile(path.join(viewsPath, "SevakRegistration", "report", "SantNirdeshakReport.html"));
};

const upload = multer().none();

exports.SantNirdeshakReportPrint = [upload, async (req, res) => {
    try {
        const { sant_nirdeshak_name, print_pdf_report, print_excel_report } = req.body;

        const reportData = await Model.getSantNirdeshakReportData(sant_nirdeshak_name);

        if (!reportData || reportData.length === 0) {
            return res.status(404).send('No data found for the selected Sant Nirdeshak.');
        }

        if (print_pdf_report) {
            const doc = new jsPDF();
            let yOffset = 15; // Initial Y position for text

            doc.setFontSize(16);
            doc.text('॥ Shree Swaminarayano Vijayate ॥', doc.internal.pageSize.width / 2, yOffset, { align: 'center' });
            yOffset += 7;
            doc.text('BAPS Yuva Talim Kendra, Sarangpur', doc.internal.pageSize.width / 2, yOffset, { align: 'center' });
            yOffset += 7;
            doc.setFontSize(14);
            doc.text('Sant Nirdeshak Report', doc.internal.pageSize.width / 2, yOffset, { align: 'center' });
            yOffset += 15; // Space after main title

            const groupedData = reportData.reduce((acc, curr) => {
                const key = curr.sant_nirdeshak_name || 'Unassigned';
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(curr);
                return acc;
            }, {});

            const tableColumn = ["No", "YTK ID", "Sevak Name", "City", "Kshetra", "Mandir"];

            for (const santNirdeshakGroup in groupedData) {
                if (Object.hasOwnProperty.call(groupedData, santNirdeshakGroup)) {
                    const sevaksInGroup = groupedData[santNirdeshakGroup];

                    // Add new page if content exceeds current page height
                    if (yOffset > doc.internal.pageSize.height - 30) { // 30 is a margin
                        doc.addPage();
                        yOffset = 15; // Reset yOffset for new page
                        doc.setFontSize(16);
                        doc.text('॥ Shree Swaminarayano Vijayate ॥', doc.internal.pageSize.width / 2, yOffset, { align: 'center' });
                        yOffset += 7;
                        doc.text('BAPS Yuva Talim Kendra, Sarangpur', doc.internal.pageSize.width / 2, yOffset, { align: 'center' });
                        yOffset += 7;
                        doc.setFontSize(14);
                        doc.text('Sant Nirdeshak Report', doc.internal.pageSize.width / 2, yOffset, { align: 'center' });
                        yOffset += 15;
                    }

                    doc.setFontSize(12);
                    doc.text(`Sant Nirdeshak: ${santNirdeshakGroup}`, 14, yOffset);
                    yOffset += 10;

                    const tableRows = sevaksInGroup.map((sevak, index) => [
                        index + 1,
                        sevak.ytk_id,
                        sevak.sevak_name,
                        sevak.city_name,
                        sevak.kshetra_name,
                        sevak.current_mandir,
                    ]);

                    doc.autoTable({
                        head: [tableColumn],
                        body: tableRows,
                        startY: yOffset,
                        didDrawPage: function (data) {
                            // Header for subsequent pages in the same group
                            if (data.pageNumber > 1 && data.settings.startY === yOffset) { // Check if it's a new page within the same group table
                                doc.setFontSize(16);
                                doc.text('॥ Shree Swaminarayano Vijayate ॥', doc.internal.pageSize.width / 2, 15, { align: 'center' });
                                doc.text('BAPS Yuva Talim Kendra, Sarangpur', doc.internal.pageSize.width / 2, 22, { align: 'center' });
                                doc.setFontSize(14);
                                doc.text('Sant Nirdeshak Report', doc.internal.pageSize.width / 2, 29, { align: 'center' });
                                doc.setFontSize(12);
                                doc.text(`Sant Nirdeshak: ${santNirdeshakGroup}`, 14, 44);
                                doc.autoTable({
                                    headStyles: { fillColor: [230, 230, 230] },
                                    startY: 50,
                                });
                            }
                        },
                        styles: { fontSize: 8 },
                        headStyles: { fillColor: [230, 230, 230], fontStyle: 'bold' },
                        margin: { top: 10, bottom: 10, left: 14, right: 14 },
                    });
                    yOffset = doc.autoTable.previous.finalY + 10; // Update yOffset for next section
                }
            }

            const pdfBuffer = doc.output('arraybuffer');
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=SantNirdeshakReport.pdf');
            res.send(Buffer.from(pdfBuffer));

        } else if (print_excel_report) {
            // Group data by Sant Nirdeshak
            const groupedData = reportData.reduce((acc, curr) => {
                const key = curr.sant_nirdeshak_name || 'Unassigned';
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(curr);
                return acc;
            }, {});

            const workbook = XLSX.utils.book_new();
            const worksheetData = [];

            // Add main headers
            worksheetData.push(['॥ Shree Swaminarayano Vijayate ॥']);
            worksheetData.push(['BAPS Yuva Talim Kendra, Sarangpur']);
            worksheetData.push(['Sant Nirdeshak Report']);
            worksheetData.push([]); // Spacer row

            // Process each group
            for (const santNirdeshakGroup in groupedData) {
                if (Object.hasOwnProperty.call(groupedData, santNirdeshakGroup)) {
                    const sevaksInGroup = groupedData[santNirdeshakGroup];

                    // Add group header
                    worksheetData.push([`Sant Nirdeshak: ${santNirdeshakGroup}`]);
                    worksheetData.push([]); // Spacer row

                    // Add table headers
                    const tableColumn = ["No", "YTK ID", "Sevak Name", "City", "Kshetra", "Mandir"];
                    worksheetData.push(tableColumn);

                    // Add data rows
                    sevaksInGroup.forEach((sevak, index) => {
                        worksheetData.push([
                            index + 1,
                            sevak.ytk_id,
                            sevak.sevak_name,
                            sevak.city_name,
                            sevak.kshetra_name,
                            sevak.current_mandir,
                        ]);
                    });

                    worksheetData.push([]); // Spacer row after each group
                }
            }

            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

            // Apply merges for headers
            worksheet['!merges'] = [
                { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, // Shree...
                { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } }, // BAPS...
                { s: { r: 2, c: 0 }, e: { r: 2, c: 5 } }, // Report Title
            ];

            // Find and merge group headers
            worksheetData.forEach((row, index) => {
                if (typeof row[0] === 'string' && row[0].startsWith('Sant Nirdeshak:')) {
                    worksheet['!merges'].push({ s: { r: index, c: 0 }, e: { r: index, c: 5 } });
                }
            });

            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sant Nirdeshak Report');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xls', type: 'buffer' });

            res.setHeader('Content-Type', 'application/vnd.ms-excel');
            res.setHeader('Content-Disposition', 'attachment; filename=CurrentSantNirdeshakReport.xls');
            res.send(excelBuffer);

        } else {
            res.status(400).send('Invalid report type specified.');
        }

    } catch (error) {
        console.error("Error generating Sant Nirdeshak report:", error);
        res.status(500).send('Error generating Sant Nirdeshak report');
    }
}];

