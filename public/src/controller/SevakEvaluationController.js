const path = require("path");
const Model = require("../model/SevakEvaluationModel.js");
const viewsPath = path.join(__dirname, "..", "view");

exports.getSevakEvaluationPage = (req, res) => {
    res.sendFile(path.join(viewsPath, "Exam", "SevakEvaluation", "list.html"));
};

// Show Add Sevak Evaluation page
exports.getAddSevakEvaluation = (req, res) => {
    res.sendFile(path.join(viewsPath, "Exam", "SevakEvaluation", "Add.html"));
};

// Handle Add Sevak Evaluation form submission
exports.postSevakEvaluation = async (req, res) => {
    try {
        const data = {
            ...req.body,
            created_id: 1,
        };

        // Basic validation
        if (!data.sevak_id || !data.talim_batch_id) {
            return res.status(400).json({
                success: false,
                message: "Sevak and Talim Batch are required.",
            });
        }

        // Check for duplicate evaluation for the same sevak
        const existing = await Model.getEvaluationBySevakId(data.sevak_id);
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "An evaluation for this Sevak already exists. You can edit it from the list.",
            });
        }

        const evaluationId = await Model.addSevakEvaluation(data);

        res.json({
            success: true,
            message: "Sevak evaluation added successfully!",
            id: evaluationId,
        });

    } catch (err) {
        console.error("Error adding Sevak Evaluation:", err);
        res.status(500).json({
            success: false,
            message: "An error occurred while saving the evaluation.",
        });
    }
};

// Show Edit Sevak Evaluation page
exports.getEditSevakEvaluation = (req, res) => {
    res.sendFile(path.join(viewsPath, "Exam", "SevakEvaluation", "Edit.html"));
};

// API to get a single evaluation for editing
exports.getEvaluationForEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Model.getEvaluationById(id);
        if (!data) {
            return res.status(404).json({ success: false, message: "Evaluation not found." });
        }
        res.json({ success: true, data });
    } catch (err) {
        console.error("Error fetching evaluation for edit:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Handle Update Sevak Evaluation form submission
exports.updateSevakEvaluation = async (req, res) => {
    try {
        const { id } = req.params;
        const data = {
            ...req.body,
            updated_id: req.user?.user_id || 1, // Use logged-in user or fallback
            updated_at: new Date()
        };

        // Basic validation
        if (!data.sevak_id || !data.talim_batch_id) {
            return res.status(400).json({
                success: false,
                message: "Sevak and Talim Batch are required.",
            });
        }

        await Model.updateSevakEvaluation(id, data);

        res.json({
            success: true,
            message: "Sevak evaluation updated successfully!",
        });

    } catch (err) {
        console.error("Error updating Sevak Evaluation:", err);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the evaluation.",
        });
    }
};

// Handle Delete Sevak Evaluation
exports.deleteSevakEvaluation = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted_id = req.user?.user_id || 1;
        await Model.deleteSevakEvaluation(id, deleted_id);
        res.json({ success: true, message: "Sevak evaluation deleted successfully." });
    } catch (err) {
        console.error("Error deleting Sevak Evaluation:", err);
        res.status(500).json({ success: false, message: "An error occurred." });
    }
};

// API to get sevaks for a given talim batch
exports.getTalimBatchWiseSevak = async (req, res) => {
    const { talim_batch_id, evaluation_id } = req.body;
    const sevaks = await Model.getTalimBatchWiseSevak(talim_batch_id, evaluation_id);
    res.json(sevaks);
};

// API to get data for filter dropdowns
exports.getFilterOptions = async (req, res) => {
    try {
        const [
            talimBatchList,
            cityList,
            gradeList,
            kshetraList,
            districtList,
            degreeList,
            groupList,
            mandirList,
            zoneList,
            satsangActivityList,
            satsangDesignationList,
        ] = await Promise.all([
            Model.getFilterData("talim_batch_master"),
            Model.getFilterData("city_master"),
            Model.getFilterData("grade_master"),
            Model.getFilterData("kshetra_master"),
            Model.getFilterData("district_master"),
            Model.getFilterData("degree_master"),
            Model.getFilterData("group_master"),
            Model.getFilterData("mandir_master"),
            Model.getFilterData("zone_master"),
            Model.getFilterData("satsang_activity_master"),
            Model.getFilterData("satsang_designation_master"),
        ]);
        res.json({
            success: true,
            data: {
                talimBatchList, cityList, gradeList, kshetraList, districtList,
                degreeList, groupList, mandirList, zoneList, satsangActivityList, satsangDesignationList
            },
        });
    } catch (err) {
        console.error("Error fetching filter options:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// API to filter evaluations
exports.filterEvaluations = async (req, res) => {
    try {
        const filters = req.body;
        const data = await Model.getFilteredEvaluations(filters);
        res.json({ success: true, data });
    } catch (err) {
        console.error("Error filtering evaluations:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// API to get remarks for a specific category
exports.getRemarks = async (req, res) => {
    try {
        const { type, id } = req.params;

        // A mapping to prevent arbitrary column selection
        const allowedTypes = {
            satsang: 'satsang_notes',
            seva: 'seva_notes',
            humanRelations: 'human_relations_notes',
            skill: 'skill_notes',
            education: 'abhyas_notes',
            familyEcostatus: 'family_ecostatus_notes',
            familySatsang: 'family_satsang_notes',
            overall: 'overall_notes'
        };

        const notesColumn = allowedTypes[type];
        if (!notesColumn) {
            return res.status(400).json({ success: false, message: "Invalid remark type." });
        }

        const remark = await Model.getRemarkById(id, notesColumn);
        res.json({ success: true, remark });
    } catch (err) {
        console.error("Error fetching remarks:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Show Print page
exports.getPrintPage = (req, res) => {
    res.sendFile(path.join(viewsPath, "Exam", "SevakEvaluation", "Print.html"));
};

// API to get data for the print page
exports.getPrintData = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Model.getEvaluationForPrint(id);
        if (!data) {
            return res.status(404).json({ success: false, message: "Evaluation record not found." });
        }
        res.json({ success: true, data });
    } catch (err) {
        console.error("Error fetching print data:", err);
        res.status(500).json({ success: false, message: "Server error while fetching print data." });
    }
};