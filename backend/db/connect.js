import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connect successful");
  } catch (error) {
    console.log(error);
  }
};
