const express = require("express");
const router = express.Router();
const { authenticate, isPatient } = require("../middlewares/auth");
const patientController = require("../controllers/patientController");

router.get("/doctors", authenticate, isPatient, patientController.getDoctors);

router.get(
  "/specialities",
  authenticate,
  isPatient,
  patientController.getSpecialities
);

router.get(
  "/appointments/:id",
  patientController.getAppointmentById
);

router.get("/profile", authenticate, isPatient, patientController.getProfile);
router.put('/profile/:id', patientController.updatedPatientProfile);
module.exports = router;
