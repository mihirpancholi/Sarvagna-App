const express = require("express");
const router = express.Router();
const CommonController = require("../controller/CommonController");


router.get("/getstatebyid", CommonController.getState);
router.get("/getdistrictbyid", CommonController.getDistrict);
router.get("/gettalukabyid", CommonController.getTaluka);
router.get("/getmandirbyzone", CommonController.getMandir);
router.get("/getcityareabycity", CommonController.getCityArea);
router.get("/getpincodebycity", CommonController.getPincode);
router.get("/getcitydetails", CommonController.getCityDetails);
router.get("/getkshetradetails", CommonController.getKshetraDetails);
router.get("/getkshetraforgroupmaster", CommonController.getKshetraDetailsgosthigroupmaster);
router.get("/getSevakByBatch", CommonController.getSevakByBatch);
router.get("/getsatsangdesignation", CommonController.getSatsangDesignation);
router.get('/getZoneCodes', CommonController.getZoneCode);
router.get('/getGroupForGhosthi', CommonController.GroupForGhosthi);

router.get('/getexambyTypeid', CommonController.ExamsByType);

module.exports = router;
