const User = require("../models/User");
const Appointment = require("../models/Appointment");

exports.getProfile = async (req, res) => 
  {
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
  const { _page = 1, _limit = 10 } = req.query; 
  const page = parseInt(_page, 10);
  const limit = parseInt(_limit, 10);
  const skip = (page - 1) * limit;

  try {
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const doctors = await User.find(
      { role: "doctor" },
      "name specialization experience ConsultationFee profile qualifications experienceMonths years clinicAddress next_available mobile_number profile_pic"
    )
      .skip(skip)
      .limit(limit);
    res.status(200).json({ 
      totalDoctors, 
      doctors 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error retrieving doctors", 
      error: error.message 
    });
  }
};


exports.updateDoctorProfile = async (req, res) => {
  try {
    const { id }=  req.params;

    const updatedData = {};
    if (req.body.name)
       updatedData.name = req.body.name;
    if (req.body.specialization)
      updatedData.specialization = req.body.specialization;
    if (req.body.experience)
       updatedData.experience = req.body.experience;
    if (req.body.clinicAddress)
      updatedData.clinicAddress = req.body.clinicAddress;
    if (req.body.ConsultationFee)
      updatedData.ConsultationFee = req.body.ConsultationFee;
    if (req.body.email) 
      updatedData.email = req.body.email;
    if (req.body.mobile_number)
      updatedData.mobile_number = req.body.mobile_number;
    if (req.body.gender) 
      updatedData.gender = req.body.gender;
    if (req.body.Bio)
       updatedData.Bio = req.body.Bio;
    if (req.body.CompletedIn)
       updatedData.CompletedIn = req.body.CompletedIn;
    if (req.body.Degree) 
      updatedData.Degree = req.body.Degree;
    if (req.body.Institute)
       updatedData.Institute = req.body.Institute;
    if (req.body.Languages)
       updatedData.Languages = req.body.Languages;
    const updatedDoctor = await User.findByIdAndUpdate(id, updatedData, {
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


exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await User.findById(id).select(
      "name specialization experience profile_pic profile qualifications clinicAddress ConsultationFee years"
    );

    if (doctor) {
      res.status(200).json({ success: true, doctor });
    } else {
      res.status(404).json({ success: false, message: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving doctor",
      error: error.message,
    });
  }
};


exports.searchDoctors = async (req, res) => {
  try {
    const { speciality, doctor } = req.query;
    if (!speciality && !doctor) {
      return res.status(400).json({
        message: 'Please provide at least one query parameter: speciality, doctor, or both.',
      });
    }

    let query = {};
    if (speciality) {
      query.specialization = speciality.length === 1 
        ? new RegExp(`^${speciality}`, 'i') 
        : new RegExp(speciality, 'i');
    }

    if (doctor) {
      query.name = new RegExp(doctor, 'i');
    }
    if (speciality && doctor) {
      query = {
        $and: [
          { name: new RegExp(doctor, 'i') },
          { specialization: new RegExp(speciality, 'i') },
        ],
      };
    }
    const doctors = await User.find(query);

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found for the given criteria.' });
    }

    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({
      message: 'Error searching for doctors.',
      error: error.message,
    });
  }
};


