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
    enum: ["doctor", "patient"],
    required: true,
  },
  isDoctor: { 
    type: Boolean,
     default: false 
    },
});

module.exports = mongoose.model("User", userSchema);
