const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).catch(error=>{
        console.log(error);
    })
}

module.exports = connectDB