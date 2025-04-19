import mongoose from "mongoose";

// function to connect to database
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database connected"));
        mongoose.connection.on('error', (err) => console.error("Database connection error:", err));
               
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connection established successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        // Don't throw the error, just log it
        // This allows the server to start even if the database connection fails
    }
}

export default connectDB;