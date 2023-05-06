const mongoose =require('mongoose')




const User=mongoose.model('User',{

    name:{
        type:String,
        required:true,
       
    },
    rollno:{
        type:Number,
     
        required:true,
        unique:true
    
    },
    College:{
        type:String ,
        required:true
    },
    Course:{
        type:String,
        required:true
    },
    Branch:{
        type:String

    },
    pid:{
        type:Number,
        require:true,
    },events:[{
        event:{
            type:String,
            
        }
    }],



})
module.exports=User