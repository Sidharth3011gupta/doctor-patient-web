const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  appointmentDate: { 
    type:String , 
    required: true 
  },
  startTime: { 
    type: String, 
    required: true 
  },
  endTime: { 
    type: String, 
    required: true 
  },
  appointmentSize: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"], 
    default: "pending",
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
