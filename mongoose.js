const mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.url,{
    useNewUrlParser:true,
  
    
})