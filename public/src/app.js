const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "./View")));



// Mount caste routes
const casteRoutes = require("./routes/casteRoutes");
app.use("/caste", casteRoutes);

// Mount country routes
const countryRoutes = require("./routes/countryRoutes");
app.use("/country", countryRoutes);

// Mount blood group routes
const Blood_groupRoutes = require("./routes/blood_groupRoutes");
app.use("/blood_group", Blood_groupRoutes);

// Mount marital status routes
const Marital_statusRoutes = require("./routes/Marital_statusRoutes");
app.use("/marital_status", Marital_statusRoutes);

// Mount degree routes
const DegreeRoutes = require("./routes/DegreeRoutes");
app.use("/degree", DegreeRoutes);

// Mount relationship routes
const RelationshipRoutes = require("./routes/RelationshipRoutes");
app.use("/relationship", RelationshipRoutes);

// Mount state routes
const StateRoutes = require("./routes/StateRoutes");
app.use("/state", StateRoutes);

// Mount district routes
const DistrictRoutes = require("./routes/DistrictRoutes");
app.use("/district", DistrictRoutes);

// Mount taluka routes
const TalukaRoutes = require("./routes/TalukaRoutes");
app.use("/taluka", TalukaRoutes);

// Mount city routes    
const CityRoutes = require("./routes/CityRoutes");
app.use("/city", CityRoutes);

// Mount common routes
const CommonRoutes = require("./routes/CommonRoutes.js");
app.use("/common", CommonRoutes);

// Mount city area routes
const CityAreaRoutes = require("./routes/CityAreaRoutes");
app.use("/CityArea", CityAreaRoutes);

// Mount pincode routes
const PincodeRoutes = require("./routes/PincodeRoutes");
app.use("/Pincode", PincodeRoutes);

// Mount category routes
const CategoryRoutes = require("./routes/CategoryRoutes");
app.use("/category", CategoryRoutes);

// Mount specialization routes
const SpecializationRoutes = require("./routes/SpecializationRoutes");
app.use("/Specialization", SpecializationRoutes);

// Mount grade routes
const GradeRoutes = require("./routes/GradeRoutes");
app.use("/grade", GradeRoutes);

// Mount talent routes
const TalentRoutes = require("./routes/TalentRoutes");
app.use("/talent", TalentRoutes);

// Mount room routes
const RoomRoutes = require("./routes/RoomRoutes");
app.use("/room", RoomRoutes);

// Mount employment routes
const EmploymentRoutes = require("./routes/EmploymentRoutes");
app.use("/employment", EmploymentRoutes);

// Mount talim batch routes
const TalimBatchRoutes = require("./routes/TalimBatchRoutes");
app.use("/talim_batch", TalimBatchRoutes);

// Mount region routes
const ZoneRoutes = require("./routes/ZoneRoutes.js");
app.use("/zone", ZoneRoutes);

// Mount region routes
const MadirRoutes = require("./routes/MandirRoutes.js");
app.use("/mandir", MadirRoutes);

// Mount sant nirdeshak routes
const SantNirdeshakRoutes = require("./routes/SantNirdeshakRoutes.js");
app.use("/santnirdeshak", SantNirdeshakRoutes);

// Mount sant nirdeshak routes
const NirdeshakRoutes = require("./routes/NirdeshakRoutes.js");
app.use("/nirdeshak", NirdeshakRoutes);

// Mount kshetra routes
const KshetraRoutes = require("./routes/KshetraRoutes.js");
app.use("/kshetra", KshetraRoutes);

// Mount satsang activity routes
const SatsangActivityRoutes = require("./routes/SatsangActivityRoutes.js");
app.use("/satsang_activity", SatsangActivityRoutes);

// Mount satsang designation routes
const SatsangDesignationRoutes = require("./routes/SatsangDesignationRoutes.js");
app.use("/satsang_designation", SatsangDesignationRoutes);

// Mount sant karyakar designation routes
const SantKaryakarDesignationRoutes = require("./routes/SantKaryakarDesignationRoutes.js");
app.use("/sant_karyakar_designation", SantKaryakarDesignationRoutes);

// Mount gosthi type routes
const GosthiTypeRoutes = require("./routes/GosthiTypeRoutes.js");
app.use("/gosthi_type", GosthiTypeRoutes);

// Mount gosthi group routes
const GosthiGroupRoutes = require("./routes/GosthiGroupRoutes.js");
app.use("/gosthigroup", GosthiGroupRoutes);

// Mount sevak registration routes
const SevakRegistrationRoutes = require("./routes/SevakRegistrationRoutes.js");
app.use("/SevakRegistration", SevakRegistrationRoutes);

// Mount Nirikshak routes
const NirikshakRoutes = require("./routes/GosthiNirikshakRoutes.js");
app.use("/Nirikshak", NirikshakRoutes);

// Mount GosthiScheduleRoutes
const ScheduleRoutes = require("./routes/GosthiScheduleRoutes.js");
app.use("/GosthiSchedule", ScheduleRoutes)

// Mount GroupMemberMapping routes
const GroupMemberMappingRoutes = require("./routes/GroupMemberMappingRoutes.js");
app.use("/GroupMemberMapping", GroupMemberMappingRoutes)

// Mount GosthiReportSubmission routes
const GosthiReportSubmissionRoutes = require("./routes/GosthiReportSubmissionRoutes.js");
app.use("/GosthiReportSubmission", GosthiReportSubmissionRoutes)

// Mount GosthiRoutes
const GosthiRoutes = require("./routes/GosthiRoutes.js");
app.use("/Gosthi", GosthiRoutes)

// Mount ExamDashboard routes
const ExamDashboardRoutes = require("./routes/ExamDashboard.js");
app.use("/ExamDashboard", ExamDashboardRoutes)

// Mount ExamType routes
const ExamTypeRoutes = require("./routes/ExamTypeRoutes.js");
app.use("/examtype", ExamTypeRoutes);

// Mount Exam routes
const ExamRoutes = require("./routes/ExamRoutes.js");
app.use("/Exam", ExamRoutes);

// Mount Exam routes
const ExamScheduleRoutes = require("./routes/ExamScheduleRoutes.js");
app.use("/ExamSchedule", ExamScheduleRoutes);

// Mount ExamMarkEntry routes
const ExamMarkEntryRoutes = require("./routes/ExamMarkEntryRoutes.js");
app.use("/ExamMarkEntry", ExamMarkEntryRoutes);

// Mount SevakEvaluation routes
const SevakEvaluationRoutes = require("./routes/SevakEvaluationRoutes.js");
app.use("/SevakEvaluation", SevakEvaluationRoutes);

// Mount ExamWiseSubjectReport routes
const ExamWiseSubjectReportRoutes = require("./routes/ExamWiseSubjectReportRoutes.js");
app.use("/ExamWiseSubjectReport", ExamWiseSubjectReportRoutes);

// Mount AllExamMarksReport routes
const AllExamMarksReportRoutes = require("./routes/AllExamMarksReportRoutes.js");
app.use("/AllExamMarksReport", AllExamMarksReportRoutes);

// Mount MyBatchmate routes
const MyBatchmateRoutes = require("./routes/MyBatchmateRoutes.js");
app.use("/MyBatchmate", MyBatchmateRoutes);

const SevakReportsRoutes = require("./routes/SevakReportsRoutes.js");
app.use("/SevakReports", SevakReportsRoutes);

// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "dashboard.html"));
});

module.exports = app;
