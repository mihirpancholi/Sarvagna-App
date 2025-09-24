const express = require("express");
const router = express.Router();
const RelationshipController = require("../controller/RelationshipController");

// List page
router.get("/", RelationshipController.getRelationshipIndex);

// API endpoints
router.get("/list", RelationshipController.getRelationshipsData);
router.get("/:id", RelationshipController.getRelationshipById);
router.post("/addRelationship", RelationshipController.postRelationship);
router.post("/update/:id", RelationshipController.updateRelationship);
router.delete("/delete/:id", RelationshipController.deleteRelationship);

module.exports = router;