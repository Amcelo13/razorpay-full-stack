import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("🚀  Database Connected Successfully")
    } 
    catch (error) {
        console.log(error);
        // process.exit(1);
    }
}

export default connectDB;