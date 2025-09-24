const express = require("express");
const router = express.Router();
const employmentController = require("../controller/EmploymentController");

// List page
router.get("/", employmentController.getEmploymentIndex);

// API endpoints
router.get("/list", employmentController.getEmploymentsData);
router.get("/:id", employmentController.getEmploymentById);
router.post("/addEmployment", employmentController.postEmployment);
router.post("/update/:id", employmentController.updateEmployment);
router.delete("/delete/:id", employmentController.deleteEmployment);

module.exports = router;
