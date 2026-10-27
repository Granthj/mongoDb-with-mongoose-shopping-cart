const mongoose = require('mongoose');
require('dotenv').config();
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            maxPoolSize: 10,
            minPoolSize: 2
        });
        console.log('connect');
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDb;