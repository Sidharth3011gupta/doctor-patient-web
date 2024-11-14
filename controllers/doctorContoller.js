const User = require("../models/User");
const Appointment = require("../models/Appointment");

exports.getProfile = async (req, res) => {
  try {
    const doctor = await User.findById(req.user.id);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json({ doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user.id })
      .populate("patientId", "name email")
      .exec();
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const doctor = await User.findById(req.user.id);
    const appointments = await Appointment.find({ doctorId: req.user.id });
    const pendingAppointments = appointments.filter(
      (app) => app.status === "pending"
    ).length;

    res.json({
      message: `Welcome, ${doctor.name}`,
      summary: {
        totalAppointments: appointments.length,
        pendingAppointments,
        completedAppointments: appointments.filter(
          (app) => app.status === "completed"
        ).length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDoctors = async (req, res) => {

  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  try {
    const doctors = await User.find(
      { role: "doctor" },
      "name specialization experience profile qualifications experienceMonths clinicAddress mobile_number "
    ).skip(((page-1)*limit)).limit(limit);
    res.status(200).json({ doctors });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving doctors", error: error.message });
  }
};

exports.getDoctorsBySpeciality = async (req, res) => {
  try {
    const { speciality } = req.query;
    if (!speciality) {
      return res.status(400).json({ message: 'Please provide a speciality to search' });
    }

    let query;

    if (speciality.length === 1) {

      query = { specialization: new RegExp(`^${speciality}`, 'i') };
    } else {
      query = { specialization: new RegExp(speciality, 'i') };
    }

    const doctors = await User.find(query);

    if (doctors.length === 0) {
      return res.status(404).json({ message: `No doctors found for speciality search: ${speciality}` });
    }

    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: 'Error searching for doctors by speciality', error: error.message });
  }
};
exports.updateDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const updatedData = {};
    if (req.body.name) updatedData.name = req.body.name;
    if (req.body.specialization)
      updatedData.specialization = req.body.specialization;
    if (req.body.experience) updatedData.experience = req.body.experience;
    if (req.body.clinicAddress)
      updatedData.clinicAddress = req.body.clinicAddress;
    if (req.body.ConsultationFee)
      updatedData.ConsultationFee = req.body.ConsultationFee;
    if (req.body.email) updatedData.email = req.body.email;
    if (req.body.mobile_number)
      updatedData.mobile_number = req.body.mobile_number;
    if (req.body.gender) updatedData.gender = req.body.gender;
    if (req.body.Bio) updatedData.Bio = req.body.Bio;
    if (req.body.CompletedIn) updatedData.CompletedIn = req.body.CompletedIn;
    if (req.body.Degree) updatedData.Degree = req.body.Degree;
    if (req.body.Institute) updatedData.Institute = req.body.Institute;
    if (req.body.Languages) updatedData.Languages = req.body.Languages;
    const updatedDoctor = await User.findByIdAndUpdate(doctorId, updatedData, {
      new: true,
      runValidators: true,
    });

    res
      .status(200)
      .json({ message: "Profile updated successfully", doctor: updatedDoctor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
