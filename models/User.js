const mongoose = require("mongoose");

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
     newPassword:{
      type:String
     },
     confirm_password: {
      type: String,
      required: function() {
        return this.isNew; // Only required during creation
      }
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
  Address:{
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
},

  }
);

module.exports = mongoose.model("User", userSchema);
