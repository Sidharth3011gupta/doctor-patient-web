const User = require('../models/User');
const Appointment = require('../models/Appointment');

exports.getProfile = async (req, res) => {
  try {
    const doctor = await User.findById(req.user.id);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({ doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user.id })
      .populate('patientId', 'name email')
      .exec();
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const doctor = await User.findById(req.user.id);
    const appointments = await Appointment.find({ doctorId: req.user.id });
    const pendingAppointments = appointments.filter(app => app.status === 'pending').length;

    res.json({
      message: `Welcome, ${doctor.name}`,
      summary: {
        totalAppointments: appointments.length,
        pendingAppointments,
        completedAppointments: appointments.filter(app => app.status === 'completed').length,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }, 'name specialization experience clinicAddress phone');
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving doctors', error: error.message });
  }
};