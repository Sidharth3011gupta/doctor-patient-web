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
  const { doctorId, patientId, startTime, endTime, appointmentDate, appointmentSize } = req.body;
  if (!doctorId || !patientId || !appointmentDate || !startTime || !endTime || !appointmentSize) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {

    const start = new Date(`${appointmentDate}T${startTime}`);
    const end = new Date(`${appointmentDate}T${endTime}`);

    if (start >= end) {
      return res.status(400).json({ message: "Start time must be before end time" });
    }

    const slots = [];
    const sizeInMilliseconds = appointmentSize * 60 * 1000; 
    let currentSlotStart = start;
    while (currentSlotStart < end) {
      const currentSlotEnd = new Date(currentSlotStart.getTime() + sizeInMilliseconds);
      if (currentSlotEnd > end) break;

      slots.push({
        doctorId,
        patientId,
        appointmentDate,
        startTime: currentSlotStart.toISOString().split("T")[1],
        endTime: currentSlotEnd.toISOString().split("T")[1],    
        appointmentSize,
      });

      currentSlotStart = currentSlotEnd;
    }

    if (slots.length === 0) {
      return res.status(400).json({ message: "No slots could be created with the given parameters" });
    }
    const createdSlots = await Appointment.insertMany(slots);

    res.status(201).json({ message: "Appointment slots created", createdSlots });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/forgot-password", forgotPassword);


router.post("/reset-password/:token", resetPassword);