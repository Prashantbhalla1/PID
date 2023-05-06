const mongoose =require('mongoose')




const Col=mongoose.model('Col',{

  
  
    roll:{
        type:Number
    },
    name:{
        type:String
    }
   



})
module.exports=Col