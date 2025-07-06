const mongoose = require('mongoose');
require('dotenv').config();          // Load .env first

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('✅  MongoDB connected');
    } catch (err) {
        console.error('❌  MongoDB connection error:', err.message);
        process.exit(1);                 // Exit the process on failure
    }
}
module.exports = connectDB;