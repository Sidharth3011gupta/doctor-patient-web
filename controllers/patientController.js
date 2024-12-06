const User = require("../models/User");
const Appointment = require("../models/Appointment");
const specialities1 = require('../data/specialities1');
const bcrypt = require('bcryptjs');
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find(
      { role: "doctor" },
      "name specialization experience clinicAddress mobile_number"
    );
    res.json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
    exports.getSpecialities = async (req, res) => {
      const { page = 1, limit = 10 } = req.query;
    
      try {
           const specialitiesDoc = await specialities1.findOne({}, { 
          specialities1: { 
            $slice: [(page - 1) * limit, Number(limit)] 
          } 
        });
    
       
        const totalSpecialities = await specialities1.aggregate([
          { $project: { total: { $size: "$specialities1" } } }
        ]);
    
        if (!specialitiesDoc) {
          return res.status(404).json({ message: "No specialties found" });
        }
    
        res.status(200).json({
          total: totalSpecialities[0]?.total || 0,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil((totalSpecialities[0]?.total || 0) / limit),
          data: specialitiesDoc.specialities1,
        });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching specialties', error: error.message });
      }
    }; 
exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate("doctorId", "name specialization clinicAddress")
      .populate("patientId", "name email mobile_number")
      .exec();

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
exports.getProfile = async (req, res) => {
  try {
    const {id}=req.params;
    const patient = await User.findById(id);
    if (!patient || patient.role !== "patient") {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }
    res.json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, newPassword } = req.body;

    const patient = await User.findById(id);
    if (!patient || patient.role !== "patient") {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }
    const isMatch = await bcrypt.compare(password, patient.password);
    console.log(password)
    console.log(patient.password)
    if (!isMatch) {
      console.log(password)
      console.log(patient.password)
      return res.status(400).json({ success: false, message: "Incorrect current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    patient.password = hashedPassword;
    await patient.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in changePassword:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

exports.updatedPatientProfile = async (req, res) => {
  try {
    const {id}=req.params;
    const updatedData = {};
    if (req.body.name) updatedData.name = req.body.name;
    if (req.body.profile_pic) updatedData.profile_pic = req.body.profile_pic;
    if (req.body.email) updatedData.email = req.body.email;
    if (req.body.gender) updatedData.gender = req.body.gender;
    if (req.body.dob) updatedData.dob = req.body.dob;
    if (req.body.BloodGroup) updatedData.BloodGroup = req.body.BloodGroup;
    if(req.body.Address) updatedData.Address=req.body.Address;
    if (req.body.City) updatedData.City = req.body.City;
    if (req.body.State) updatedData.State = req.body.State;
    if (req.body.Pincode) updatedData.Pincode = req.body.Pincode;
    if (req.body.Country) updatedData.Country = req.body.Country;


    const updatedPatient = await User.findByIdAndUpdate(
      id,
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
