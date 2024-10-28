const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
     type: String,
    required: true
   },
   dob:{
    type:Date
  },
  gender:{
    type:String,
    required:true
  },
  mobile_number:{
    type:Number,
    required:true
  },
  email: { 
    type: String,
     required: true, 
     unique: true 
    },
  password: { 
    type: String,
     required: true
     },
  role: {
    type: String,
    enum: ["doctor", "patient"]
  },
  isDoctor: { 
    type: Boolean,
     default: false 
    },
    specialization: { type: String }, 
   experience: { type: Number }, 
  clinicAddress: { type: String }
});

module.exports = mongoose.model("User", userSchema);
