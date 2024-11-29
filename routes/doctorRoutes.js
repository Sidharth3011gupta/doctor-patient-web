const express = require("express");
const router = express.Router();
const { authenticate, isDoctor } = require("../middlewares/auth");
const doctorController = require("../controllers/doctorContoller");

// Doctor Dashboard
router.get("/dashboard", authenticate, isDoctor, doctorController.getDashboard);

// Doctor Profile
router.get("/profile", authenticate, isDoctor, doctorController.getProfile);

// Doctor Appointments
router.get(
  "/appointments",
  authenticate,
  isDoctor,
  doctorController.getAppointments
);

router.put('/doctors/profile/:id', doctorController.updateDoctorProfile);
router.get("/doctors", doctorController.getDoctors);
router.get('/doctors/searchbyUserid/:id',doctorController.getUserById);
router.get('/doctors/search',doctorController.searchDoctors)
module.exports = router;