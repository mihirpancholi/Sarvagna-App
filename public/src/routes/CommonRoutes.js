const express = require("express");
const router = express.Router();
const CommonController = require("../controller/CommonController");

router.get("/getstatebyid", CommonController.getState);
router.get("/getdistrictbyid", CommonController.getDistrict);
router.get("/gettalukabyid", CommonController.getTaluka);
router.get("/getmandirbyzone", CommonController.getMandir);

module.exports = router;
