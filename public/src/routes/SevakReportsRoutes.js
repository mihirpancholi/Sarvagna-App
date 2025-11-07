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






module.exports = router;