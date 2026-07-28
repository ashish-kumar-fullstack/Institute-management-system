const mongoose = require('mongoose')
const connectDB = async ()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected')

    }catch(err){
        console.log("MongoDB Connection Fail!");
        
    }
}

module.exports = connectDB