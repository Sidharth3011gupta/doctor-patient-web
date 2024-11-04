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
exports.updatedPatientProfile = async (req, res) => {
  try {
    const patientId = req.user.id;
    const updatedData = {};
    if (req.body.name) updatedData.name = req.body.name;
    if (req.body.email) updatedData.email = req.body.email;
    if (req.body.gender) updatedData.gender = req.body.gender;
    if (req.body.dob) updatedData.dob = req.body.dob;
    if (req.body.BloodGroup) updatedData.BloodGroup = req.body.BloodGroup;
    if (req.body.Street) updatedData.Street = req.body.Street;
    if (req.body.Area) updatedData.Area = req.body.Area;
    if (req.body.locality) updatedData.locality = req.body.locality;
    if (req.body.City) updatedData.City = req.body.City;
    if (req.body.State) updatedData.State = req.body.State;
    if (req.body.Pincode) updatedData.Pincode = req.body.Pincode;
    if (req.body.Country) updatedData.Country = req.body.Country;
    if (req.body.Colony) updatedData.Colony = req.body.Colony;
    if (req.body.HouseNumber) updatedData.HouseNumber = req.body.HouseNumber;

    const updatedPatient = await User.findByIdAndUpdate(
      patientId,
      updatedData,
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({
        message: "Profile updated successfully",
        patient: updatedPatient,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
