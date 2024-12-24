const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Review = require("../models/Review");
const validateMobilenumber = require("../utils/validateMobile_number");


exports.getProfile = async (req, res) => {
  try {
   const {id}=req.params;
    const doctor = await User.findById(id)
      .select("-password") 
      .populate("qualifications") 
      .populate("experience"); 

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({
      success: true,
      personalInfo: {
        name: doctor.name,
        dob: doctor.dob,
        gender: doctor.gender,
        mobile_number: doctor.mobile_number,
        email: doctor.email,
        clinicAddress: doctor.clinicAddress,
        specialization: doctor.specialization,
        consultationFee: doctor.ConsultationFee,
      },
      qualifications: doctor.qualifications,
      experience: doctor.experience,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.getAppointments = async (req, res) => {
  try {
    const {id}=req.params;
    const appointments = await Appointment.find({ doctorId: id })
      .populate("patientId", "name email mobile_number") 
      .exec();

    res.json({
      success: true,
      appointments: appointments.map((appointment) => ({
        id: appointment._id,
        patientName: appointment.patientId.name,
        patientEmail: appointment.patientId.email,
        mobile: appointment.patientId.mobile_number,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



exports.getDashboard = async (req, res) => {
  try {
    const { id } = req.params; 
    const doctor = await User.findById(id);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointments = await Appointment.find({ doctorId: id }); 
    const reviews = await Review.find({ doctorId: id });

    const pendingAppointments = appointments.filter(
      (app) => app.status === "pending"
    ).length;
    const completedAppointments = appointments.filter(
      (app) => app.status === "completed"
    ).length;

    res.json({
      success: true,
      welcomeMessage: `Welcome, Dr. ${doctor.name}`,
      dashboardSummary: {
        totalAppointments: appointments.length,
        pendingAppointments,
        completedAppointments,
      },
      reviewsSummary: {
        totalReviews: reviews.length,
        averageRating:
          reviews.length > 0
            ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            : 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
   const { id } = req.params;

    const updatedData = {};
    if (req.body.profile_pic) updatedData.profile_pic = req.body.profile_pic;
    if (req.body.name) updatedData.name = req.body.name;
    if (req.body.specialization) updatedData.specialization = req.body.specialization;
    if (req.body.clinicAddress) updatedData.clinicAddress = req.body.clinicAddress;
    if (req.body.ConsultationFee) updatedData.ConsultationFee = req.body.ConsultationFee;
    if (req.body.email) updatedData.email = req.body.email;
    if (req.body.mobile_number) {
      const validation = validateMobilenumber(req.body.mobile_number);
      if (!validation.isValid) {
        return res.status(400).json({
          error: 'Invalid mobile number',
          details: validation.errors,
        });
      }
      updatedData.mobile_number = req.body.mobile_number;
    }

    if (req.body.gender) updatedData.gender = req.body.gender;
    if (req.body.Bio) {
      const result = await User.findOneAndUpdate(
        { _id: id, "profile.0": { $exists: true } }, 
        { $set: { "profile.0.bio": req.body.Bio } }, 
        { new: true, runValidators: true }
      );
    }
    if (req.body.qualifications) {
      if (!Array.isArray(req.body.qualifications)) {
        return res.status(400).json({ error: 'Qualifications must be an array' });
      }
      updatedData.qualifications = req.body.qualifications;
    }
    if (req.body.experience) {
      if (!Array.isArray(req.body.experience)) {
        return res.status(400).json({ error: 'Experience must be an array' });
      }
      updatedData.experience = req.body.experience;
    }

    if (req.body.languages) {
      if (!Array.isArray(req.body.languages)) {
        return res.status(400).json({ error: 'Languages must be an array' });
      }
      const result = await User.findOneAndUpdate(
        { _id: id, "profile.0": { $exists: true } }, 
        { $set: { "profile.0.languages": req.body.languages.join(', ') } }, 
        { new: true, runValidators: true }
      );
    }

    const updatedDoctor = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", doctor: updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
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
    const { speciality, doctor, page = 1, limit = 5 } = req.query; 
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
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const doctors = await User.find(query)
    .skip(skip)
    .limit(parseInt(limit));
    const totalDoctors = await User.countDocuments(query); 

    if (doctors.length === 0) {
      return res.status(404).json(
        { message: 'No doctors found for the given criteria.' });
    }

    res.status(200).json({
      total: totalDoctors,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(totalDoctors / limit),
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error searching for doctors.',
      error: error.message,
    });
  }
};
