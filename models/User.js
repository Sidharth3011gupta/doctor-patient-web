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
experienceMonths:{type:Number}
  }
);

module.exports = mongoose.model("User", userSchema);
