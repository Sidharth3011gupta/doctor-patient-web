const User = require("../models/User");
const Appointment = require("../models/Appointment");
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find(
      { role: "doctor" },
      "name specialization experience clinicAddress phone"
    );
    res.json({ doctors });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSpecialities = async (req, res) => {
  try {
    const specialities = await User.distinct("specialization", {
      role: "doctor",
    });
    res.json({ specialities });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user.id })
      .populate("doctorId", "name specialization clinicAddress")
      .exec();
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getProfile = async (req, res) => {
  try {
    const patient = await User.findById(req.user.id, "name email phone");
    if (!patient || patient.role !== "patient") {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json({ patient });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
