import mongoose from "mongoose";


const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/mamlakah');
    console.log('connect to db')



}

export default connectDB
