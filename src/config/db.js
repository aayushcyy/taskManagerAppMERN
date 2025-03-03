import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected successful!");
  } catch (error) {
    console.error("MongoDB Connection failed: ", error);
    process.exit();
  }
};

export default connectDB;
