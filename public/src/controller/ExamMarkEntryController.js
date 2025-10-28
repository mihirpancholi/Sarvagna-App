// controller/ExamMarkEntryController.js
const path = require("path");
const db = require('../config/db.js');
const Model = require("../model/ExamMarkEntryModel.js");
const viewsPath = path.join(__dirname, "..", "view");

// Show ExamMarkEntry list page
exports.getExamMarkEntryIndex = (req, res) => {
    res.sendFile(path.join(viewsPath, "Exam", "ExamMarkEntry", "list.html"));
};

exports.getExamMarkEntryData = async (req, res) => {
    try {
        const data = await Model.getIndexData();
        res.json({ success: true, data });
    } catch (err) {
        console.error("Error fetching index data:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Show Add ExamMarkEntry page
exports.getAddMarksPage = (req, res) => {
    res.sendFile(path.join(viewsPath, "Exam", "ExamMarkEntry", "AddMarks.html"));
};


exports.getExamMarkEntryList = async (req, res) => {
    try {
        const rows = await Model.getAll();
        res.json(rows);
    } catch (err) {
        console.error("Error fetching ExamSchedule list:", err);
        res.status(500).json({ message: "Error fetching ExamSchedule list" });
    }
};



exports.getExamMarks = async (req, res) => {
    try {
        const [talimBatchList] = await db.query(
            "SELECT talim_batch_id FROM talim_batch_master WHERE is_active='Y' AND is_deleted='N'"
        );

        const talim_batch_id = talimBatchList[0]?.talim_batch_id;

        if (!talim_batch_id) {
            return res.status(404).json({ success: false, message: "No active Talim Batch found" });
        }

        const exam = await Model.getTotalMarks(talim_batch_id);
        if (exam && exam.total_marks) {
            res.json({ success: true, total_marks: exam.total_marks });
        } else {
            res.json({ success: false, message: "Exam not found or has no total marks" });
        }
    } catch (err) {
        console.error("Error fetching exam marks:", err);
        res.status(500).json({ success: false, message: "Database error" });
    }
};

// Get students for selected exam
exports.getStudentData = async (req, res) => {
    try {
        const { exam_id } = req.body;

        if (!exam_id) {
            return res.status(400).json({ success: false, message: "Exam ID is required" });
        }

        // Get active talim batch
        const [talimBatchList] = await db.query(
            "SELECT talim_batch_id FROM talim_batch_master WHERE is_active='Y' AND is_deleted='N'"
        );

        const talim_batch_id = talimBatchList[0]?.talim_batch_id;

        if (!talim_batch_id) {
            return res.status(404).json({ success: false, message: "No active Talim Batch found" });
        }

        // Get students
        const students = await Model.getStudents(exam_id, talim_batch_id);

        if (!students.length) {
            return res.send("<p>No students found for this exam.</p>");
        }

        // Get exam schedule
        const examScheduleData = await Model.getExamScheduleData(talim_batch_id, exam_id);

        if (!examScheduleData.length) {
            return res.send("<p>No exam schedule found.</p>");
        }

        const total_marks = examScheduleData[0].total_marks;
        const markEntryStartDate = new Date(examScheduleData[0].mark_entry_start_date);
        const markEntryEndDate = new Date(examScheduleData[0].mark_entry_end_date);
        const currentDate = new Date();

        // Check if current date is within the mark entry window
        const isWithinMarkEntryPeriod = currentDate >= markEntryStartDate && currentDate <= markEntryEndDate;
        const disableAll = isWithinMarkEntryPeriod ? '' : 'disabled';

        // Build table
        let html = `
            <table border="1" cellpadding="5" style="border-collapse:collapse; width:100%;">
                <thead>
                    <tr>
                        <th class="text-center">Sr No</th>
                        <th class="text-center">YTK ID</th>
                        <th class="text-center">Student Name</th>
                        <th class="text-center">Marks Obt / <span>${total_marks}</span></th>                        
                        <th class="text-center">Attendance</th>
                        <th class="text-center">Remarks</th>
                    </tr>
                </thead>
                <tbody>
        `;

        students.forEach((row, index) => {
            const srNo = index + 1;
            const studentName = `${row.first_name || ''} ${row.middle_name || ''} ${row.last_name || ''}`.trim();
            const isAbsent = row.attandance === 'A';
            const attendanceChecked = isAbsent ? '' : 'checked';
            const markValue = isAbsent ? '' : (row.marks || '');
            const disableField = isAbsent ? 'disabled' : '';

            html += `
<tr>
  <input type="hidden" name="ytk_id[]" value="${row.ytk_id || ''}">
  <input type="hidden" name="student_name[]" value="${studentName}">
  <input type="hidden" name="sevak_id[]" value="${row.sevak_id}">
  <td class="text-center">${srNo}</td>
  <td class="text-center">${row.ytk_id || '-'}</td>
  <td class="text-left">${studentName}</td>
  <td class="text-center m-0 p-0">
    <input type="text" 
      max="${total_marks}" 
      min="0" 
      style="padding:0.35rem 1rem;" 
      ${disableAll} ${disableField}
      value="${markValue}" 
      name="marks[]" 
      id="marks_${row.sevak_id}" 
      class="mark"
      oninput="this.value=Math.min(Math.max(this.value,0),${total_marks})">
  </td>
  <td class="text-center m-0 p-0">
    <input type="checkbox"
      ${disableAll}
      class="atten"
      onchange="changemark(${row.sevak_id}, ${row.mark_entry_id})"
      id="attendance_${row.sevak_id}"
      name="attandance_${row.sevak_id}"
      ${attendanceChecked}>
  </td>
  <td class="text-center m-0 p-0">
    <input type="text" ${disableAll} ${disableField}
      style="padding:0.35rem 1rem;"
      name="remarks[]"
      value="${row.remarks || ''}">
  </td>
</tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;
        if (!isWithinMarkEntryPeriod) {
            html += `
                <p style="color: red; text-align: center; margin-top: 10px;">
                    Marks entry is allowed only between 
                    <b>${examScheduleData[0].mark_entry_start_date}</b> and 
                    <b>${examScheduleData[0].mark_entry_end_date}</b>.
                </p>
            `;
        }

        res.send(html);

    } catch (err) {
        console.error("Error fetching student data:", err);
        res.status(500).send("Database error");
    }
};


exports.add = async (req, res) => {
    try {
        const [talimBatchList] = await db.query(
            "SELECT talim_batch_id FROM talim_batch_master WHERE is_active='Y' AND is_deleted='N'"
        );
        const talim_batch_id = talimBatchList[0]?.talim_batch_id;

        if (!talim_batch_id) {
            return res.status(404).json({ success: false, message: "No active Talim Batch found" });
        }

        const { examtype_id, exam_id, ytk_id, student_name, sevak_id, marks, remarks, attendance } = req.body;

        if (!exam_id || !examtype_id || !sevak_id?.length) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        for (let i = 0; i < sevak_id.length; i++) {
            const student = sevak_id[i];
            const att = attendance[i] === 'on' ? 'P' : 'A';
            const tmarks = att === 'P' ? (marks[i] || 0) : null; // Use marks[] directly

            await Model.deleteMarkEntry(exam_id, student);

            await Model.addExamMarkEntry({
                talim_batch_id,
                examtype_id,
                exam_id,
                ytk_id: ytk_id[i],
                student_name: student_name[i],
                sevak_id: student,
                marks: tmarks,
                attandance: att,
                remarks: remarks[i] || '',
                created_id: 1, // Replace with actual session user ID
            });
        }

        res.json({ success: true, message: "Exam Mark Entry Saved Successfully." });

    } catch (err) {
        console.error("Error saving exam marks:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



exports.getEditExamMarkEntry = async (req, res) => {
    try {
        const { exam_id, examtype_id } = req.query;

        if (!exam_id || !examtype_id) {
            return res.status(400).send("Missing exam_id or examtype_id");
        }
        const [talimBatchList] = await db.query(
            "SELECT talim_batch_id FROM talim_batch_master WHERE is_active='Y' AND is_deleted='N'"
        );
        const talim_batch_id = talimBatchList[0]?.talim_batch_id;

        if (!talim_batch_id) {
            return res.status(404).json({ success: false, message: "No active Talim Batch found" });
        }
        const examData = await Model.getExamMarkEntryById(exam_id, examtype_id, talim_batch_id);

        if (!examData || examData.length === 0) {
            return res.status(404).send("No data found");
        }

        // render edit page
        res.sendFile(path.join(viewsPath, "Exam", "ExamMarkEntry", "editMarks.html"));
    } catch (err) {
        console.error("Error loading edit page:", err);
        res.status(500).send("Server error");
    }
};

exports.updateExamMarkEntry = async (req, res) => {
    try {
        const { examtype_id, exam_id, sevak_id, marks, remarks, attendance } = req.body;

        if (!exam_id || !examtype_id || !sevak_id?.length) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const [talimBatchList] = await db.query(
            "SELECT talim_batch_id FROM talim_batch_master WHERE is_active='Y' AND is_deleted='N'"
        );
        const talim_batch_id = talimBatchList[0]?.talim_batch_id;

        if (!talim_batch_id) {
            return res.status(404).json({ success: false, message: "No active Talim Batch found" });
        }

        for (let i = 0; i < sevak_id.length; i++) {
            const student = sevak_id[i];
            const att = attendance[i] === 'on' ? 'P' : 'A';
            const tmarks = att === 'P' ? (marks[i] || 0) : null;

            await Model.updateExamMarkEntry({
                talim_batch_id,
                examtype_id,
                exam_id,
                sevak_id: student,
                marks: tmarks,
                attandance: att,
                remarks: remarks[i] || '',
                updated_id: 1, // Replace with actual session user ID
            });
        }

        res.json({ success: true, message: "Exam Mark Entry Updated Successfully." });

    } catch (err) {
        console.error("Error updating exam marks:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
