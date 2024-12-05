const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.get("/doctors", patientController.getDoctors);

router.get(
  "/specialities",
  patientController.getSpecialities
);

router.get(
  "/appointments/:id",
  patientController.getAppointmentById
);

router.get("/profile/:id", patientController.getProfile);
router.put("/change-password/:id", patientController.changePassword);
router.put('/Updateprofile/:id', patientController.updatedPatientProfile);
module.exports = router;
