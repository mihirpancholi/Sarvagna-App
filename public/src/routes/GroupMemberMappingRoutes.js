const express = require("express");
const router = express.Router();
const GroupMemberMappingController = require("../controller/GroupMemberMappingController.js");

// Page routes
router.get("/", GroupMemberMappingController.getGroupMemberMappingIndex);
router.get("/manage", GroupMemberMappingController.manageGroupMemberMapping);
router.get("/list", GroupMemberMappingController.getAllData);
router.get("/getGroupSevakDetails/:groupId", GroupMemberMappingController.getGroupSevakDetails);

// API routes
router.get("/getSevakList", GroupMemberMappingController.getSevakList);
router.post("/getSelectedSevakList", GroupMemberMappingController.getSelectedSevakList);
router.get("/getGroupList", GroupMemberMappingController.getGroupList);
router.post("/transferGroup", GroupMemberMappingController.transferGroup);
router.post("/save", GroupMemberMappingController.saveGroupMemberMapping);


module.exports = router;
