const mongoose =require('mongoose')




const Grp=mongoose.model('Grp',{

   
    tid:{
        type:Number,
        trim:true,
       
    },
    
    pid:[{pidd:{
        type:String,
        
    }}],
    events:{
        type:String
    },
    name:[{pidd:{
        type:Number
    }}]
   



})
module.exports=Grp