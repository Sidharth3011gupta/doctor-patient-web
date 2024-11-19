const mongoose= require('mongoose')
const specialitySchema=new mongoose.Schema( {
  
  specialities1:[{
    
 
  name:{
  type:String},
  imageurl:{type:String}
}
  

]
}
)

module.exports=mongoose.model("specialities1",specialitySchema)