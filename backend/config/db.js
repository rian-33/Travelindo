const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://localhost:27017/travelindo";
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`MongoDB Terhubung: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`MongoDB tidak tersedia: ${error.message}`);
    console.warn("Server berjalan menggunakan data lokal sementara.");
    return false;
  }
};

module.exports = connectDB;
