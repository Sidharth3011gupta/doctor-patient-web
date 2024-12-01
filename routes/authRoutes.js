const express = require("express");
const router = express.Router();
const { signup, login,forgotPassword,resetPassword} = require("../controllers/authController");
const { authenticate, isDoctor, isPatient } = require("../middlewares/auth");
const Appointment = require("../models/Appointment");

router.post("/signup", signup);

router.post("/login", login);

router.get("/doctor-dashboard", authenticate, isDoctor, (req, res) => {
  res.json({ message: "Welcome, Doctor!" });
});

router.get("/patient-dashboard", authenticate, isPatient, (req, res) => {
  res.json({ message: "Welcome, Patient!" });
});

module.exports = router;
router.post("/appointments", async (req, res) => {
  const { doctorId, patientId, appointmentDate } = req.body;

  try {
    const newAppointment = await Appointment.create({
      doctorId,
      patientId,
      appointmentDate,
    });
    res.status(201).json({ message: "Appointment created", newAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/forgot-password", forgotPassword);


router.post("/reset-password/:token", resetPassword);