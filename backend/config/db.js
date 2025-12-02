const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.error("MongoDb connection error:", err.message);
        process.exit(1);
    }
}

module.exports = connectDb;