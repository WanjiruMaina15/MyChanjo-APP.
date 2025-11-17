const mongoose = require('mongoose');
//LOAD ENV VARIABLES
require('dotenv').config();
//ASYNC AWAIT FUNCTION TO CONNECT TO MONGODB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Stop app if DB fails
  }
};

module.exports = connectDB; 