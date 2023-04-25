const mongoose =require('mongoose')




const Id=mongoose.model('Id',{

   
    pid:{
        type:Number,
       
        required:true
    },
   tid:{
        type:Number,
        required:true
    }


})
module.exports=Id