const express = require("express");
const router = express.Router();
const SevakReports = require("../controller/SevakReportsController.js");

// === Sevak Registration Report Routes ===
router.get("/sevakRegisterReport", SevakReports.sevakRegisterReport);
router.get("/sevakRegisterReport/data", SevakReports.sevakRegisterReportData);
router.get("/registerdSevakExcelReport", SevakReports.registerdSevakExcelReport);
router.get("/registerdSevakPdfReport", SevakReports.registerdSevakPdfReport);

router.get("/SantNirdeshakReport", SevakReports.SantNirdeshakReport);
router.post("/SantNirdeshakReportPrint", SevakReports.SantNirdeshakReportPrint);

router.get("/KshetraWiseImageReport", SevakReports.KshetraWiseImageReport);

router.get("/BirthDateWiseReport", SevakReports.BirthDateWiseReport);
router.post("/BirthDateWiseReportPrint", SevakReports.BirthDateWiseReportPrint);

router.get("/TalentReport", SevakReports.TalentReport);
router.post("/TalentReportPrint", SevakReports.TalentReportPrint);

router.get("/EducationWiseImageReport", SevakReports.EducationWiseImageReport);

router.get("/SantParshadImageReport", SevakReports.SantParshadImageReport);

router.get("/santparshadreport", SevakReports.santparshadreport);
router.post("/SantParshadReportPrint", SevakReports.SantParshadReportPrint);

router.get("/inspiredbyreport", SevakReports.inspiredbyreport);
router.post("/InspiredByReportPrint", SevakReports.InspiredByReportPrint);

router.get("/SevakIdWiseImageReport", SevakReports.SevakIdWiseImageReport);
router.post("/SevakIdWiseImageReportPrint", SevakReports.SevakIdWiseImageReportPrint);




module.exports = router;