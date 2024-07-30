import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://alikamatu:t6AOLPGVuiVpKFlQ@food.pa82erx.mongodb.net/?retryWrites=true&w=majority&appName=Food').then(()=>console.log("DB connected"));
}