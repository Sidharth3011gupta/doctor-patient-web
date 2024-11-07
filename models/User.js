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
    ,unique:true
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
    specialization: {
       type: String
       }, 
   experience: { 
    type: Number 
  }, 
  clinicAddress: { 
    type: String 
  },
  HouseNumber:{
    type:String
  },
  Colony:{
    type:String
  },
  Street:{
    type:String 
  },
  Area:{
    type:String
  },
  Locality:{
    type:String
  },
  City:{
    type:String
  },
  State:{
    type:String
  },
  Country:{
    type:String
  },
  Pincode:{
    type:Number
  },
  BloodGroup:{
    type:String
  },
ConsultationFee:{
  type:Number
},
Languages:{
  type:String
},
Bio:{
  type:String
},
Degree:{
  type:String
},
Institute:{
  type:String
},
CompletedIn:{
  type:Number
}

  }
);

module.exports = mongoose.model("User", userSchema);
