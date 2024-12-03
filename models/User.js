const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
     type: String,
    required: true
   },
   dob:{
    type:String
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
     resetPasswordToken: String,
     resetPasswordExpires: Date,
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
profile: [
  {
languages: {
type:String},
bio:{ 
  type:String
}
  }
],
qualifications: [
{
q_name: {type:String
},
institute: {
type:String
},              
Passing_year:{
type:Number
}
}
],
licenceNumber: {type:Number},
years:{type:String},                
experience: [
{
position: {type:String},
place: {type:String},
fromYear: {type:Number},
fromMonth:{type:Number} ,
toYear:{type:Number},
toMonth:{type:Number}
}
],
experienceMonths:{type:Number},
next_available:{
  type:String
},
profile_pic:{
  type:String
}
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
